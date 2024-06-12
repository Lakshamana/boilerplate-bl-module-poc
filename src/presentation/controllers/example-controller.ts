import { Controller } from '@/presentation/controllers/controller-abstract'
import { HttpResponse, success, badRequest } from '@/presentation/helpers'
import { Validation } from '@/presentation/interfaces'
import { Inject, Injectable } from '@lakshamana-pocs/registry'
import { Tokens } from '@/domain/enums'
import { CheckEmailService, LoadUserService } from '@/application/services'
import { CreatorBrandMatchesService } from '@/application/services/user'

type Request = { email: string, userType: number, userId: string }

@Injectable()
export class ExampleController extends Controller {
  @Inject(Tokens.exampleValidation) private readonly validation: Validation

  constructor (
    private readonly loadUserService: LoadUserService,
    private readonly checkEmailService: CheckEmailService,
    private readonly userBrandMatchService: CreatorBrandMatchesService
  ) { super() }

  override async perform (request: Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) return badRequest(error)

    const { email, userType, userId } = request
    const isResult = await this.loadUserService.perform({ email })

    const whichEmail = await this.checkEmailService.perform({
      userType,
      userId
    })

    let matches = []

    if (!(isResult instanceof Error) && isResult?.token) {
      matches = await this.userBrandMatchService.perform({
        token: isResult.token
      })
    }

    console.log('Email Retornado: ', whichEmail)

    return isResult instanceof Error
      ? badRequest(isResult)
      : success({ data: { ...isResult, matches } })
  }
}
