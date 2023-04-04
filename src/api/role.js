import { http } from '@/utils'
export const getRoleList = async (params) => {
  const response = await http.get(`/role/getRoleList?${params}`)
  return response.data.data
}