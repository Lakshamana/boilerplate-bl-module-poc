import { HttpResponse } from '@/application/contracts/http'
import { ExceptionContainerContract } from '@/application/contracts/containers'
import {
  capsuleException,
  TimeOutException
} from '@/infra/encapsulation'

export class ExceptionContainer implements ExceptionContainerContract {
  private readonly transferStatusCode = 408
  constructor (
    private readonly exceptions: Map<
    ExceptionContainerContract.StatusCodeType,
    HttpResponse>
  ) {}

  make (statusCode: ExceptionContainerContract.StatusCodeType): HttpResponse {
    const exception = this.exceptions.get(statusCode)
    return exception ?? capsuleException(
      this.transferStatusCode,
      new TimeOutException()
    )
  }
}
