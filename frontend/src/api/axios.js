import axios from 'axios'

// базовый инстанс — все запросы идут через него
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// interceptor — добавляет токен к каждому запросу, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api