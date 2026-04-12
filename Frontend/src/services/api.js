const BASE_URL = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const config = { method, headers }
  if (body !== undefined) config.body = JSON.stringify(body)

  const response = await fetch(`${BASE_URL}${path}`, config)

  if (response.status === 204) return null

  const data = await response.json()

  if (!response.ok) throw data

  return data
}

export const api = {
  get: (path, options = {}) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options = {}) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options = {}) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options = {}) => request(path, { ...options, method: 'DELETE' }),
}
