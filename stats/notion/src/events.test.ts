import {describe, expect, it} from "@jest/globals";
import {Event, events} from "./events";

describe("Should insert click", async () => {
    const databaseId = process.env.TEST_NOTION_PARENT_PAGE
    const now = new Date()
    const name = "Text event"
    const event: Event = {
        date: now,
        name
    }
    const pageId = await events.write(databaseId, event)

    it("Should return a valid page ID", () => {
        expect(pageId).toBeDefined()
        expect(pageId).not.toHaveLength(0)
    })

    it("Should have inserted a valid page", async () => {
        const storedPage = await events.read(pageId)

        expect(storedPage.name).toEqual(name)
        expect(storedPage.date.getTime()).toEqual(now.getTime())
    })
})