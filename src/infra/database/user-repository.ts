import { DatabaseConnection } from '@/infra/database/connections'
import { LoadUserByEmailRepository, LoadEmailByIdRepository } from '@/application/contracts/database'
import {
  loadByEmailTransformer,
  loadByIdTransformer
} from '@/infra/database/transformers/user-repository'
import { Inject, Injectable } from '@lakshamana-pocs/registry'
import { Tokens } from '@/domain/enums'

@Injectable()
export class UserRepository implements LoadUserByEmailRepository, LoadEmailByIdRepository {
  @Inject(Tokens.catalystDbConnection)
  private readonly connection: DatabaseConnection

  async loadByEmail (params: LoadUserByEmailRepository.Params): Promise<any> {
    const { email } = params

    const rows: LoadUserByEmailRepository.Entity[] =
    await this.connection.execute<[]>(`Select id, name, email, token from colab_user where email='${email}'`)

    return loadByEmailTransformer(rows)
  }

  async loadById (params: LoadEmailByIdRepository.Params): Promise<any> {
    const { userId, table } = params

    const rows: LoadUserByEmailRepository.Entity[] =
    await this.connection.execute<[]>(`Select email from ${table} where id='${String(userId)}'`)
    if (rows.length === 0) return false

    return loadByIdTransformer(rows)
  }
}
