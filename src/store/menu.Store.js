// 用户模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class MenuStore {
  menuList = []
  constructor() {
    makeAutoObservable(this)
  }
  getMenuList = async (hidden) => {
    const res = await http.get('/menu/getAllMenu?hidden=' + hidden)
    this.menuList = res.data.data
  }
}

export default MenuStore