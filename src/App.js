// 导入路由
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter, history } from '@/utils'
// 导入页面组件
import * as Pages from '@/pages'
import { AuthRoute } from '@/components/AuthRoute'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/store'
import '@/App.css'
// 配置路由规则
function App () {
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
      }
    }

    fetchMenuList()
  }, [menuStore])
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
          </Route>
          <Route path="/login" element={<Pages.Login />} ></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App