import { MiddlewareInterface } from '@/main/config/middlewares'
import { isPathWithMiddleware } from '@/main/config/middlewares/helper'
import { InvalidTokenError } from '@/domain/errors'
import { LoadTokenInfoTreaty } from '@/application/microservices'
import { unathorizedError } from '@/presentation/helpers'

export class CheckBrandUserTokenMiddleware implements MiddlewareInterface<any, any> {
  static middlewareName = 'CheckBrandUserTokenMiddleware'

  constructor (private readonly msLoadTokenInfo: LoadTokenInfoTreaty) {}

  next!: MiddlewareInterface<any, any>

  async handle (request: any): Promise<any> {
    const hasMiddleware = isPathWithMiddleware({
      path: request?.route?.path,
      middlewareName: CheckBrandUserTokenMiddleware.middlewareName
    })

    if (!hasMiddleware) return this.next.handle(request)

    const parsedBody = JSON.parse(request?.body || '{}')
    const accessToken = parsedBody.accessToken

    if (!accessToken) {
      return unathorizedError(new InvalidTokenError())
    }

    const loadedTokenInfo = await this.msLoadTokenInfo.perform({ accessToken })

    if (loadedTokenInfo instanceof Error) {
      return unathorizedError(new InvalidTokenError())
    }

    const { brandId } = loadedTokenInfo.permissions[0] || {}

    if (!brandId) {
      return unathorizedError(new InvalidTokenError())
    }

    parsedBody.brandId = brandId
    request.body = JSON.stringify(parsedBody)

    return await this.next.handle(request)
  }
}
