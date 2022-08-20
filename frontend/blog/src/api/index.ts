/*
3.4.2 增加请求接口时登录和未登录的处理逻辑
在原来请求后端的定义上，改造src/api/index.ts，增加登录和未登录的处理逻辑。

Django Rest Framework 使用标准的Http code表示未授权登录，所以需要对Http的code做判断
通过工具方法，在请求接口时，带上X-CRSFToken
在获得请求结果后，判断状态码，如果不是200相关的正确码，则全局提示异常
如果是401的状态码，则跳转到登录页面
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import router from "../router";
import { getCookie } from "../utills";

const request = axios.create({
  baseURL: import.meta.env.MODE !== "production" ? "/api" : "",
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  // Django SessionAuthentication need csrf token
  // headers可能为空
  if (config && config.headers) {
    config.headers['X-CSRFToken'] = getCookie('csrftoken')
  }
  return config
})

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data
    console.log('response => ', response)
    if (data.status === '401') {
      localStorage.removeItem('user');
      ElMessage({
        message: data.error,
        type: 'error',
        duration: 1.5 * 1000
      })
      return router.push('/login')
    } else if (data.status === 'error') {
      ElMessage({
        message: data.error || data.status,
        type: 'error',
        duration: 1.5 * 1000
      })
    }

    if (data.success === false && data.msg) {
      ElMessage({
        message: data.msg,
        type: 'error',
        duration: 1.5 * 1000
      })
    }

    return data
  },
  ({ message, response }) => {
    console.log('err => ', message, response) // for debug
    if (response && response.data && response.data.detail) {
      ElMessage({
        message: response.data.detail,
        type: 'error',
        duration: 2 * 1000
      })
    } else {
      ElMessage({
        message: message,
        type: 'error',
        duration: 2 * 1000
      })
    }
    if (response && (response.status === 403 || response.status === 401)) {
      localStorage.removeItem('user');
      return router.push('/login')
    }
    return Promise.reject(message)
  }
)

export default request;
