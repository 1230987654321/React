// 用户模块
import { makeAutoObservable } from "mobx"
import { getUserInfo } from '@/api'
import { message } from 'antd'
class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  async getUserInfo () {
    try {
      const res = await getUserInfo()
      this.userInfo = res
    } catch (error) {
      // handle error
      message.error(error)
    }
  }
}

export default UserStore