export type HttpExceptionResponse<T = any> = {
  statusCode: number
  data: T
}

export const capsuleException = (statusCode: number, error: Error):
HttpExceptionResponse<Error> => ({
  statusCode: statusCode,
  data: error
})

export const capsuleHttpResponse = <T>(statusCode: number, data: any):
HttpExceptionResponse<T> => ({
    statusCode: statusCode,
    data: data
  })
