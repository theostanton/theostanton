import {query} from "../database";
import {User} from "../model";

export async function upsert(uid: string): Promise<User> {
  const upsertQuery = `
      insert into users (id)
      values ($1)
      on conflict (id)
          do update SET id=$1
      returning *
  `
  const [user] = await query<User>(upsertQuery, uid)
  if (!user) {
    console.error("couldnt upsert user")
    process.exit(1)
  }
  return user
}
