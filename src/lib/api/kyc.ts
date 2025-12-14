import apiClient from '@/lib/axios'

export interface KYCSubmitDto {
  baseInfo: {
    type: number
    firstName: string
    middleName?: string
    lastName: string
    gender: number
    nationality: string
    dateOfBirth: string
    maritalStatus?: number
    familyType?: number
    noOfDependents?: number
  }
  contact: {
    porProvince?: number
    porDistrict?: number
    porMunicipality?: number
    porWard?: string
    porCity?: string
    porStreet?: string
    porHouseNo?: string
    toleBastano?: string
    sameAsPermanent: boolean
    tempProvince?: number
    tempDistrict?: number
    tempMunicipality?: number
    tempWard?: string
    tempCity?: string
    tempStreet?: string
    tempHouseNo?: string
    mobile: string
    alternateMobile?: string
    email: string
    alternateEmail?: string
    postBoxNo?: string
  }
  familyDetails: Array<{
    relation: number
    firstName: string
    middleName?: string
    lastName: string
    citizenshipNo?: string
    issuedFrom?: string
    issuedDistrict?: string
    contactNo?: string
    contactAddress?: string
  }>
  personalProfile?: {
    occupationId?: number
    positionId?: number
    organization?: string
    annualSalary?: number
    areaOfOperation?: string
    sourceOfInvest?: string
    purposeOfAccount?: string
    monthlyTurnoverDr?: string
    monthlyTurnoverCr?: string
    yearlyInOutCount?: number
    yearlyOutGoCount?: number
  }
  nominee?: {
    firstName: string
    middleName?: string
    lastName: string
    relation: number
    contactNo?: string
    address?: string
    citizenshipNo?: string
    dateOfBirth?: string
  }
  individual?: {
    citizenshipNo: string
    issuedDate?: string
    issuedDistrict?: string
    panNo?: string
    passportId?: string
  }
  minor?: {
    birthCertificateNo?: string
    birthCertificateIssuedDate?: string
    birthCertificateIssuedPlace?: string
    birthCertificateIssuedBy?: string
    guardianName?: string
    guardianRelation?: string
    guardianContact?: string
  }
  organization?: {
    name: string
    registrationNo?: string
    pan_No?: string
    registrationDate?: string
    registrationPlace?: string
    typeOfOrganization?: string
    address?: string
    contactNo?: string
    email?: string
  }
  documents: Array<{
    documentType: number
    documentNo?: string
    issuedDate?: string
    issuedPlace?: string
    expiryDate?: string
    issuedAuthority?: string
    base64Data: string
    fileName: string
  }>
  signatureBase64?: string
}

export const kycApi = {
  submitKYC: async (data: any) => {
    // Helper function to convert camelCase to PascalCase
    const toPascalCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
    
    // Convert object keys recursively
    const convertKeys = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(item => convertKeys(item))
      } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc: any, key: string) => {
          const pascalKey = toPascalCase(key)
          acc[pascalKey] = convertKeys(obj[key])
          return acc
        }, {})
      }
      return obj
    }
    
    // Convert the entire payload
    const payload = {
      BaseInfo: convertKeys(data.baseInfo || {}),
      Contact: convertKeys(data.contact || {}),
      FamilyDetails: (data.familyDetails || []).map((item: any) => convertKeys(item)),
      PersonalProfile: convertKeys(data.personalProfile || data.professionalProfile || null),
      FinancialProfile: convertKeys(data.financialProfile || null),
      Nominee: convertKeys(data.nominee || null),
      Individual: convertKeys(data.individual || null),
      Minor: convertKeys(data.minor || null),
      Organization: convertKeys(data.organization || null),
      Documents: (data.documents || []).map((item: any) => convertKeys(item)),
      SignatureBase64: data.signatureBase64 || null,
    }
    
    const response = await apiClient.post('/kyc/submit', payload)
    return response.data
  },

  getMyKYC: async () => {
    const response = await apiClient.get('/kyc/my-kyc')
    return response.data
  },

  getKYCById: async (id: number) => {
    const response = await apiClient.get(`/kyc/${id}`)
    return response.data
  },

  updateKYC: async (id: number, data: KYCSubmitDto) => {
    const response = await apiClient.put(`/kyc/${id}`, data)
    return response.data
  },

  saveDraft: async (data: { draftData: string; step: number }) => {
    const response = await apiClient.post('/kyc/draft', data)
    return response.data
  },

  getDraft: async () => {
    const response = await apiClient.get('/kyc/draft')
    return response.data
  },
}
