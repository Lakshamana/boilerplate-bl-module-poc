import { HttpClient, HttpMethod } from '@/application/contracts/http'
import { MicroserviceError } from '@/application/errors'

type Params = {
  path: string
  method?: HttpMethod
  body?: any
  headers?: any
}

export abstract class BrandlovrsBaseRequestTask {
  constructor (
    private readonly httpClient: HttpClient,
    protected readonly brandLovrsHost: string,
    protected readonly brandLovrsApiKey: string
  ) { }

  protected async makeRequest<T=any> ({ path, method = 'post', body, headers }: Params):
  Promise<T | Error> {
    let url = `${this.brandLovrsHost}${path}`
    if (!url.startsWith('http://') && !url.startsWith('https://')) url = `https://${url}`

    const response = await this.httpClient.request({
      method,
      url,
      body,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.brandLovrsApiKey,
        ...headers
      }
    })

    const isValid = response?.statusCode >= 200 && response?.statusCode <= 299

    if (!isValid) {
      const errorMessage = response?.body
      console.log(errorMessage)
      return new MicroserviceError(JSON.stringify(errorMessage))
    }

    return response?.body
  }
}
