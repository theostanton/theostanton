import { view, click } from "@stats/model"
import axios from "axios"
import FingerprintJS from "@fingerprintjs/fingerprintjs"

function baseUrl(): (string | null) {
  if (!process.env.STATS_URL) {
    console.error("No STATS_URL")
    return null
  }
  return process.env.STATS_URL
}


export class Stats {
  uid: string

  private static client: Stats | undefined

  private static async instance(): Promise<Stats> {
    if (!Stats.client) {
      const fingerprint = await (await FingerprintJS.load()).get()
      Stats.client = new Stats(fingerprint.visitorId)
    }
    return Stats.client
  }

  static async view(page: string): Promise<void> {
    const client = await Stats.instance()
    await client.trackView(page)
  }

  static async click(target: string): Promise<void> {
    const client = await Stats.instance()
    await client.trackClick(target)
  }

  constructor(uid: string) {
    this.uid = uid
  }

  private async trackView(page: string): Promise<void> {
    const request: view.Request = {
      timestamp: new Date(),
      page,
      uid: this.uid
    }
    const url = `${baseUrl()}/view`
    await axios.post(url, request, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  private async trackClick(target: string): Promise<void> {
    const request: click.Request = {
      timestamp: new Date(),
      target,
      uid: this.uid
    }
    const url = `${baseUrl()}/click`
    await axios.post(url, request, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
