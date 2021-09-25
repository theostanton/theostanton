import client from "./client";

export type Session = {
    pageId?: string
    id: string
    user: string
}

export namespace sessions {

    type  Properties = {
        ID: {
            type: "title",
            title: [{
                type: "text",
                text: {
                    content: string
                }
            }]
        },
        User: {
            type: "rich_text",
            rich_text: [{
                type: "text",
                text: {
                    content: string
                }
            }]
        }
    }

    function mapSessionToProperties(session: Session): Properties {
        return {
            ID: {
                type: "title",
                title: [{type: "text", text: {content: session.id}}],
            },
            User: {
                type: "rich_text",
                rich_text: [
                    {type: "text", text: {content: session.user}}
                ],
            },
        }
    }

    export async function write(databaseId: string, session: Session): Promise<string> {
        const properties: Properties = mapSessionToProperties(session)
        const response = await client.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties
        })

        return response.id
    }

    export async function read(pageId: string): Promise<Session> {
        const response = await client.pages.retrieve({
            page_id: pageId
        })

        const properties: Properties = response.properties as unknown as Properties
        return {
            pageId,
            id: properties.ID.title[0].text.content,
            user: properties.User.rich_text[0].text.content
        }
    }

    export async function forUser(databaseId: string, userId: string): Promise<Session | null> {
        const queryResponse = await client.databases.query({
            database_id: databaseId,
            sorts: [{
                direction: "descending",
                timestamp: "created_time"
            }],
            filter: {
                property: "User",
                rich_text: {
                    equals: userId
                }
            }
        })
        const results = queryResponse.results
        if (results.length == 0) {
            return null
        }
        const properties: Properties = results[0].properties as unknown as Properties
        return {
            pageId: results[0].id,
            id: properties.ID.title[0].text.content,
            user: properties.User.rich_text[0].text.content
        }
    }

    export async function archive(pageId: string): Promise<boolean> {
        const response = await client.pages.update({
            page_id: pageId,
            archived: true,
            properties: {},
        })

        return response.archived
    }

}