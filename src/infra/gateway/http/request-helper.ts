import { MicroserviceError } from '@/application/errors'
import { RequestHelper } from '@/application/contracts/http/request-helper'
import { AxiosHttpClient } from './axios/axios-http-adapter'
import { Injectable, InjectVariable } from 'module-poc'

@Injectable()
export class RequestHelperAdapter implements RequestHelper {
  constructor (private readonly httpClient: AxiosHttpClient) {}

  @InjectVariable()
  private readonly domainName: string

  async send<T> (params: RequestHelper.Params): Promise<T | Error> {
    const { body, url, method, headers } = params

    try {
      const httpResponse = await this.httpClient.request<T>({
        url: `${this.domainName}${url}`,
        method: method ?? 'post',
        headers,
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
