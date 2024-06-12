export class UnavailableError extends Error {
  constructor () {
    super('The server is not ready to handle the request.')
    this.name = 'UnavailableError'
  }
}
