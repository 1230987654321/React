import { http } from '@/utils'
export const getRoleList = async (params) => {
  const response = await http.get(`/role/getRoleList?${params}`)
  return response.data.data
}
export const getRoleDetail = async (id) => {
  const response = await http.get("/role/getRoleDetail?id=" + id)
  return response.data.data
}
export const updateRole = async (params) => {
  const response = await http.put("/role/updateRole", params)
  return response.data
}
export const addRole = async (params) => {
  const response = await http.post("/role/addRole", params)
  return response.data
}
export const deleteRole = async (id) => {
  const response = await http.delete("/role/deleteRole?id=" + id)
  return response.data
}