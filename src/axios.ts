import { AxiosInstance } from './types/index'
import { Axios } from './core/Axios'
export function createInstace(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  return instance as AxiosInstance
}

const axios = createInstace()

export default axios
