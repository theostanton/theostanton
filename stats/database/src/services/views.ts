import {DirtyView, View} from "../model";
import {query} from "../database";

export async function insert(dirty: DirtyView): Promise<View> {
    const sql = `insert into views (session, page, timestamp)
                   values ($1, $2, $3)
                   returning *`
    const [view] = await query<View>(sql, dirty.session, dirty.page, dirty.timestamp)
    if (!view) {
        console.error("couldn't insert view")
        process.exit(1)
    }
    return view
}
