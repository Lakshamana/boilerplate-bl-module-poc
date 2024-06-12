// import {
//   ContextUser,
//   UserStrategy
// } from '@/application/services/user'
//
// export class ContextUserFactory {
//   private static instance: ContextUserFactory | undefined
//
//   private constructor () {}
//
//   public static getInstance (): ContextUserFactory {
//     if (!this.instance) {
//       this.instance = new ContextUserFactory()
//     }
//     return this.instance
//   }
//
//   public make (strategy: UserStrategy<any>): ContextUser {
//     return new ContextUser(
//       strategy
//     )
//   }
// }
