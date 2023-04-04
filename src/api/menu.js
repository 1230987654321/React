import { http } from '@/utils'
export const getMenuList = async (hidden) => {
  const response = await http.get('/menu/getAllMenu?hidden=' + hidden)
  return response.data.data
}