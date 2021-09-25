import client from "./client";

export type Event = {
    name: string
    session: string
    date: Date
}


export namespace events {

    type Properties = {
        Event: {
            type: "title",
            title: [{
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
        "Related to Sessions (Events)": {
            type: "relation",
            relation: [{
                id: string
            }]
        }
    }

    function mapEventToProperties(event: Event): Properties {
        return {
            Event: {
                type: "title",
                title: [{type: "text", text: {content: event.name}}],
            },
            Date: {
                type: "date",
                date: {
                    start: event.date.toISOString()
                }
            },
            "Related to Sessions (Events)": {
                type: "relation",
                relation: [{
                    id: event.session
                }]
            }
        }
    }

    export async function write(databaseId: string, event: Event): Promise<string> {
        const properties: Properties = mapEventToProperties(event)
        const response = await client.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties
        })

        return response.id
    }

    export async function read(pageId: string): Promise<Event> {
        const response = await client.pages.retrieve({
            page_id: pageId
        })

        const properties: Properties = response.properties as unknown as Properties
        return {
            name: properties.Event.title[0].text.content,
            date: new Date(properties.Date.date.start),
            session: properties["Related to Sessions (Events)"].relation[0].id
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