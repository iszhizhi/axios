export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'patch'
  | 'PATCH'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  status: number
  statusText: string
  data: any
  headers: any
  request: any
  config: AxiosRequestConfig
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: any
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosPromise): AxiosPromise
  delete(url: string, config?: AxiosPromise): AxiosPromise
  head(url: string, config?: AxiosPromise): AxiosPromise
  options(url: string, config?: AxiosPromise): AxiosPromise
  put(url: string, data?: any, config?: AxiosPromise): AxiosPromise
  push(url: string, data?: any, config?: AxiosPromise): AxiosPromise
  petch(url: string, data?: any, config?: AxiosPromise): AxiosPromise
}

// 混合对象
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
