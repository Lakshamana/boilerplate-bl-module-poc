import { AdaptRouteMiddleware } from '@/main/config/middlewares/adapt-route-middleware'
import { ApiGatewayMiddlewareErrorHandler } from '@/main/config/middlewares/errors-handlers'
import { CheckRoutesMiddleware } from '@/main/config/middlewares/check-routes-middleware'
import { CheckVariableMiddleware } from '@/main/config/middlewares/check-variables-middleware'
import { ConnectDatabaseMiddleware } from '@/main/config/middlewares/connect-database-middleware'
import { MiddlewareManager, MiddlewareManagerInterface } from '@/main/config/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export class ApiGatewayMiddlewareManagerFactory {
  private static instance: ApiGatewayMiddlewareManagerFactory

  public static getInstance (): ApiGatewayMiddlewareManagerFactory {
    if (!this.instance) {
      this.instance = new ApiGatewayMiddlewareManagerFactory()
    }

    return this.instance
  }

  public make (): MiddlewareManagerInterface<APIGatewayProxyEvent, APIGatewayProxyResult> {
    const middlewareManager = new MiddlewareManager<APIGatewayProxyEvent, APIGatewayProxyResult>(
      new ApiGatewayMiddlewareErrorHandler()
    )
    middlewareManager.use([
      new CheckRoutesMiddleware(),
      new CheckVariableMiddleware(),
      new ConnectDatabaseMiddleware(),
      new AdaptRouteMiddleware()
    ])
    return middlewareManager
  }
}
