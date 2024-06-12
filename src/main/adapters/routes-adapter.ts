import { routesGroup } from '@/main/config/routes'
import { AdapterLambda } from '@/main/adapters'
import { Controller } from '@/presentation/controllers/controller-abstract'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda/trigger/api-gateway-proxy'
import { Container } from 'module-poc'

type Route = { event: APIGatewayProxyEvent, route: string, method: Method }
type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
type GuardRoute = { route: string, method: string }
type SetOfRoutes = { route: { path: string, method: string } }

export const adaptRoute = async (params: Route): Promise <APIGatewayProxyResult | false> => {
  const { event, ...rest } = params
  const controller = defineRoute(rest)
  if (controller) {
    const adpater = new AdapterLambda(controller)
    return adpater.handler(event)
  }
  return false
}

const defineRoute = (params: GuardRoute): Controller | false => {
  const { route, method } = params

  const loadRoutes = routesGroup()
  const findRoute = loadRoutes.routes.find(
    (set: SetOfRoutes) => set.route.path === route &&
    set.route.method === method
  )

  if (!findRoute?.controller || !findRoute?.providers) return false

  const registry = Container
    .getRegistry()
    .init([...findRoute.providers, findRoute.controller])

  const controller = registry.get(findRoute.controller)

  return controller ?? false
}
