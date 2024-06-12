import { UserEntity } from '@/domain/entities'

export interface LoadUserUseCase {
  perform: (params: LoadUserUseCase.Params) => Promise<LoadUserUseCase.Result>
}

export namespace LoadUserUseCase{
  export type Params = {
    email: string
  }

  export type Result = UserEntity | Error | {}

}
