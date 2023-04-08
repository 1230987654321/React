// 把工具函数到处的模块在这里导入
import { http } from './http'
import { getToken, setToken, clearToken } from './token'
import { HistoryRouter, history } from './history'
import routes from './routes'
import PrivateRoute from './routes'
// 然后再统一导出
export {
  http,
  getToken,
  setToken,
  clearToken,
  HistoryRouter,
  history,
  routes,
  PrivateRoute
}