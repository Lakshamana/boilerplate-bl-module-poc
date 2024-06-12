import { PublishToQueueUsecase } from '@/domain/usecases'
import { PublisherContract } from '@/application/contracts/message-broker'

export class PublishToQueueService implements PublishToQueueUsecase {
  constructor (
    private readonly queuePublisher: PublisherContract
  ) {}

  async perform<T> (params: PublishToQueueUsecase.Params<T>): Promise<PublishToQueueUsecase.Result> {
    const { payload, type, queueUrl } = params

    const result = await this.queuePublisher.publish({
      message: {
        type: type,
        payload: { msg: payload }
      },
      queueUrl: queueUrl
    })

    return result
  }
}
