import { http } from '@/utils'
export const login = async (data) => {
  const response = await http.post("/toLogin", data)
  return response.data.data
}

export const loginOut = async () => {
  const response = await http.get("/logout")
  return response.data.data
}
