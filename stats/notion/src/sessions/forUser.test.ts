import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {Session, sessions} from "./index";
import {id} from "@stats/model";


describe("Relevant previous session", () => {

    const MOCK_ID = id("session")
    const MOCK_USER = id("user")
    const MOCK_DATE = new Date()
    const MOCK_DATE_ROUNDED = new Date(MOCK_DATE)
    MOCK_DATE_ROUNDED.setMilliseconds(0)
    MOCK_DATE_ROUNDED.setSeconds(0)
    let pageId: string
    let relevantSession: Session

    beforeAll(async () => {
        const sessionsDatabaseId = process.env.NOTION_SESSIONS_DATABASE_ID
        const session: Session = {
            id: MOCK_ID,
            date: MOCK_DATE,
            user: MOCK_USER
        }
        const storedSession = await sessions.write(sessionsDatabaseId, session)
        pageId = storedSession.pageId

        relevantSession = await sessions.forUser(sessionsDatabaseId, MOCK_USER)
    }, 15_000);


    it("Should have returned relevant session", () => {
        expect(pageId).toBeDefined()
        expect(relevantSession.id).toBe(MOCK_ID)
        expect(relevantSession.date.toISOString()).toEqual(MOCK_DATE_ROUNDED.toISOString())
    })

    afterAll(async () => {
        const success = await sessions.archive(pageId)
        if (!success) {
            throw new Error("Failed to teardown")
        }
    })

})

describe("No relevant previous session", () => {

    const MOCK_ID = id("session")
    const MOCK_USER = id("user")
    const msAgo = 100 * 60 * 1_000
    const MOCK_DATE = new Date()
    MOCK_DATE.setUTCMilliseconds(new Date().getTime() - msAgo)
    let pageId: string
    let relevantSession: Session | null

    beforeAll(async () => {
        const sessionsDatabaseId = process.env.NOTION_SESSIONS_DATABASE_ID
        const session: Session = {
            id: MOCK_ID,
            date: new Date(1),
            user: MOCK_USER
        }
        const storedSession = await sessions.write(sessionsDatabaseId, session)
        pageId = storedSession.pageId

        relevantSession = await sessions.forUser(sessionsDatabaseId, MOCK_USER)
    }, 15_000);


    it("Should not have returned a session", () => {
        expect(pageId).toBeDefined()
        expect(relevantSession).toBeNull()
    })

    afterAll(async () => {
        const success = await sessions.archive(pageId)
        if (!success) {
            throw new Error("Failed to teardown")
        }
    })

})

describe("getForUser - No previous session", () => {

    const MOCK_USER = id("user")
    let relevantSession: Session

    beforeAll(async () => {
        const sessionsDatabaseId = process.env.NOTION_SESSIONS_DATABASE_ID

        relevantSession = await sessions.forUser(sessionsDatabaseId, MOCK_USER)
    }, 15_000);


    it("Should have returned relevant session", () => {
        expect(relevantSession).toBeNull()
    })

})