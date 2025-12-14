import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If token expired, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const token = localStorage.getItem('token')

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          token,
          refreshToken,
        })

        const { token: newToken, refreshToken: newRefreshToken } = response.data.data

        localStorage.setItem('token', newToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
