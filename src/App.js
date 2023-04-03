// 导入路由
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter, history } from '@/utils'
// 导入页面组件
import * as Pages from '@/pages'
import { AuthRoute } from '@/components/AuthRoute'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/store'
import '@/App.css'
import { Spin } from 'antd'
// 配置路由规则
function App () {
  const [isLoading, setIsLoading] = useState(true)
  const [menuRoutes, setMenuRoutes] = useState([])
  const { menuStore } = useStore()
  useEffect(() => {
    async function fetchMenuList () {
      try {
        await menuStore.getMenuList(1)
        const menuList = menuStore.menuList
        const newMenuRoutes = []
        for (const item of menuList) {
          if (item.children && item.children.length > 0) {
            const childRoutes = []
            for (const childItem of item.children) {
              const PageComponent = Pages[childItem.name]
              childRoutes.push(<Route key={"/" + childItem.component} path={"/" + childItem.component} element={<PageComponent />} />)
            }
            newMenuRoutes.push(
              <Route key={item.path} path={item.path}>
                {childRoutes}
              </Route>
            )
          } else {
            const PageComponent = Pages[item.name]
            newMenuRoutes.push(<Route key={item.path} path={item.path} element={<PageComponent />} />)
          }
        }
        setMenuRoutes(newMenuRoutes)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenuList()
  }, [menuStore])

  if (isLoading) {
    return <Spin size="large" />
    // return <div>Loading...</div>
  }

  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <AuthRoute>
              <Pages.Layout />
            </AuthRoute>
          } >
            {menuRoutes}
            {/* <Route path="/" element={<Pages.Home />} ></Route>
            <Route path="/role" element={<Pages.Role />} ></Route>
            <Route path="/role/index" element={<Pages.Role />} ></Route> */}
          </Route>
          <Route path="/login" element={<Pages.Login />} ></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App