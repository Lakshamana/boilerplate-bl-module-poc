export const variables = {
  dbCatalystHost: process.env.DB_CATALYST_HOST ?? 'undefined',
  dbCatalystUser: process.env.DB_CATALYST_USER ?? 'undefined',
  dbCatalystPass: process.env.DB_CATALYST_PASS ?? 'undefined',
  dbCatalystName: process.env.DB_CATALYST_NAME ?? 'undefined',
  dbCatalystPort: process.env.DB_CATALYST_PORT ?? 'undefined',
  corsOriginPermission: process.env.CORS_ORIGIN_PERMISSION ?? 'undefined',
  apiKey: process.env.CATALYST_API_KEY ?? 'undefined',
  domainName: process.env.DOMAIN_NAME ?? 'undefined'
}

export const testVariables = (): boolean => {
  return Object.values(variables).every((value) => {
    return value !== 'undefined'
  })
}
