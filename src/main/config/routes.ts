import { Provider, TypedConstructor } from '@lakshamana-pocs/registry'

import { ExampleController } from '@/presentation/controllers'
import { Controller } from '@/presentation/controllers/controller-abstract'
import { exampleProviders } from './providers'

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
