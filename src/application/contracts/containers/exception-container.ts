import { StatusCodeEnum } from '@/domain/enums'
import { HttpResponse } from '@/application/contracts/http'

export interface ExceptionContainerContract {
  make: (ecommerce: StatusCodeEnum) => HttpResponse
}

export namespace ExceptionContainerContract {
  export type StatusCodeType = StatusCodeEnum
}
