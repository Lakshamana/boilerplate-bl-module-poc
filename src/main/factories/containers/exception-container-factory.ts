import { StatusCodeEnum } from '@/domain/enums'
import { HttpResponse } from '@/application/contracts/http'
import { ExceptionContainerContract } from '@/application/contracts/containers'
import {
  UnauthorizedError,
  UnavailableError,
  NotFoundRouteError,
  IntegrationHubApiError
} from '@/presentation/errors'
import {
  badRequest,
  badGateway,
  serverError,
  unavailable,
  unathorized
} from '@/presentation/helpers'
import { ExceptionContainer } from '@/infra/containers/'

export class ExceptionContainerFactory {
  private static instance: ExceptionContainerFactory | undefined

  private constructor () {
  }

  public static getInstance (): ExceptionContainerFactory {
    if (!this.instance) {
      this.instance = new ExceptionContainerFactory()
    }
    return this.instance
  }

  make (): ExceptionContainerContract {
    const exceptionsMap = new Map<StatusCodeEnum, HttpResponse>([
      [StatusCodeEnum.UNAUTHORIZED, unathorized(new UnauthorizedError())],
      [StatusCodeEnum.UNAVAILABLE, unavailable(new UnavailableError())],
      [StatusCodeEnum.SERVER_ERROR, serverError(new IntegrationHubApiError())],
      [StatusCodeEnum.BAD_GATEWAY, badGateway(new IntegrationHubApiError())],
      [StatusCodeEnum.BAD_REQUEST, badRequest(new NotFoundRouteError())]
    ])

    return new ExceptionContainer(exceptionsMap)
  }
}
