// 登录模块
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken } from '@/utils'
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  // 登录
  login = async ({ username, password }) => {
    const res = await http.post('/admin/toLogin', { username, password })

    if (res.status !== 200) {
      throw new Error('请稍后再试')
    }

    if (res.data.code !== 200) {
      throw new Error(res.data.message)
    }

    this.token = res.data.data
    setToken(this.token)
  }
}
export default LoginStore 