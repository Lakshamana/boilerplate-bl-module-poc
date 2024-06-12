import { AuthLoginTreaty } from '@/application/microservices'
import { BrandlovrsBaseRequestTask } from '@/application/tasks'

export class MsAuthLogin extends BrandlovrsBaseRequestTask implements AuthLoginTreaty {
  async authenticate (params: AuthLoginTreaty.Params):
  Promise<AuthLoginTreaty.Result> {
    const bodyResponse = await this.makeRequest<AuthLoginTreaty.Result>({
      path: '/auth/login',
      body: {
        ...params,
        product: 'colab',
        context: 'influencer'
      }
    })

    return bodyResponse
  }
}
