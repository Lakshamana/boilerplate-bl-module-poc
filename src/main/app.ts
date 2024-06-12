import './config/module-alias'
import { ApiGatewayMiddlewareManagerFactory } from '@/main/factories/middleware-managers'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy'

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult | undefined> => {
  const middlewareManager = ApiGatewayMiddlewareManagerFactory.getInstance().make()
  return middlewareManager.execute(event)
}
