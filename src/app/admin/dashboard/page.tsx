'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminApi } from '@/lib/api/admin'
import { useToast } from '@/hooks/use-toast'
import Header from '@/components/Header'
import { 
  Search, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Filter,
  Download 
} from 'lucide-react'

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [kycApplications, setKycApplications] = useState([])
  const [statistics, setStatistics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedKYC, setSelectedKYC] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    page: 1,
    pageSize: 10,
  })

  useEffect(() => {
    loadStatistics()
    loadKYCApplications()
  }, [filters])

  const loadStatistics = async () => {
    try {
      const data = await adminApi.getStatistics()
      setStatistics(data)
    } catch (error) {
      // Failed to load statistics
    }
  }

  const loadKYCApplications = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getPendingKYCs(filters)
      setKycApplications(data.items || data)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load KYC applications',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const viewKYCDetails = async (kycId: number) => {
    try {
      const data = await adminApi.getKYCById(kycId)
      setSelectedKYC(data)
      setShowModal(true)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load KYC details',
        variant: 'destructive',
      })
    }
  }

  const handleApprove = async (kycId: number) => {
    if (!confirm('Are you sure you want to approve this KYC application?')) return

    try {
      await adminApi.approveKYC(kycId, { approverRemarks: 'Approved' })
      toast({
        title: 'Success',
        description: 'KYC application approved successfully',
      })
      loadKYCApplications()
      loadStatistics()
      setShowModal(false)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to approve KYC',
        variant: 'destructive',
      })
    }
  }

  const handleReject = async (kycId: number) => {
    const reason = prompt('Please enter rejection reason:')
    if (!reason) return

    try {
      await adminApi.rejectKYC(kycId, { rejectionReason: reason })
      toast({
        title: 'Success',
        description: 'KYC application rejected',
      })
      loadKYCApplications()
      loadStatistics()
      setShowModal(false)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to reject KYC',
        variant: 'destructive',
      })
    }
  }

  const handleRequestChanges = async (kycId: number) => {
    const remarks = prompt('Please enter what changes are required:')
    if (!remarks) return

    try {
      await adminApi.requestChanges(kycId, { remarks })
      toast({
        title: 'Success',
        description: 'Change request sent to user',
      })
      loadKYCApplications()
      loadStatistics()
      setShowModal(false)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to request changes',
        variant: 'destructive',
      })
    }
  }

  const getStatusBadge = (status: number) => {
    const badges: any = {
      1: { label: 'Draft', class: 'bg-gray-200 text-gray-800' },
      2: { label: 'Pending', class: 'bg-yellow-200 text-yellow-800' },
      3: { label: 'Under Review', class: 'bg-blue-200 text-blue-800' },
      4: { label: 'Approved', class: 'bg-green-200 text-green-800' },
      5: { label: 'Rejected', class: 'bg-red-200 text-red-800' },
      6: { label: 'Changes Requested', class: 'bg-orange-200 text-orange-800' },
    }
    const badge = badges[status] || { label: 'Unknown', class: 'bg-gray-200' }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.class}`}>
        {badge.label}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage KYC applications and user accounts</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.totalApplications || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.pendingApplications || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.approvedApplications || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.rejectedApplications || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, mobile, email..."
                    className="pl-10"
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <Label>Status</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="2">Pending</option>
                  <option value="3">Under Review</option>
                  <option value="4">Approved</option>
                  <option value="5">Rejected</option>
                  <option value="6">Changes Requested</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={loadKYCApplications}>
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>KYC Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : kycApplications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No applications found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">ID</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Mobile</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Submitted</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kycApplications.map((kyc: any) => (
                      <tr key={kyc.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">#{kyc.id}</td>
                        <td className="p-4 font-medium">
                          {kyc.firstName} {kyc.lastName}
                        </td>
                        <td className="p-4">{kyc.mobile}</td>
                        <td className="p-4 capitalize">{kyc.type || 'Individual'}</td>
                        <td className="p-4">{getStatusBadge(kyc.approvalStatus)}</td>
                        <td className="p-4">
                          {kyc.createdAt ? new Date(kyc.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewKYCDetails(kyc.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* KYC Details Modal */}
        {showModal && selectedKYC && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b sticky top-0 bg-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">KYC Application Details</h2>
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">
                        {selectedKYC.firstName} {selectedKYC.middleName} {selectedKYC.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      {getStatusBadge(selectedKYC.approvalStatus)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile</p>
                      <p className="font-medium">{selectedKYC.mobile}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedKYC.email}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedKYC.approvalStatus === 2 && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={() => handleApprove(selectedKYC.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedKYC.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRequestChanges(selectedKYC.id)}
                    >
                      Request Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
