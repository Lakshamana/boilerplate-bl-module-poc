import { DatabaseConnection, MysqlConnection } from '@/infra/database/connections'
import { variables } from './variables'

export const DatabaseConnections: { [key: string]: DatabaseConnection } = {
  catalyst: new MysqlConnection({
    host: variables.dbCatalystHost,
    port: Number(variables.dbCatalystPort),
    user: variables.dbCatalystUser,
    password: variables.dbCatalystPass,
    database: variables.dbCatalystName
  })
}
