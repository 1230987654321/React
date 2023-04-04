import { http } from '@/utils'
export const getUserInfo = async () => {
  const response = await http.get('/admin/getInfo')
  return response.data.data
}