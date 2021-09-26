import client from "../client";
import {GetPageResponse} from "@notionhq/client/build/src/api-endpoints";

export type Session = {
    pageId?: string
    id: string
    date: Date
    user: string
}

const MAX_SESSION_GAP_MS = 5 * 60 * 1_000

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
        },
        Date: {
            type: "date",
            date: {
                start: string
            }
        },
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
            Date: {
                type: "date",
                date: {
                    start: session.date.toISOString()
                }
            },
        }
    }

    function mapResponseToSession(response: GetPageResponse): Session {
        const properties: Properties = response.properties as unknown as Properties
        return {
            pageId: response.id,
            id: properties.ID.title[0].text.content,
            date: new Date(properties.Date.date.start),
            user: properties.User.rich_text[0].text.content
        }
    }

    export async function write(databaseId: string, session: Session): Promise<Session> {
        const properties: Properties = mapSessionToProperties(session)
        const response = await client.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties
        })

        session.pageId = response.id
        return session
    }

    export async function read(pageId: string): Promise<Session> {
        const response = await client.pages.retrieve({
            page_id: pageId
        })

        return mapResponseToSession(response)
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
                },
            }
        })
        const results = queryResponse.results
        if (results.length == 0) {
            return null
        }

        const latestResult = results[0]

        const properties = mapResponseToSession(latestResult)
        const msSince = new Date().getTime() - properties.date.getTime()

        if (msSince > MAX_SESSION_GAP_MS) {
            return null
        }

        return mapResponseToSession(results[0])
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