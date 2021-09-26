import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {Session, sessions} from ".";
import {id} from "@stats/model";

describe("write", () => {

    const MOCK_ID = id("session")
    const MOCK_USER = id("user")
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
        const storedSession = await sessions.write(sessionsDatabaseId, session)
        pageId = storedSession.pageId
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

