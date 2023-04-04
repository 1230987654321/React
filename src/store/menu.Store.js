// 用户模块
import { makeAutoObservable } from "mobx"
import { getMenuList } from '@/api'
import { message } from 'antd'
class MenuStore {
  menuList = []
  constructor() {
    makeAutoObservable(this)
  }
  getMenuList = async (hidden) => {
    try {
      const res = await getMenuList(hidden)
      this.menuList = res
    } catch (error) {
      console.log("menuStore错误")
      // handle error
      message.error(error)
    }
  }
}

export default MenuStore