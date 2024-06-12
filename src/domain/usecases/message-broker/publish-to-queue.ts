export interface PublishToQueueUsecase<T = any> {
  perform: (params: PublishToQueueUsecase.Params<T>) => Promise<PublishToQueueUsecase.Result>
}

export namespace PublishToQueueUsecase {
  export type Params<T> = {
    payload: T
    type: string
    queueUrl: string
  }
  export type Result = boolean
}
