import { Tokens, UserEnum } from '@/domain/enums'
import { UserStrategy, ContextUser } from '@/application/services/user'
import { ContextUserContainerContract } from '@/application/contracts/containers'
import { ContextUserContainer } from '@/infra/containers'
import { Inject } from '@lakshamana-pocs/registry'
import { CreatorModelRequest } from '@/domain/models/creator'
import { BrandModelRequest } from '@/domain/models/brand'

export class ContextStrategiesContainerFactory {
  private static instance: ContextStrategiesContainerFactory|undefined

  @Inject(Tokens.brandStrategy)
  private readonly brandStrategy: UserStrategy<BrandModelRequest>

  @Inject(Tokens.creatorStrategy)
  private readonly creatorStrategy: UserStrategy<CreatorModelRequest>

  private constructor () {}

  public static getInstance (): ContextStrategiesContainerFactory {
    if (!this.instance) {
      this.instance = new ContextStrategiesContainerFactory()
    }
    return this.instance
  }

  private makeContext (strategy: UserStrategy<any>):
  ContextUser {
    return new ContextUser(strategy)
  }

  make (): ContextUserContainerContract {
    const strategiesMap = new Map<UserEnum, ContextUser>([
      [UserEnum.BRAND, this.makeContext(this.brandStrategy)],
      [UserEnum.CREATOR, this.makeContext(this.creatorStrategy)]
    ])

    return new ContextUserContainer(strategiesMap)
  }
}
