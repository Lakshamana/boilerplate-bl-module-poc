import { MiddlewareErrorHandlerInterface } from './middleware-error-handler-interface'

export class SqsMiddlewareErrorHandler implements MiddlewareErrorHandlerInterface<undefined> {
  handle (error: unknown): undefined {
    throw error
  }
}
