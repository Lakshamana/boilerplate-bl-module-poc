import { DatabaseTransactionManagerContract } from '@/application/contracts/database'
import { DatabaseConnection } from '../connections'

export class DatabaseTransactionManager implements DatabaseTransactionManagerContract {
  constructor (
    private readonly databaseConnection: DatabaseConnection
  ) {}

  async transaction <T = any>(callback: () => T | Promise<T>): Promise<T> {
    return this.databaseConnection.transaction(callback)
  }
}
