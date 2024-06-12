import { Provider } from '@lakshamana-pocs/registry'

import { CheckEmailService, LoadUserService } from '@/application/services'
import { BrandStrategy, CreatorStrategy } from '@/application/services/user'
import { Tokens } from '@/domain/enums'
import { BrandModelRequest } from '@/domain/models/brand'
import { CreatorModelRequest } from '@/domain/models/creator'
import { DatabaseTransactionManager } from '@/infra/database/transaction'
import { RequestHelperAdapter, AxiosHttpClient } from '@/infra/gateway/http'
import { ContextStrategiesContainerFactory } from '../factories/containers'
import { ExampleValidationFactory } from '../factories/validations'
import { DatabaseConnections } from './database-connections'
import { UserRepository } from '@/infra/database'

export const exampleProviders: Provider[] = [
  CheckEmailService,
  LoadUserService,
  RequestHelperAdapter,
  AxiosHttpClient,
  {
    provide: Tokens.brandStrategy,
    useClass: BrandStrategy<BrandModelRequest>
  },
  {
    provide: Tokens.creatorStrategy,
    useClass: CreatorStrategy<CreatorModelRequest>
  },
  {
    provide: Tokens.userRepository,
    useClass: UserRepository
  },
  {
    provide: Tokens.contextUserContainer,
    useFactory: () => ContextStrategiesContainerFactory.getInstance().make()
  },
  {
    provide: Tokens.exampleValidation,
    useFactory: () => ExampleValidationFactory.getInstance().make()
  },
  {
    provide: Tokens.catalystDbConnection,
    useFactory: () => DatabaseConnections.catalyst
  },
  {
    provide: Tokens.databaseTransactionManager,
    useFactory: () => new DatabaseTransactionManager(DatabaseConnections.catalyst)
  }
]
