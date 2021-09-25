import {database} from "@stats/database"
import {DirtyClick, Click} from "@stats/database"

export async function insert(dirty: DirtyClick): Promise<Click> {
    const query = `insert into clicks (session, target, timestamp)
                   values ($1, $2, $3)
                   returning *`
    const [click] = await database.query<Click>(query, dirty.session, dirty.target, dirty.timestamp)
    if (!click) {
        console.error("couldn't insert click")
        process.exit(1)
    }
    return click
}
