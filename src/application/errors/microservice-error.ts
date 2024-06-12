export class MicroserviceError extends Error {
  constructor (error: string) {
    super(`MicroserviceError: ${error}`)
    this.name = 'MicroserviceError'
  }
}
