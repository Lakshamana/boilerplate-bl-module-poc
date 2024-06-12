type BrandCheckEmail = {
  userId: string
  userType: string
}

export type BrandModelRequest = BrandCheckEmail

export namespace BrandModelResponse {
  export type CheckResult = {
    email: string
  } | Error
}
