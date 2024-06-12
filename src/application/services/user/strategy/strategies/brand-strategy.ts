import {
  LoadEmailByIdRepository
} from '@/application/contracts/database'
import { UserStrategy } from '@/application/services/user'
import { Tokens } from '@/domain/enums'
import { BrandModelRequest, BrandModelResponse } from '@/domain/models/brand'
import {
  CheckEmailUseCase
} from '@/domain/usecases/user'
import { Inject, Injectable } from '@lakshamana-pocs/registry'

@Injectable()
export class BrandStrategy<T extends BrandModelRequest> implements UserStrategy<T> {
  @Inject(Tokens.userRepository)
  private readonly loadEmailByIdRepo: LoadEmailByIdRepository

  async loadEmail (params: T):
  Promise<CheckEmailUseCase.Result> {
    const { userId } = params
    const table = 'brand_users'

    const isEmail = await this.loadEmailByIdRepo
      .loadById<BrandModelResponse.CheckResult>({ userId, table })

    if (!isEmail) return new Error('Email not found')
    return isEmail
  }
}
