import { HttpRequest } from './http-client'

export interface RequestHelper {
  send: <T = any> (params: RequestHelper.Params) => Promise<T | Error>
}

export namespace RequestHelper {
  export type Params = HttpRequest
  export type Result = { data: any } | Error
}
