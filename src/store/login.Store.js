// 登录模块
import { makeAutoObservable } from "mobx"
import { login, loginOut } from '@/api'
import { setToken, getToken, clearToken } from '@/utils'
import { message } from 'antd'
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  // 登录
  async login (data) {
    try {
      const response = await login(data)
      this.token = response
      setToken(this.token)
    } catch (error) {
      // handle error

      console.log("loginStore错误")
      message.error(error)
      throw error
    }
  }

  // 退出登录
  async loginOut () {
    await loginOut()
    this.token = ''
    clearToken()
  }
}
export default LoginStore 