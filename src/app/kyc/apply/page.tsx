'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { kycApi } from '@/lib/api/kyc'
import Header from '@/components/Header'

// Import step components (to be created)
import Step1BasicInfo from '@/components/kyc/Step1BasicInfo'
import Step2Contact from '@/components/kyc/Step2Contact'
import Step3Family from '@/components/kyc/Step3Family'
import Step4Professional from '@/components/kyc/Step4Professional'
import Step5Nominee from '@/components/kyc/Step5Nominee'
import Step6Documents from '@/components/kyc/Step6Documents'
import Step7Review from '@/components/kyc/Step7Review'
import Step8FinancialDetails from '@/components/kyc/Step8FinancialDetails'

const steps = [
  { id: 1, name: 'Basic Information', component: Step1BasicInfo },
  { id: 2, name: 'Contact Details', component: Step2Contact },
  { id: 3, name: 'Family Details', component: Step3Family },
  { id: 4, name: 'Professional Info', component: Step4Professional },
  { id: 5, name: 'Nominee', component: Step5Nominee },
  { id: 6, name: 'Documents', component: Step6Documents },
  { id: 7, name: 'Financial Profile', component: Step8FinancialDetails },
  { id: 8, name: 'Review & Submit', component: Step7Review },
]

export default function KYCApplicationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({
    baseInfo: {},
    contact: {},
    familyDetails: [],
    personalProfile: {},
    financialProfile: {},
    nominee: {},
    individual: {},
    minor: {},
    organization: {},
    documents: [],
    signatureBase64: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    // Skip draft saving - just move to next step
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (stepData: any) => {
    setFormData((prev: any) => {
      const newData = {
        ...prev,
        ...stepData,
      }
      return newData
    })
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.baseInfo?.firstName || !formData.baseInfo?.lastName) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields in Basic Information',
        variant: 'destructive',
      })
      setCurrentStep(1)
      return
    }

    if (!formData.contact?.mobile || !formData.contact?.email) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields in Contact Details',
        variant: 'destructive',
      })
      setCurrentStep(2)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await kycApi.submitKYC(formData)
      
      if (response.success) {
        toast({
          title: 'Success',
          description: 'KYC application submitted successfully!',
        })
        router.push('/dashboard')
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to submit KYC',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      // Extract detailed error message
      let errorMessage = 'Failed to submit KYC application'
      
      if (error.response?.data?.errors) {
        // Validation errors from backend
        const errors = error.response.data.errors
        const errorList = Object.keys(errors).map(key => `${key}: ${errors[key].join(', ')}`).join('\n')
        errorMessage = errorList || errorMessage
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: 'Submission Failed',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep > step.id
                        ? 'bg-primary border-primary text-white'
                        : currentStep === step.id
                        ? 'border-primary text-primary'
                        : 'border-gray-300 text-gray-300'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`mt-2 text-xs text-center ${
                    currentStep >= step.id ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="pt-6">
            <CurrentStepComponent
              data={formData}
              updateData={updateFormData}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Auto-save indicator */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Your progress is automatically saved
        </p>
      </div>
    </div>
  )
}
