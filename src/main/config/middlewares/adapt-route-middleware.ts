import { adaptRoute } from '@/main/adapters'
import { NotFoundRouteError } from '@/presentation/errors'
import { routeError } from '@/presentation/helpers'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { MiddlewareInterface } from './middleware-interface'

export class AdaptRouteMiddleware implements MiddlewareInterface<APIGatewayProxyEvent, APIGatewayProxyResult> {
  next!: MiddlewareInterface<APIGatewayProxyEvent, APIGatewayProxyResult>
  async handle (request: any): Promise<APIGatewayProxyResult> {
    const routeConfig = {
      route: request.resource,
      method: request.httpMethod,
      event: request
    }

    const data = await adaptRoute(routeConfig)
    if (!data) return routeError(new NotFoundRouteError())
    return data
  }
}
