export interface DatabaseConnection<> {
  open: () => Promise<void>
  close: () => Promise<void>
  execute: <T = any> (query: string, values?: any[]) => Promise<T>
  transaction: <T = any> (callback: () => T | Promise<T>) => Promise<T>
}
