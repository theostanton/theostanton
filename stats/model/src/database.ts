import { ClientConfig, Client } from "pg"

if (!process.env.DATABASE_URL) {
  console.error("No DATABASE_URL")
  process.exit(1)
}

const config: ClientConfig = {
  connectionString: process.env.DATABASE_URL
}

export async function query<Row>(sql: string, ...values: any[]): Promise<Row[]> {
  const client: Client = new Client(config)
  await client.connect()
  const result = await client.query<Row>(sql, values)
  await client.end()
  return result.rows
}
