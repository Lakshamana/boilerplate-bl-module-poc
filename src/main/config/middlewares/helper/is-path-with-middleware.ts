import { routesGroup } from '@/main/config/routes'

type Params = {
  path: string
  middlewareName: string
}

export const isPathWithMiddleware = (params: Params): boolean => {
  const { path, middlewareName } = params
  return routesGroup().routes.some(
    (route) => route.route.path === path && route.middlewares?.includes(middlewareName)
  )
}
