import * as users from "./users"
import {Session} from "../model";
import {query} from "../database";

export async function getForUser(uid: string): Promise<Session> {

    await users.upsert(uid)

    const latestQuery = `
        with latest as (
            select max(id) as session
            from sessions
            where "user" = $1
        )
        select l.session as id
        from latest as l
                 inner join views as v
                            on l.session = v.session
                                and v.timestamp > now() - interval '5 minutes'
        union
        select l.session as id
        from latest as l
                 inner join clicks as c
                            on l.session = c.session
                                and c.timestamp > now() - interval '5 minutes'
        limit 1
    `

    const [currentSession] = await query<Session>(latestQuery, uid)

    if (currentSession) {
        return currentSession
    }
    const insertQuery = `insert into sessions ("user")
                         values ($1)
                         returning *`
    const [newSession] = await query<Session>(insertQuery, uid)
    return newSession
}
