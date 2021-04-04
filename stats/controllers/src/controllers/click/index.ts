import * as sessions from "../../services/sessions"
import * as clicks from "../../services/clicks"
import { DirtyClick, click } from "@stats/model"

export async function invoke(request: click.Request): Promise<click.Response> {
  const { id: sessionId } = await sessions.getForUser(request.uid)
  const dirty: DirtyClick = {
    session: sessionId,
    target: request.target,
    timestamp: request.timestamp
  }
  const click = await clicks.insert(dirty)
  if (!click) {
    return {
      success: false
    }
  }
  return {
    success: true
  }
}
