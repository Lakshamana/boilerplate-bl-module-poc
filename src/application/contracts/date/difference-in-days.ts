export interface DifferenceInDaysContract {
  differenceInDays: (params: DifferenceInDaysContract.Params) => DifferenceInDaysContract.Result
}

export namespace DifferenceInDaysContract {
  export type Params = {
    dateLeft: Date
    dateRight: Date
  }

  export type Result = number
}
