import { http } from '@/utils'
export const getRolePageList = async (params) => {
  const response = await http.get(`/role/getRolePageList?${params}`)
  return response.data.data
}
export const getRoleById = async (id) => {
  const response = await http.get("/role/getRoleById?id=" + id)
  return response.data.data
}
export const updateRoleById = async (params) => {
  const response = await http.put("/role/updateRoleById", params)
  return response.data
}
export const addRole = async (params) => {
  const response = await http.post("/role/addRole", params)
  return response.data
}
export const deleteRoleById = async (id) => {
  const response = await http.delete("/role/deleteRoleById?id=" + id)
  return response.data
}
export const getAllRole = async () => {
  const response = await http.get("/role/getAllRole")
  return response.data.data
}