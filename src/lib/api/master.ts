import apiClient from '@/lib/axios'

export const masterApi = {
  getProvinces: async () => {
    const response = await apiClient.get('/master/provinces')
    return response.data.data
  },

  getDistricts: async (provinceId: number) => {
    const response = await apiClient.get(`/master/districts/${provinceId}`)
    return response.data.data
  },

  getMunicipalities: async (districtId: number) => {
    const response = await apiClient.get(`/master/municipalities/${districtId}`)
    return response.data.data
  },

  getOccupations: async () => {
    const response = await apiClient.get('/master/occupations')
    return response.data.data
  },

  getPositions: async () => {
    const response = await apiClient.get('/master/positions')
    return response.data.data
  },

  getRelations: async () => {
    const response = await apiClient.get('/master/relations')
    return response.data.data
  },

  getBranches: async () => {
    const response = await apiClient.get('/master/branches')
    return response.data.data
  },

  getDocumentTypes: async () => {
    const response = await apiClient.get('/master/document-types')
    return response.data.data
  },
}
