// 导入路由
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter, history } from '@/utils'
// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import { AuthRoute } from '@/components/AuthRoute'

import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

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
            <Route index element={<Home />}></Route>
            <Route path='article' element={<Article />}></Route>
            <Route path='publish' element={<Publish />}></Route>
          </Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App