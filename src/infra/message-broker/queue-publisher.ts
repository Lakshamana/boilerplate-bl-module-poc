import { PublisherContract } from '@/application/contracts/message-broker'
import { SQSAdapter, SendMessageParams } from '@/infra/message-broker/sqs'

export class QueuePublisher implements PublisherContract {
  constructor (
    private readonly sqsAdapter: SQSAdapter
  ) {}

  async publish<T> ({ message, queueUrl }: PublisherContract.Params<T>): Promise<boolean> {
    const params: SendMessageParams = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message)
    }
    const result = await this.sqsAdapter.publish(params)

    return !!result
  }
}
