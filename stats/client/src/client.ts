import { view, click } from "@stats/model"
import axios from "axios"
import { v4 as uuid } from "uuid"
import Cookies from "js-cookie"

const ANONYMOUS_ID_KEY = "anon_id"

function baseUrl(): (string | null) {
  if (!process.env.STATS_URL) {
    console.error("No STATS_URL")
    return null
  }
  return process.env.STATS_URL
}

function getAnonymousId(): string {
  const existingValue = Cookies.get(ANONYMOUS_ID_KEY)
  if (existingValue) {
    return existingValue
  }
  const newValue = uuid()
  Cookies.set(ANONYMOUS_ID_KEY, newValue)
  return newValue
}

export class Stats {
  uid: string

  static async view(page: string): Promise<void> {
    const client = new Stats()
    await client.trackView(page)
  }

  static async click(target: string): Promise<void> {
    const client = new Stats()
    await client.trackClick(target)
  }

  constructor() {
    this.uid = getAnonymousId()
  }

  private async trackView(page: string): Promise<void> {
    const request: view.Request = {
      timestamp: new Date(),
      page,
      uid: this.uid
    }
    const url = `${baseUrl()}/view`
    console.log("url", url)
    await axios.post(url, request, {})
  }

  private async trackClick(target: string): Promise<void> {
    const request: click.Request = {
      timestamp: new Date(),
      target,
      uid: this.uid
    }
    const url = `${baseUrl()}/click`
    await axios.post(url, request, {})
  }
}
