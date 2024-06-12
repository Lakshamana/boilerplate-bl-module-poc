import {
  LoadEmailByIdRepository
} from '@/application/contracts/database'
import { UserStrategy } from '@/application/services/user'
import { Tokens } from '@/domain/enums'
import { CreatorModelRequest, CreatorModelResponse } from '@/domain/models/creator'
import {
  CheckEmailUseCase
} from '@/domain/usecases/user'
import { Inject, Injectable } from '@lakshamana-pocs/registry'

@Injectable()
export class CreatorStrategy<T extends CreatorModelRequest> implements UserStrategy<T> {
  @Inject(Tokens.userRepository)
  private readonly loadEmailByIdRepo: LoadEmailByIdRepository

  async loadEmail (params: T):
  Promise<CheckEmailUseCase.Result> {
    const { userId } = params
    const table = 'colab_user'

    const isEmail = await this.loadEmailByIdRepo
      .loadById<CreatorModelResponse.CheckResult>({ userId, table })

    if (!isEmail) return new Error('Email not found')
    return isEmail
  }
}
