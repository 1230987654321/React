import { http } from '@/utils'
export const getMenuList = async (hidden) => {
  const response = await http.get('/menu/getAllMenu?hidden=' + hidden)
  return response.data.data
}
export const getAllMenuList = async (hidden) => {
  const response = await http.get('/menu/getAllMenuList?hidden=' + hidden)
  return response.data.data
}