import apiClient from '@/lib/axios'

export interface QueryParameters {
  pageNumber?: number
  pageSize?: number
  searchTerm?: string
  sortBy?: string
  sortDescending?: boolean
}

export const adminApi = {
  getPendingKYCs: async (params: QueryParameters = {}) => {
    const response = await apiClient.get('/api/Admin/pending-kycs', { params })
    return response.data
  },

  getAllKYCs: async (params: QueryParameters & { status?: number } = {}) => {
    const response = await apiClient.get('/api/Admin/all-kycs', { params })
    return response.data
  },

  getKYCById: async (id: number) => {
    const response = await apiClient.get(`/api/KYC/${id}`)
    return response.data
  },

  approveKYC: async (id: number, data: { approverRemarks: string }) => {
    const response = await apiClient.post(`/api/Admin/approve/${id}`, data)
    return response.data
  },

  rejectKYC: async (id: number, data: { rejectionReason: string }) => {
    const response = await apiClient.post(`/api/Admin/reject/${id}`, data)
    return response.data
  },

  requestChanges: async (id: number, data: { remarks: string }) => {
    const response = await apiClient.post(`/api/Admin/request-changes/${id}`, data)
    return response.data
  },

  getStatistics: async () => {
    const response = await apiClient.get('/api/Admin/statistics')
    return response.data
  },
}

