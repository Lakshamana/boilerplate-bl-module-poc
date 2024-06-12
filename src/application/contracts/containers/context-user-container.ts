import { UserEnum } from '@/domain/enums'
import { ContextUser } from '@/application/services/user'

export interface ContextUserContainerContract {
  make: (userType: UserEnum) => ContextUser | undefined
}
export namespace ContextUserContainerContract {
  export type UserEnumType = UserEnum
}
