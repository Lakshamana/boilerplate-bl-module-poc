export class InvalidRouteError extends Error {
  constructor () {
    super('Informed route is invalid!!')
    this.name = 'InvalidRouteError'
  }
}
