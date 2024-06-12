import { ContextUser } from '@/application/services/user'
import { ContextUserContainerContract } from '@/application/contracts/containers'

export class ContextUserContainer implements ContextUserContainerContract {
  constructor (
    private readonly strategies: Map<
    ContextUserContainerContract.UserEnumType,
    ContextUser>
  ) {}

  make (userType: ContextUserContainerContract.UserEnumType):
  ContextUser | undefined {
    const context = this.strategies.get(userType)
    if (!context) {
      return undefined
    }

    return context
  }
}
