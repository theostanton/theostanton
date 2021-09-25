import {click} from "@stats/model"
import {Session, sessions, Event, events} from "@stats/notion";
import * as process from "process";
import {v4 as uuid} from 'uuid'


export async function invoke(request: click.Request): Promise<click.Response> {

    const existingSession = await sessions.forUser(process.env.NOTION_SESSIONS_DATABASE_ID, request.uid)

    let sessionPageId: string
    if (existingSession == null) {
        const newSession: Session = {
            id: `session_${uuid()}`,
            date: new Date(),
            user: request.uid
        }
        sessionPageId = await sessions.write(process.env.NOTION_SESSIONS_DATABASE_ID, newSession)
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
