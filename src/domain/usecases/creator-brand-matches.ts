export interface CreatorBrandMatchesUsecase {
  perform: (
    params: CreatorBrandMatchesUsecase.Params,
  ) => Promise<CreatorBrandMatchesUsecase.Result>
}

export namespace CreatorBrandMatchesUsecase {
  export type Params = {
    token: string
  }

  export type Response = {
    data: Array<{
      challengeId: number
      rewardValue: number
      rewradType: string
      couponValue: number
      couponValueType: string
      brandId: number
      brandName: string
      brandLogo: string
    }>
  }

  export type Result = any
}
