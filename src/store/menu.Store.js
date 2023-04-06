// 用户模块
import { makeAutoObservable } from "mobx"
class MenuStore {
  menuList = []
  constructor() {
    makeAutoObservable(this)
  }
}

export default MenuStore