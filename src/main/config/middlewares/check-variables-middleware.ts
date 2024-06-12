import { EnvironmentVariablesError } from '@/presentation/errors'
import { environmentError } from '@/presentation/helpers'
import { variables } from '../variables'
import { MiddlewareInterface } from './middleware-interface'

export class CheckVariableMiddleware implements MiddlewareInterface<any, any> {
  next!: MiddlewareInterface<any, any>
  async handle (request: any): Promise<any> {
    if (!this.isValidVariables()) return environmentError(new EnvironmentVariablesError())
    if (!this.next) throw new Error('Next middleware not defined')
    return this.next.handle(request)
  }

  isValidVariables (): boolean {
    return Object.values(variables).every((value) => {
      return value !== 'undefined'
    })
  }
}
