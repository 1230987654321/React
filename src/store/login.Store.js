// 登录模块
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, clearToken } from '@/utils'
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  // 登录
  login = async ({ username, password }) => {
    const res = await http.post('/toLogin', { username, password })
    this.token = res.data.data
    setToken(this.token)
  }

  // 退出登录
  loginOut = async () => {
    await http.get('/logout')
    this.token = ''
    clearToken()
  }
}
export default LoginStore 