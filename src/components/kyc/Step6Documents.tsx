'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import { masterApi } from '@/lib/api/master'
import { useToast } from '@/hooks/use-toast'

export default function Step6Documents({ data, updateData }: any) {
  const { register, handleSubmit } = useForm()
  const { toast } = useToast()
  const [documents, setDocuments] = useState<any[]>(data.documents || [])
  const [documentTypes, setDocumentTypes] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadDocumentTypes()
  }, [])

  useEffect(() => {
    // Transform documents to match backend DTO format
    const transformedDocs = documents.map(doc => ({
      documentType: parseInt(doc.documentTypeId),
      documentNo: doc.documentNo || null,
      issuedDate: doc.issuedDate || null,
      issuedPlace: doc.issuedPlace || null,
      expiryDate: doc.expiryDate || null,
      issuedAuthority: doc.issuedAuthority || null,
      base64Data: doc.fileContent?.split(',')[1] || doc.fileContent, // Remove data:image/jpeg;base64, prefix
      fileName: doc.fileName,
    }))
    updateData({ documents: transformedDocs })
  }, [documents])

  const loadDocumentTypes = async () => {
    try {
      const data = await masterApi.getDocumentTypes()
      setDocumentTypes(data)
    } catch (error) {
      // Failed to load document types
    }
  }

  const handleFileUpload = async (event: any, docType: string, docTypeId: number) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Error',
        description: 'Only JPG, PNG, and PDF files are allowed',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)

    try {
      // Convert to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        const newDoc = {
          documentTypeId: docTypeId,
          documentType: docType,
          fileName: file.name,
          fileContent: base64,
          fileSize: file.size,
          uploadedDate: new Date().toISOString(),
        }

        // Check if document type already exists
        const existingIndex = documents.findIndex(d => d.documentTypeId === docTypeId)
        if (existingIndex >= 0) {
          // Replace existing
          const updated = [...documents]
          updated[existingIndex] = newDoc
          setDocuments(updated)
        } else {
          // Add new
          setDocuments([...documents, newDoc])
        }

        toast({
          title: 'Success',
          description: `${docType} uploaded successfully`,
        })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const removeDocument = (docTypeId: number) => {
    setDocuments(documents.filter(d => d.documentTypeId !== docTypeId))
    toast({
      title: 'Removed',
      description: 'Document removed successfully',
    })
  }

  const getDocumentIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />
    }
    return <ImageIcon className="h-8 w-8 text-blue-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Document Upload</h2>
        <p className="text-muted-foreground">
          Upload required documents (JPG, PNG, PDF - Max 5MB each)
        </p>
      </div>

      <div className="space-y-6">
        {/* Required Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Required Documents *</h3>

          {/* Citizenship */}
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Citizenship Certificate</h4>
                <p className="text-sm text-muted-foreground">Front and back side</p>
                
                {documents.find(d => d.documentType === 'Citizenship') ? (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    {getDocumentIcon(documents.find(d => d.documentType === 'Citizenship')?.fileName)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {documents.find(d => d.documentType === 'Citizenship')?.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(documents.find(d => d.documentType === 'Citizenship')?.fileSize)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDocument(1)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Label htmlFor="citizenship" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                        <Upload className="h-5 w-5" />
                        <span>Click to upload</span>
                      </div>
                    </Label>
                    <Input
                      id="citizenship"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'Citizenship', 1)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Photo */}
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Passport Size Photo</h4>
                <p className="text-sm text-muted-foreground">Recent photograph</p>
                
                {documents.find(d => d.documentType === 'Photo') ? (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    {getDocumentIcon(documents.find(d => d.documentType === 'Photo')?.fileName)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {documents.find(d => d.documentType === 'Photo')?.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(documents.find(d => d.documentType === 'Photo')?.fileSize)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDocument(2)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Label htmlFor="photo" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                        <Upload className="h-5 w-5" />
                        <span>Click to upload</span>
                      </div>
                    </Label>
                    <Input
                      id="photo"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'Photo', 2)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Signature */}
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium">Signature</h4>
                <p className="text-sm text-muted-foreground">Your signature on white paper</p>
                
                {documents.find(d => d.documentType === 'Signature') ? (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    {getDocumentIcon(documents.find(d => d.documentType === 'Signature')?.fileName)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {documents.find(d => d.documentType === 'Signature')?.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(documents.find(d => d.documentType === 'Signature')?.fileSize)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDocument(3)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Label htmlFor="signature" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                        <Upload className="h-5 w-5" />
                        <span>Click to upload</span>
                      </div>
                    </Label>
                    <Input
                      id="signature"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'Signature', 3)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Optional Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Optional Documents</h3>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium">PAN Card</h4>
                <p className="text-sm text-muted-foreground">Permanent Account Number</p>
                
                {documents.find(d => d.documentType === 'PAN') ? (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    {getDocumentIcon(documents.find(d => d.documentType === 'PAN')?.fileName)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {documents.find(d => d.documentType === 'PAN')?.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(documents.find(d => d.documentType === 'PAN')?.fileSize)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDocument(4)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Label htmlFor="pan" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50">
                        <Upload className="h-5 w-5" />
                        <span>Click to upload (Optional)</span>
                      </div>
                    </Label>
                    <Input
                      id="pan"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'PAN', 4)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {uploading && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        )}

        {documents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No documents uploaded yet
          </div>
        )}
      </div>
    </div>
  )
}
