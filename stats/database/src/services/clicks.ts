import {Click, DirtyClick} from "../model";
import {query} from "../database";

export async function insert(dirty: DirtyClick): Promise<Click> {
    const sql = `insert into clicks (session, target, timestamp)
                   values ($1, $2, $3)
                   returning *`
    const [click] = await query<Click>(sql, dirty.session, dirty.target, dirty.timestamp)
    if (!click) {
        console.error("couldn't insert click")
        process.exit(1)
    }
    return click
}
