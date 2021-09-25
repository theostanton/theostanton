import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {Session, sessions} from "./sessions";
import {v4 as uuidv4} from 'uuid';


function mock(prefix: string): string {
    return `${prefix}_${uuidv4()}`
}

describe("write", () => {

    const MOCK_ID = mock("session")
    const MOCK_USER = mock("user")
    const MOCK_DATE = new Date()
    const MOCK_DATE_ROUNDED = new Date(MOCK_DATE)
    MOCK_DATE_ROUNDED.setMilliseconds(0)
    MOCK_DATE_ROUNDED.setSeconds(0)
    let pageId: string

    beforeAll(async () => {
        const sessionsDatabaseId = process.env.NOTION_SESSIONS_DATABASE_ID
        const session: Session = {
            id: MOCK_ID,
            user: MOCK_USER,
            date: MOCK_DATE,
        }
        pageId = await sessions.write(sessionsDatabaseId, session)
    }, 15_000);


    it("Should have returned a valid pageId", () => {
        expect(pageId).toBeDefined()
        expect(pageId).not.toHaveLength(0)
    })

    it("Should have inserted a valid page", async () => {

        const storedPage = await sessions.read(pageId)
        expect(storedPage.id).toEqual(MOCK_ID)
        expect(storedPage.user).toEqual(MOCK_USER)
        expect(storedPage.date.toISOString()).toEqual(MOCK_DATE_ROUNDED.toISOString())
    })

    afterAll(async () => {
        const success = await sessions.archive(pageId)
        if (!success) {
            throw new Error("Failed to teardown")
        }
    })

})

describe("getForUser - Previous session", () => {

    const MOCK_ID = mock("session")
    const MOCK_USER = mock("user")
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
        pageId = await sessions.write(sessionsDatabaseId, session)

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

describe("getForUser - No previous session", () => {

    const MOCK_USER = mock("user")
    let relevantSession: Session

    beforeAll(async () => {
        const sessionsDatabaseId = process.env.NOTION_SESSIONS_DATABASE_ID

        relevantSession = await sessions.forUser(sessionsDatabaseId, MOCK_USER)
    }, 15_000);


    it("Should have returned relevant session", () => {
        expect(relevantSession).toBeNull()
    })

})
