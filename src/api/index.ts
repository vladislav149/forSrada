import axios from 'axios'

interface AxiosConfig {
  baseURL: string
  headers: {
    'Content-type': string
    Authorization?: string
  }
}

const defaultConfig: AxiosConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {'Content-type': 'application/json'}
}

const token = localStorage.getItem('token')
if (token) defaultConfig.headers.Authorization = `Bearer ${token}`

export const defaultApiInstance = axios.create(defaultConfig)

defaultApiInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

defaultApiInstance.interceptors.response.use(
  res => {
    const token = localStorage.getItem('token')
    if (token) {
      res.headers.Authorization = `Bearer ${token}`
    }
    return res
  },
  err => {
    return Promise.reject(err)
  }
)
