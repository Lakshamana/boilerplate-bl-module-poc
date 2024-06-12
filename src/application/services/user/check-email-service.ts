import { ContextUserContainerContract } from '@/application/contracts/containers'
import { Tokens } from '@/domain/enums'
import { CheckEmailUseCase } from '@/domain/usecases/user'
import { Inject, Injectable } from 'module-poc'

@Injectable()
export class CheckEmailService implements CheckEmailUseCase {
  @Inject(Tokens.contextUserContainer)
  private readonly contextFactory: ContextUserContainerContract

  async perform (
    params: CheckEmailUseCase.Params
  ): Promise<CheckEmailUseCase.Result> {
    const { userType, ...props } = params

    const context = this.contextFactory.make(userType)
    if (!context) {
      return new Error()
    }

    return await context.loadEmail(props)
  }
}
