// 导入路由
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter, history, routes } from '@/utils'
// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { AuthRoute } from '@/components/AuthRoute'
import React from 'react'
import '@/App.css'
// 配置路由规则
function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          } >
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
            {/* {menuRoutes} */}
          </Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}
export default App