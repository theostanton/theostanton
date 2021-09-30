import {click, id} from "@stats/model"
import * as process from "process";
import {events, Event, Session, sessions} from "@stats/notion";

export async function invoke(request: click.Request): Promise<click.Response> {

    const existingSession = await sessions.forUser(process.env.NOTION_SESSIONS_DATABASE_ID, request.uid)

    let sessionPageId: string
    if (existingSession == null) {
        const session: Session = {
            id: id("session"),
            date: new Date(),
            user: request.uid
        }
        const newSession = await sessions.write(process.env.NOTION_SESSIONS_DATABASE_ID, session)
        sessionPageId = newSession.pageId
    } else {
        sessionPageId = existingSession.pageId
    }

    const event: Event = {
        name: `Click ${request.target}`,
        date: new Date(),
        session: sessionPageId
    }

    const eventPageId = await events.write(process.env.NOTION_EVENTS_DATABASE_ID, event)


    if (!eventPageId) {
        return {
            success: false
        }
    }
    return {
        success: true
    }
}
