export class UnauthorizedError extends Error {
  constructor () {
    super('Authentication failure, unauthorized credentials')
    this.name = 'UnauthorizedError'
  }
}
