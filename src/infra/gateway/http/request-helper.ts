import { MicroserviceError } from '@/application/errors'
import { RequestHelper } from '@/application/contracts/http/request-helper'
import { AxiosHttpClient } from './axios/axios-http-adapter'
import { Injectable, InjectVariable } from '@lakshamana-pocs/registry'

@Injectable()
export class RequestHelperAdapter implements RequestHelper {
  constructor (private readonly httpClient: AxiosHttpClient) {}

  @InjectVariable()
  private readonly domainName: string

  @InjectVariable('CATALYST_API_KEY')
  private readonly apiKey: string

  async send<T> (params: RequestHelper.Params): Promise<T | Error> {
    const { body, url, method, headers = {} } = params

    try {
      const httpResponse = await this.httpClient.request<T>({
        url: `${this.domainName}${url}`,
        method: method ?? 'post',
        headers: {
          ...headers,
          'x-api-key': this.apiKey
        },
        body
      })

      if (!httpResponse.body) return new MicroserviceError('Microservice did not return data!!')

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return httpResponse.body
      }

      return new MicroserviceError(JSON.stringify(httpResponse.body))
    } catch (error) {
      console.log('ERRO REQUEST HELPER: ', error)
      return new MicroserviceError(JSON.stringify(error))
    }
  }
}
