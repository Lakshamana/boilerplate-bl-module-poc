export interface CheckEmailUseCase {
  perform: (params: CheckEmailUseCase.Params) =>
  Promise<CheckEmailUseCase.Result>
}

export namespace CheckEmailUseCase {
  export type Params = {
    userType: number
    userId: string
  }

  export type Result = { email: string } | Error
}
