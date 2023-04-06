// 用户模块
import { makeAutoObservable } from "mobx"
class UserStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default UserStore