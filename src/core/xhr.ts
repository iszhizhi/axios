import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { timeout, method = 'get', data = null, url, headers = {}, responseType } = config
    const request = new XMLHttpRequest()

    // 响应类型
    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const reponseData = request.responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        config,
        request,
        status: request.status,
        headers: responseHeaders,
        statusText: request.statusText,
        data: reponseData
      }

      handResponse(response)
    }

    request.onerror = function handError() {
      reject(createError(config, 'network err', null, request))
    }

    request.ontimeout = function handTimeout() {
      reject(createError(config, `timeout${timeout}`, 'timeout', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handResponse(response: AxiosResponse) {
      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(createError(config, `status code err ${request.status}`, null, request, response))
      }
    }
  })
}
