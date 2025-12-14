import apiClient from '@/lib/axios'

export interface RegisterDto {
  email: string
  mobile: string
  password: string
  confirmPassword: string
}

export interface LoginDto {
  emailOrMobile: string
  password: string
}

export interface LoginResponse {
  userId: number
  email: string
  mobile: string
  role: string
  token: string
  refreshToken: string
  kycId?: number
  kycStatus?: string
}

export const authApi = {
  register: async (data: RegisterDto) => {
    const response = await apiClient.post('/auth/register', data)
    return response.data
  },

  login: async (data: LoginDto) => {
    const response = await apiClient.post('/auth/login', data)
    const { token, refreshToken, ...userData } = response.data.data
    
    // Store tokens
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('user', JSON.stringify(userData))
    
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (data: { email: string; token: string; newPassword: string; confirmPassword: string }) => {
    const response = await apiClient.post('/auth/reset-password', data)
    return response.data
  },

  changePassword: async (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    const response = await apiClient.post('/auth/change-password', data)
    return response.data
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },
}
