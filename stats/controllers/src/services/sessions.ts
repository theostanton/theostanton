import {Session, sessions} from "@stats/notion";
import process from "process";
import {id} from "@stats/model";

export async function assureSession(uid: string): Promise<string> {
    const existingSession = await sessions.forUser(process.env.NOTION_SESSIONS_DATABASE_ID, uid)
    if (existingSession == null) {
        const session: Session = {
            id: id("session"),
            date: new Date(),
            user: uid
        }
        const newSession = await sessions.write(process.env.NOTION_SESSIONS_DATABASE_ID, session)
        return newSession.pageId
    } else {
        return existingSession.pageId
    }
}