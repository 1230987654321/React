// 导入路由
import { Route, Routes, BrowserRouter } from 'react-router-dom'
// import { HistoryRouter, history } from '@/utils'
// 导入页面组件
import Login from '@/pages/login'
import Layout from '@/pages/layout'
import { AuthRoute } from '@/components/AuthRoute'
import React from 'react'
import loadable from '@loadable/component'
import '@/App.css'
import { getAllMenuList } from '@/api'
import { useEffect, useState } from 'react'
// 配置路由规则
function App () {
  const [routes, setRoutes] = useState([])
  useEffect(() => {
    getAllMenuList(1).then((data) => {
      setRoutes(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          } >
            {routes.map((route) => {
              const ComponentNode = loadable(() => import(`@/pages/${route.component}`))
              return (
                <Route key={route.path} path={route.path === "/" ? route.path : route.component} element={<ComponentNode />} />
              )
            })}
          </Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App