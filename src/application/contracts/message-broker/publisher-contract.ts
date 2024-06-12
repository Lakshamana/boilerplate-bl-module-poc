import { QueueMessage } from '@/domain/value-objects'

export interface PublisherContract {
  publish: <T> (params: PublisherContract.Params<T>) => Promise<boolean>
}

export namespace PublisherContract {
  export type Params<T> = {
    message: QueueMessage<T>
    queueUrl: string
  }
}
