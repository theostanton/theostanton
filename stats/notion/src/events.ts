import client from "./client";
import {InputPropertyValueMap} from "@notionhq/client/build/src/api-endpoints";

export type Event = {
    name: string
    date: Date
}

export namespace events {

    interface Properties extends InputPropertyValueMap {
        Name: {
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
        }
    }

    function mapEventToProperties(event: Event): Properties {
        return {
            Name: {
                type: "title",
                title: [{type: "text", text: {content: event.name}}],
            },
            Date: {
                type: "date",
                date: {
                    start: event.date.toISOString()
                }
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

        const properties: Properties = response.properties as Properties
        return {
            name: properties.Name.title[0].text.content,
            date: new Date(properties.Date.date.start)
        }
    }

}