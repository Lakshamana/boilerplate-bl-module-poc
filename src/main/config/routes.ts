import { CheckEmailService } from '@/application/services'
import { BrandStrategy, CreatorStrategy } from '@/application/services/user'
import { Tokens } from '@/domain/enums'
import { BrandModelRequest } from '@/domain/models/brand'
import { CreatorModelRequest } from '@/domain/models/creator'
import { UserRepository } from '@/infra/database'
import { DatabaseTransactionManager } from '@/infra/database/transaction'
import { AxiosHttpClient, RequestHelperAdapter } from '@/infra/gateway/http'
import { ExampleController } from '@/presentation/controllers'
import { Controller } from '@/presentation/controllers/controller-abstract'
import { Provider, TypedConstructor } from 'module-poc/dist/src/types'
import { LoadUserService } from '../../application/services/load-user'
import { ContextStrategiesContainerFactory } from '../factories/containers'
import { ExampleValidationFactory } from '../factories/validations'
import { DatabaseConnections } from './database-connections'

type SetRoute = {
  routes: Array <
  {
    route: {
      path: string
      method: string
    }
    controller: TypedConstructor<Controller>
    middlewares?: string[]
    providers?: Provider[]
  }
  >
}

export const routesGroup = (): SetRoute => ({
  routes: [
    {
      route: {
        path: '/example',
        method: 'POST'
      },
      controller: ExampleController,
      providers: exampleProviders
    }
  ]
})
