import axios from 'axios'
import store from '@/store'
import { pathUrl } from '@/utils/path-url'
import { Message } from 'element-ui'
import router from '@/router'
import { cancelRequest } from './utils'
import { errorFunc } from './error'

const instance = axios.create({
  baseURL: pathUrl,
  timeout: 50000
})

window.axiosPromistArr = []

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    // config.headers['X-Token'] = getToken()
    config.headers['Authorization'] = 'Bearer ' + store.getters.token
    // config.headers['Content-type'] = 'application/json '
    config.headers['X-Token'] = store.getters.token
  } else {
    config.headers['Authorization'] = 'Basic d2ViQXBwOndlYkFwcA=='
  }
  // 取消请求
  config.cancelToken = new axios.CancelToken(cancel => {
    window.axiosPromistArr.push({ cancel })
  })
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  const { data } = response
  const { resp_code, resp_msg } = data
  switch (resp_code) {
    case 401:
      Message.error(resp_msg)
      break
  }
  return data
  // return response.data
}, (error) => {
  // 对响应错误做点什么
  errorFunc(error)
  // return Promise.reject(error)
})

// 封装axios的get请求
export const Request_get = ({ url, data }) => {
  return new Promise((resolve, reject) => {
    instance.request({
      url,
      data,
      method: 'get'
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的post请求
export const Request_post = ({ url, data, headers = {}, method = 'post' }) => {
  return new Promise((resolve, reject) => {
    instance.request({
      url,
      headers,
      data,
      method
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的post请求
export const Request_put = (obj) => {
  return Request_post({
    ...obj,
    method: 'put'
  })
}

// 封装axios的delete请求
export const Request_delete = (obj) => {
  return Request_post({
    ...obj,
    method: 'delete'
  })
}
