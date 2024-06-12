import { Tokens } from '@/domain/enums'

import { LoadUserUseCase } from '@/domain/usecases/user'
import { UserRepository } from '@/infra/database'
import { NotFoundUserError } from '@/presentation/errors'
import { Inject, Injectable } from '@lakshamana-pocs/registry'

@Injectable()
export class LoadUserService implements LoadUserUseCase {
  @Inject(Tokens.userRepository)
  private readonly loadUserByEmailRepository: UserRepository

  async perform (params: LoadUserUseCase.Params): Promise<LoadUserUseCase.Result> {
    const { email } = params

    const user = await this.loadUserByEmailRepository.loadByEmail({ email })
    if (!user) return new NotFoundUserError()

    return user
  }
}
