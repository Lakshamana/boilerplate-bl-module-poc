import { UserEntity } from '@/domain/entities'

export interface LoadUserByEmailRepository {
  loadByEmail: (params: LoadUserByEmailRepository.Params) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository{
  export type Params = {
    email: string
  }

  export type Result = UserEntity | false

  export type Entity = UserEntity
}
