// import { AxiosHttpClientFactory } from './axios-factory'
// import { RequestHelperAdapter } from '@/infra/gateway/http'
//
// export class RequestHelperFactory {
//   private static instance: RequestHelperFactory
//
//   public static getInstance (): RequestHelperFactory {
//     if (!this.instance) {
//       this.instance = new RequestHelperFactory()
//     }
//     return this.instance
//   }
//
//   public make (): RequestHelperAdapter {
//     return new RequestHelperAdapter(
//       AxiosHttpClientFactory.getInstance().make()
//     )
//   }
// }
