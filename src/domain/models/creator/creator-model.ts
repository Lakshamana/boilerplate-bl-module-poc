type CreatorCheckEmail = {
  userId: string
  userType: string
}

export type CreatorModelRequest = CreatorCheckEmail

export namespace CreatorModelResponse {
  export type CheckResult = {
    email: string
  } | Error
}
