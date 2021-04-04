import { database, DirtyClick, View } from "@stats/model"

export async function insert(dirty: DirtyClick): Promise<View> {
  const query = `insert into clicks (session, target, timestamp)
                 values ($1, $2, $3)
                 returning *`
  const [click] = await database.query<View>(query, dirty.session, dirty.target, dirty.timestamp)
  if (!click) {
    console.error("couldnt insert click")
    process.exit(1)
  }
  return click
}
