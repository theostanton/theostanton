import { BaseResponse } from "./types"

export type Request = {
  timestamp: Date
  uid: string
  page: string
}

export type Response = BaseResponse & {}
