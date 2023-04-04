// 用户模块
import { makeAutoObservable } from "mobx"
import { getRoleList } from '@/api'
class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }
  getRoleList = async (params) => {
    return await getRoleList(params)
  }
}

export default RoleStore