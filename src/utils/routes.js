import Home from '@/pages/Home'
import RoleIndex from '@/pages/Role/index'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/role/index',
    component: RoleIndex,
  }
]
// 然后再统一导出
export default routes