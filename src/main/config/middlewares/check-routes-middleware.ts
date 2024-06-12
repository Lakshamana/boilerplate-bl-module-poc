import { InvalidRouteError } from '@/presentation/errors'
import { routeError } from '@/presentation/helpers'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { MiddlewareInterface } from './middleware-interface'

export class CheckRoutesMiddleware implements MiddlewareInterface<APIGatewayProxyEvent, APIGatewayProxyResult> {
  next!: MiddlewareInterface<APIGatewayProxyEvent, APIGatewayProxyResult>
  async handle (request: any): Promise<APIGatewayProxyResult> {
    if (!this.isValidRoute(request)) return routeError(new InvalidRouteError())
    if (!this.next) throw new Error('Next middleware not defined')
    return this.next.handle(request)
  }

  isValidRoute (request: any): boolean {
    return 'resource' in request && 'httpMethod' in request
  }
}
