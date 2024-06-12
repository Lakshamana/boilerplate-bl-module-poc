import { LoadTokenInfoTreaty } from '@/application/microservices'
import { BrandlovrsBaseRequestTask } from '@/application/tasks'
import { InvalidTokenError } from '@/domain/errors'

export class MsLoadTokenInfo extends BrandlovrsBaseRequestTask implements LoadTokenInfoTreaty {
  async perform ({ accessToken }: LoadTokenInfoTreaty.Params): Promise<LoadTokenInfoTreaty.Result> {
    const bodyResponse = await this.makeRequest<LoadTokenInfoTreaty.Result>({
      path: '/catalyst/verify-token',
      body: { accessToken }
    })

    if (bodyResponse instanceof Error) return new InvalidTokenError()

    return bodyResponse
  }
}
