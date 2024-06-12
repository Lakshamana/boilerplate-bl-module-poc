export interface DatabaseTransactionManagerContract {
  transaction: <T = any> (callback: () => T | Promise<T>) => Promise<T>
}
