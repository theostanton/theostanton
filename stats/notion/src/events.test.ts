import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {Event, events} from "./events";
import {Session, sessions} from "./sessions";

const MOCK_SESSION_ID = "session_123"
const MOCK_NAME = "Mock event"
const MOCK_DATE = new Date()
const MOCK_DATE_ROUNDED = new Date(MOCK_DATE)
MOCK_DATE_ROUNDED.setMilliseconds(0)
MOCK_DATE_ROUNDED.setSeconds(0)
let sessionPageId: string
let eventpageId: string

beforeAll(async () => {

    const sessionsDatabaseId = process.env.NOTION_SESSIONS_DATABASE_ID
    const session: Session = {
        user: "Some user",
        id: MOCK_SESSION_ID
    }

    sessionPageId = await sessions.write(sessionsDatabaseId, session)

    const eventsDatabaseId = process.env.NOTION_EVENTS_DATABASE_ID
    const event: Event = {
        name: MOCK_NAME,
        date: MOCK_DATE,
        session: sessionPageId
    }
    eventpageId = await events.write(eventsDatabaseId, event)
}, 15_000);

describe("events", () => {

    it("Should have returned a valid pageId", () => {
        expect(eventpageId).toBeDefined()
        expect(eventpageId).not.toHaveLength(0)
    })

    it("Should have inserted a valid page", async () => {

        const event = await events.read(eventpageId)
        expect(event.name).toEqual(MOCK_NAME)
        expect(event.date.toISOString()).toEqual(MOCK_DATE_ROUNDED.toISOString())
    })

})

afterAll(async () => {
    let success = await sessions.archive(sessionPageId)
    if (!success) {
        throw new Error("Failed to teardown session")
    }
    success = await events.archive(eventpageId)
    if (!success) {
        throw new Error("Failed to teardown event")
    }
})