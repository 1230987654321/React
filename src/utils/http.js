// 封装axios
import axios from 'axios'
import { clearToken, getToken, history } from '@/utils'
const http = axios.create({
  baseURL: 'http://192.168.1.112:8080/admin',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.token = `${token}`
  }
  return config
}, (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 401) {
      // 重定向到登录
    }
  }
  return Promise.reject(error)
})
// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.data.code === 401) {
    // 重定向到登录
    history.push('/login')
    clearToken()
  }
  return Promise.reject(error.response.data.message)
})
export { http }