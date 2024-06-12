import { DatabaseConnection } from './database-connection'

import mysql, { Connection, ConnectionOptions, FieldPacket } from 'mysql2/promise'

export class MysqlConnection implements DatabaseConnection {
  private connection?: Connection

  constructor (private readonly config: ConnectionOptions) {}

  async open (): Promise<void> {
    try {
      this.connection = await mysql.createConnection(this.config)
    } catch (e) {
      console.error('[MYSQL CONNECTION ERROR]:', e)
      throw e
    }
  }

  async close (): Promise<void> {
    if (this.connection) {
      await this.connection.end()
    }
  }

  async execute<T = any>(query: string, values?: any[] | undefined): Promise<T> {
    if (this.connection) {
      console.log('MYSQL STATEMENT:', query)
      console.log('MYSQL STATEMENT PARAMS:', JSON.stringify(values, null, 2))

      const [resultSet]: [T, FieldPacket[]] = await this.connection.execute<any>(query, values)
      return resultSet
    }

    throw new Error('DB not connected')
  }

  async transaction<T = any>(callback: () => T | Promise<T>): Promise<T> {
    if (!this.connection) {
      throw new Error('DB not connected')
    }

    try {
      await this.connection.beginTransaction()
      const result = await callback()
      await this.connection.commit()

      return result
    } catch (e) {
      await this.connection.rollback()
      throw e
    }
  }
}
