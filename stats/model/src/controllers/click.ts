import { BaseResponse } from "./types"

export type Request = {
  timestamp: Date
  uid: string
  target: string
}

export type Response = BaseResponse & {}
