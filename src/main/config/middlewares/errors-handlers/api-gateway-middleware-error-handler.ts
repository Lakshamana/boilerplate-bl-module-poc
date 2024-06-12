import { APIGatewayProxyResult } from 'aws-lambda'
import { cors } from '../../cors'
import { MiddlewareErrorHandlerInterface } from './middleware-error-handler-interface'

export class ApiGatewayMiddlewareErrorHandler implements MiddlewareErrorHandlerInterface<APIGatewayProxyResult> {
  handle (error: unknown): APIGatewayProxyResult {
    console.error('[UNEXPECTED ERROR]:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as {name?: string})?.name ?? 'Unexpected error.' }),
      headers: cors()
    }
  }
}
