import { Controller } from '@/presentation/controllers/controller-abstract'
import { HttpResponse, success, badRequest } from '@/presentation/helpers'
import { Validation } from '@/presentation/interfaces'
import { Inject, Injectable } from 'module-poc'
import { Tokens } from '@/domain/enums'
import { CheckEmailService, LoadUserService } from '@/application/services'

type Request = { email: string, userType: number, userId: string }

@Injectable()
export class ExampleController extends Controller {
  @Inject(Tokens.exampleValidation) private readonly validation: Validation

  constructor (
    private readonly loadUserService: LoadUserService,
    private readonly checkEmailService: CheckEmailService
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

    console.log('Email Retornado: ', whichEmail)

    return isResult instanceof Error
      ? badRequest(isResult)
      : success({ data: isResult })
  }
}
