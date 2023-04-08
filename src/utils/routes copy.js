// 用于创建路由(可以根据数据，生成动态的路由)
import { useRoutes } from 'react-router-dom'
import Login from '@/pages/login'
import Home from '@/pages/Home'
import { getMenuList } from '@/api'
// react 动态加载组件 @loadable/component
import loadable from '@loadable/component'
import { observer, inject } from 'mobx-react'
import React from 'react'
const PrivateRoute = (props) => {
  function bindRouter (list) {
    let arr = list.map((item) => {
      const ComponentNode = loadable(() => {
        return import(item.path)
      })
      if (item.children && item.children.length > 0) {
        return {
          path: item.path,
          element: <ComponentNode />,
          children: [...bindRouter(item.children)]
        }
      } else {
        return {
          path: item.path,
          element: <ComponentNode />
        }
      }
    })
    console.log(arr)
    return arr
  }
  // 查询菜单列表
  let menuInfo = null
  getMenuList(0)
    .then((res) => {
      menuInfo = res
    })
  return useRoutes([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/index",
      element: <Home />,
      children: [...bindRouter(menuInfo)]
    }
  ])
}
console.log(PrivateRoute)

export default inject('user')(observer(PrivateRoute))