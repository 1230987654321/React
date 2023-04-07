import Home from '@/pages/Home'
import RoleIndex from '@/pages/Role/index'
import RoleAccount from '@/pages/Role/account'
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/role/index',
    component: RoleIndex,
  },
  {
    path: '/role/account',
    component: RoleAccount,
  }
]
// 然后再统一导出
export default routes