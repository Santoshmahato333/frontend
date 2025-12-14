'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Step1BasicInfo({ data, updateData }: any) {
  const { register, watch, formState: { errors } } = useForm({
    defaultValues: data.baseInfo || {},
  })

  const formValues = watch()

  // Auto-save whenever ANY field changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const processedData = {
        ...formValues,
        type: formValues.type ? parseInt(formValues.type) : null,
        gender: formValues.gender ? parseInt(formValues.gender) : null,
        maritalStatus: formValues.maritalStatus ? parseInt(formValues.maritalStatus) : null,
        familyType: formValues.familyType ? parseInt(formValues.familyType) : null,
        noOfDependents: formValues.noOfDependents ? parseInt(formValues.noOfDependents) : null,
      }
      updateData({ baseInfo: processedData })
    }, 500)
    return () => clearTimeout(timeout)
  }, [JSON.stringify(formValues), updateData])

  return (
    <div className="space-y-6 px-6">
      <div>
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <p className="text-muted-foreground">Please provide your personal details</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input 
              id="firstName" 
              {...register('firstName', { required: true })} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  document.getElementById('middleName')?.focus()
                }
              }}
            />
            {errors.firstName && <span className="text-sm text-red-500">Required</span>}
          </div>

          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input 
              id="middleName" 
              {...register('middleName')} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  document.getElementById('lastName')?.focus()
                }
              }}
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input 
              id="lastName" 
              {...register('lastName', { required: true })} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  document.getElementById('dateOfBirth')?.focus()
                }
              }}
            />
            {errors.lastName && <span className="text-sm text-red-500">Required</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input 
              type="date" 
              id="dateOfBirth" 
              {...register('dateOfBirth', { required: true })} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  document.getElementById('gender')?.focus()
                }
              }}
            />
            {errors.dateOfBirth && <span className="text-sm text-red-500">Required</span>}
          </div>

          <div>
            <Label htmlFor="gender">Gender *</Label>
            <select
              id="gender"
              {...register('gender', { required: true })}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
            {errors.gender && <span className="text-sm text-red-500">Required</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nationality">Nationality *</Label>
            <Input id="nationality" {...register('nationality')} defaultValue="Nepali" />
          </div>

          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <select
              id="maritalStatus"
              {...register('maritalStatus')}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="1">Single</option>
              <option value="2">Married</option>
              <option value="3">Divorced</option>
              <option value="4">Widowed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="familyType">Family Type</Label>
            <select
              id="familyType"
              {...register('familyType')}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="1">Nuclear</option>
              <option value="2">Joint</option>
              <option value="3">Extended</option>
              <option value="4">Single Parent</option>
            </select>
          </div>

          <div>
            <Label htmlFor="noOfDependents">Number of Dependents</Label>
            <Input type="number" id="noOfDependents" {...register('noOfDependents')} min="0" />
          </div>
        </div>

        <div>
          <Label htmlFor="type">Member Type *</Label>
          <select
            id="type"
            {...register('type', { required: true })}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="">Select Type</option>
            <option value="1">Individual</option>
            <option value="2">Minor</option>
            <option value="3">Institution</option>
          </select>
          {errors.type && <span className="text-sm text-red-500">Required</span>}
        </div>
      </form>
    </div>
  )
}
