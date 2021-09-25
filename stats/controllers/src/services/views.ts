import {database} from "@stats/database"
import {DirtyView, View} from "@stats/database"

export async function insert(dirty: DirtyView): Promise<View> {
    const query = `insert into views (session, page, timestamp)
                   values ($1, $2, $3)
                   returning *`
    const [view] = await database.query<View>(query, dirty.session, dirty.page, dirty.timestamp)
    if (!view) {
        console.error("couldn't insert view")
        process.exit(1)
    }
    return view
}
