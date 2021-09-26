import {Session, sessions} from "@stats/notion";
import process from "process";
import {id} from "@stats/model";

export async function assureSession(uid: string): Promise<string> {
    const existingSession = await sessions.forUser(process.env.NOTION_SESSIONS_DATABASE_ID, uid)
    if (existingSession == null) {
        const newSession: Session = {
            id: id("session"),
            date: new Date(),
            user: uid
        }
        return await sessions.write(process.env.NOTION_SESSIONS_DATABASE_ID, newSession)
    } else {
        return existingSession.pageId
    }
}