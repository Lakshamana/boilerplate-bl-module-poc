export interface UploadFileStorage {
  push: (params: UploadFileStorage.Params) => Promise<UploadFileStorage.Result>
}

export namespace UploadFileStorage {
  export type Params = {
    file: Buffer
    directoryBucket: string
  }

  export type Result = boolean
}
