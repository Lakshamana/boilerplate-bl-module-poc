import { DatabaseConnection } from '@/infra/database/connections'
import { DatabaseConnections } from '../database-connections'
import { MiddlewareInterface } from './middleware-interface'

export class ConnectDatabaseMiddleware implements MiddlewareInterface<any, any> {
  private readonly connections: DatabaseConnection[]
  public next!: MiddlewareInterface<any, any>

  constructor () {
    this.connections = Object.values(DatabaseConnections)
  }

  async handle (request: any): Promise<any> {
    if (!this.next) throw new Error('Next middleware not defined')
    try {
      await Promise.all(this.connections.map(async (connection) => connection.open()))

      return await this.next.handle(request)
    } finally {
      await Promise.all(this.connections.map(async (connection) => connection.close()))
    }
  }
}
