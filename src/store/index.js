import React from "react"
import LoginStore from './login.Store'
import UserStore from './user.Store'
import MenuStore from './menu.Store'
class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.menuStore = new MenuStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => {
  const store = React.useContext(StoresContext)
  if (!store) {
    throw new Error("存储不能为空,请添加上下文提供程序")
  }
  return store
}