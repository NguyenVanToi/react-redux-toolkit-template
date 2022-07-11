export enum StatusLoading {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  FAILED = 'FAILED',
}
export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
