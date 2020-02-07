import { AxiosResponse, AxiosRequestConfig } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: any

  constructor(
    config: AxiosRequestConfig,
    message: string,
    code?: string | null,
    request?: any,
    response?: any
  ) {
    super(message)
    this.config = config
    this.isAxiosError = true
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  config: AxiosRequestConfig,
  message: string,
  code?: string | null,
  request?: any,
  response?: any
) {
  const error = new AxiosError(config, message, code, request, response)
  return error
}
