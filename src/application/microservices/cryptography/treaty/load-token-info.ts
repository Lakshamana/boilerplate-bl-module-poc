import { InvalidTokenError } from '@/domain/errors'

export interface LoadTokenInfoTreaty {
  perform: (params: LoadTokenInfoTreaty.Params) => Promise<LoadTokenInfoTreaty.Result>
}

export namespace LoadTokenInfoTreaty {
  export type Params = {
    accessToken: string
  }

  export type Result = {
    email: string
    name: string
    permissions: Permission[]
    brands: string[]
    iat: number
    aud: string
    iss: string
    sub: string
  } | InvalidTokenError
}

type Permission = {
  brandId: number
  brand: string
  products: string[]
}
