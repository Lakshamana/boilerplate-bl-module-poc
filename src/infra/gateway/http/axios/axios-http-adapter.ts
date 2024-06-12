import { HttpRequest, HttpResponse, HttpClient } from '@/application/contracts/http'
import axios, { AxiosResponse } from 'axios'
import { Injectable } from 'module-poc'

@Injectable()
export class AxiosHttpClient implements HttpClient {
  async request<R> (data: HttpRequest): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error: any) {
      axiosResponse = error.response
      return { statusCode: axiosResponse.status, body: axiosResponse.data }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
