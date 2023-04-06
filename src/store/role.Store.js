// 用户模块
import { makeAutoObservable } from "mobx"
class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RoleStore