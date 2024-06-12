import { CreatorBrandMatchesUsecase } from '@/domain/usecases'
import { RequestHelperAdapter } from '@/infra/gateway/http'
import { Injectable } from '@lakshamana-pocs/registry'

@Injectable()
export class CreatorBrandMatchesService implements CreatorBrandMatchesUsecase {
  constructor (private readonly httpClient: RequestHelperAdapter) {}

  async perform ({ token }: CreatorBrandMatchesUsecase.Params): Promise<any> {
    const response = await this.httpClient.send<CreatorBrandMatchesUsecase.Response>({
      url: '/ms/onboarding/match-challenges',
      method: 'post',
      body: { accessToken: token }
    })

    if (response instanceof Error) throw new Error('Error getting creator brand matches')

    return response?.data
  }
}
