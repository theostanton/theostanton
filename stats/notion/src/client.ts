import {Client} from "@notionhq/client"


if (!process.env.NOTION_TOKEN) {
    console.error("No NOTION_TOKEN")
    process.exit(1)
}

const client: Client = new Client({
    auth: process.env.NOTION_TOKEN,
})

export default client