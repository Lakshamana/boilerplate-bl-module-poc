import { UserStrategy } from './contracts/user-strategy'

export type Params = {
  userId: string
}

export interface ContextUserInterface {
  setStrategy: (strategy: UserStrategy<any>) => void

  loadEmail: (params: UserStrategy<any>)
  => Promise<UserStrategy.Result>
}

export class ContextUser implements ContextUserInterface {
  constructor (private strategy: UserStrategy<any>) {}

  public setStrategy (strategy: UserStrategy<any>): void {
    this.strategy = strategy
  }

  async loadEmail (params: any):
  Promise<UserStrategy.Result> {
    return this.strategy.loadEmail(params)
  }
}
