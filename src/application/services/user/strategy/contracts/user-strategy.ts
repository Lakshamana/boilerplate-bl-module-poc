export interface UserStrategy<U> {
  loadEmail: (params: U) =>
  Promise<UserStrategy.Result>
}

export namespace UserStrategy {
  export type Result = any | Error
}
