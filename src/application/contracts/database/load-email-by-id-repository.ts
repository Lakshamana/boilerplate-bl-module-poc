export interface LoadEmailByIdRepository {
  loadById: <U>(params: LoadEmailByIdRepository.Params) => Promise<U | false>
}

export namespace LoadEmailByIdRepository {
  export type Params = {
    userId: string
    table: string
  }
}
