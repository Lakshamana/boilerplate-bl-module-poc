export class NotFoundUserError extends Error {
  constructor () {
    super('Informed user not found!!')
    this.name = 'NotFoundUserError'
  }
}
