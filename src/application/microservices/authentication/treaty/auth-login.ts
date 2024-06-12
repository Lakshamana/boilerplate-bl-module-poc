export interface AuthLoginTreaty {
  authenticate: (params: AuthLoginTreaty.Params) =>
  Promise<AuthLoginTreaty.Result>
}

export namespace AuthLoginTreaty {
  export type Params = {
    email: string
    password: string | undefined
    brands: string[]
  }

  export type Result = {
    accessToken: string
  } | Error
}
