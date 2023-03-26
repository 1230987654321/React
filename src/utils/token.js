const TOKEN_KEY = 'pc_token'

const getToken = () => localStorage.getItem(TOKEN_KEY)

const setToken = token => localStorage.setItem(TOKEN_KEY, token)

const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (error) {
    throw new Error("清除token失败")
  }
}

export { getToken, setToken, clearToken }