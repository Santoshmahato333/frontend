'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle, FileText, Users, Briefcase, UserCheck } from 'lucide-react'

export default function Step7Review({ data }: any) {
  const getGenderLabel = (value: string) => {
    const map: any = { '1': 'Male', '2': 'Female', '3': 'Other' }
    return map[value] || value
  }

  const getMaritalStatusLabel = (value: string) => {
    const map: any = { '1': 'Single', '2': 'Married', '3': 'Divorced', '4': 'Widowed' }
    return map[value] || value
  }

  const getMemberTypeLabel = (value: string) => {
    const map: any = { '1': 'Individual', '2': 'Minor', '3': 'Institution' }
    return map[value] || value
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review all your information before submitting
        </p>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Basic Information</h3>
        </div>
        {data.baseInfo && Object.keys(data.baseInfo).length > 0 ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">
                {data.baseInfo.firstName || ''} {data.baseInfo.middleName || ''} {data.baseInfo.lastName || ''}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{data.baseInfo.dateOfBirth || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Gender</p>
              <p className="font-medium">{data.baseInfo.gender ? getGenderLabel(data.baseInfo.gender) : 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Marital Status</p>
              <p className="font-medium">{data.baseInfo.maritalStatus ? getMaritalStatusLabel(data.baseInfo.maritalStatus) : 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Nationality</p>
              <p className="font-medium">{data.baseInfo.nationality || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Member Type</p>
              <p className="font-medium">{data.baseInfo.type ? getMemberTypeLabel(data.baseInfo.type) : 'N/A'}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No basic information provided yet. Please go back to Step 1.</p>
        )}
      </Card>

      {/* Contact Details */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Contact Details</h3>
        </div>
        {data.contact && Object.keys(data.contact).length > 0 ? (
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Contact</p>
              <p className="font-medium">Mobile: {data.contact.mobile || 'N/A'}</p>
              <p className="font-medium">Email: {data.contact.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Permanent Address</p>
              <p className="font-medium">
                Province {data.contact.porProvince || 'N/A'}, District {data.contact.porDistrict || 'N/A'}, 
                Ward {data.contact.porWard || 'N/A'}
              </p>
            </div>
            {!data.contact.sameAsPermanent && data.contact.tempProvince && (
              <div>
                <p className="text-muted-foreground mb-1">Current Address</p>
                <p className="font-medium">
                  Province {data.contact.tempProvince}, District {data.contact.tempDistrict}, 
                  Ward {data.contact.tempWard}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No contact details provided yet. Please go back to Step 2.</p>
        )}
      </Card>

      {/* Family Details */}
      {data.familyDetails && Array.isArray(data.familyDetails) && data.familyDetails.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Family Members ({data.familyDetails.length})</h3>
          </div>
          <div className="space-y-3">
            {data.familyDetails.map((member: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                <p className="font-medium">
                  {member.firstName} {member.middleName} {member.lastName}
                </p>
                <p className="text-muted-foreground">
                  Citizenship: {member.citizenshipNo || 'N/A'} • Contact: {member.contactNo || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Professional Info */}
      {data.personalProfile?.occupationType && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Professional Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Occupation Type</p>
              <p className="font-medium capitalize">{data.personalProfile?.occupationType}</p>
            </div>
            {data.personalProfile?.employerName && (
              <div>
                <p className="text-muted-foreground">Employer</p>
                <p className="font-medium">{data.personalProfile?.employerName}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Citizenship Number</p>
              <p className="font-medium">{data.personalProfile?.citizenshipNumber}</p>
            </div>
            {data.personalProfile?.panNumber && (
              <div>
                <p className="text-muted-foreground">PAN Number</p>
                <p className="font-medium">{data.personalProfile?.panNumber}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Nominee */}
      {data.nominee?.firstName && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Nominee Information</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">
                {data.nominee?.firstName} {data.nominee?.middleName} {data.nominee?.lastName}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Mobile</p>
              <p className="font-medium">{data.nominee?.mobile || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Relation</p>
              <p className="font-medium">{data.nominee?.relation || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Share Percentage</p>
              <p className="font-medium">{data.nominee?.sharePercentage || 0}%</p>
            </div>
          </div>
        </Card>
      )}

      {/* Documents */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Documents ({data.documents?.length || 0})</h3>
        </div>
        {data.documents?.length > 0 ? (
          <div className="space-y-2">
            {data.documents.map((doc: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Document {index + 1}</p>
                  <p className="text-xs text-muted-foreground">{doc.fileName || 'Uploaded file'}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No documents uploaded</p>
        )}
      </Card>

      {/* Declaration */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold mb-2">Declaration</h3>
        <p className="text-sm text-muted-foreground">
          I hereby declare that the information provided above is true and correct to the best of my knowledge. 
          I understand that any false information may result in rejection of my application or termination of services.
        </p>
      </Card>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm font-medium text-yellow-800">
          ⚠️ Please review all information carefully before submitting. You will not be able to edit after submission.
        </p>
      </div>
    </div>
  )
}
