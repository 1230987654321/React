import { http } from '@/utils'
export const getUserInfo = async () => {
  const response = await http.get('/admin/getInfo')
  return response.data.data
}
export const getAdminPageList = async (params) => {
  const response = await http.get(`/admin/getAdminPageList?${params}`)
  return response.data.data
}
export const getAdminById = async (id) => {
  const response = await http.get('/admin/getAdminById?id=' + id)
  return response.data.data
}
