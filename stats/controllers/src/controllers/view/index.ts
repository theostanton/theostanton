import * as sessions from "../../services/sessions"
import * as views from "../../services/views"
import {DirtyView, view} from "@stats/model"

export async function invoke(request: view.Request): Promise<view.Response> {
    const {id: sessionId} = await sessions.getForUser(request.uid)

    const dirty: DirtyView = {
        session: sessionId,
        page: request.page,
        timestamp: request.timestamp
    }
    const view = await views.insert(dirty)
    if (!view) {
        return {
            success: false
        }
    }

    return {
        success: true
    }
}
