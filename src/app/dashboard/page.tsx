'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { authApi } from '@/lib/api/auth'
import { kycApi } from '@/lib/api/kyc'
import { FileText, User, LogOut, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import Header from '@/components/Header'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [kycStatus, setKycStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = authApi.getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    loadKYCStatus()
  }, [router])

  const loadKYCStatus = async () => {
    try {
      const response = await kycApi.getMyKYC()
      if (response.success) {
        setKycStatus(response.data)
      }
    } catch (error) {
      // KYC not found
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authApi.logout()
    router.push('/auth/login')
  }

  const getStatusIcon = (status: number) => {
    switch (status) {
      case 0: // Draft
        return <AlertCircle className="h-6 w-6 text-gray-500" />
      case 1: // Pending
        return <Clock className="h-6 w-6 text-yellow-500" />
      case 2: // Under Review
        return <Clock className="h-6 w-6 text-blue-500" />
      case 3: // Approved
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 4: // Rejected
        return <XCircle className="h-6 w-6 text-red-500" />
      case 5: // Changes Requested
        return <AlertCircle className="h-6 w-6 text-orange-500" />
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusText = (status: number) => {
    const statuses = ['Draft', 'Pending', 'Under Review', 'Approved', 'Rejected', 'Changes Requested']
    return statuses[status] || 'Unknown'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className='top'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
              </div> 
              <p className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">156</p>
              <p className="text-sm text-slate-600">Total Customers</p>
              <button 
                onClick={() => router.push('/Customerlist')}
                className="mt-3 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                View Customer List
              </button>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>

              <p className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">12</p>
              <p className="text-sm text-slate-600">Pending Reviews</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-50 text-green-600 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">128</p>
              <p className="text-sm text-slate-600">Verified Customers</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">8</p>
              <p className="text-sm text-slate-600">High-Risk Customers</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* KYC Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Alerts Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">TODAY</p>
                  <p className="font-medium">20</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">THIS WEEK</p>
                  <p className="font-medium">130</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">YEAR TO DATE</p>
                  <p className="font-medium">2,560</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* approval status*/}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Unusual Transaction Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">TODAY</p>
                  <p className="font-medium">200</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">THIS WEEK</p>
                  <p className="font-medium">1,530</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">YEAR TO DATE</p>
                  <p className="font-medium">2,34,560</p>
                </div>
              </div>
            </CardContent>
            {/* <CardContent>
              {kycStatus ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(kycStatus.approvalStatus)}
                    <div>
                      <p className="font-semibold">{getStatusText(kycStatus.approvalStatus)}</p>
                      {kycStatus.kyc_No && (
                        <p className="text-sm text-muted-foreground">KYC No: {kycStatus.kyc_No}</p>
                      )}
                    </div>
                  </div>
                  {kycStatus.remarks && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">{kycStatus.remarks}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No KYC submitted yet</p>
                </div>
              )}
            </CardContent> */}
          </Card>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Alert Pending</p>
                  <p className="font-medium">201</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Usual Transaction Pending</p>
                  <p className="font-medium">150</p>
                </div>
                {/* <div>
                  <p className="text-sm text-muted-foreground"></p>
                  <p className="font-medium">{user?.role}</p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>





        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your KYC application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!kycStatus && (
                <Button
                  onClick={() => router.push('/kyc/apply')}
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Start KYC Application
                </Button>
              )}

              {kycStatus && kycStatus.approvalStatus !== 3 && (
                <Button
                  onClick={() => router.push('/kyc/apply')}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View/Update Application
                </Button>
              )}

              {kycStatus && kycStatus.approvalStatus === 3 && (
                <Button
                  onClick={() => router.push(`/kyc/view/${kycStatus.id}`)}
                  variant="outline"
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View KYC Details
                </Button>
              )}
              <button className='px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors'
               onClick={() => router.push('/transactionList')}>Transaction view</button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
