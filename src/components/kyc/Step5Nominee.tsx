'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { masterApi } from '@/lib/api/master'

export default function Step5Nominee({ data, updateData }: any) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: data.nominee || {},
  })

  const [relations, setRelations] = useState([])
  const formValues = watch()

  useEffect(() => {
    loadRelations()
  }, [])

  const loadRelations = async () => {
    try {
      const data = await masterApi.getRelations()
      setRelations(data)
    } catch (error) {
      // Failed to load relations
    }
  }

  // Auto-save with debounce using useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formValues && Object.keys(formValues).length > 0) {
        const processedData = {
          firstName: formValues.nomineeFirstName,
          middleName: formValues.nomineeMiddleName,
          lastName: formValues.nomineeLastName,
          relation: formValues.relationId ? parseInt(formValues.relationId) : null,
          contactNo: formValues.contactNo,
          address: formValues.address,
          citizenshipNo: formValues.citizenshipNo,
          dateOfBirth: formValues.dateOfBirth,
          sharePercentage: formValues.sharePercentage,
        }
        console.log('Step5 - Auto-saving nominee:', processedData)
        updateData({ nominee: processedData })
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [formValues, updateData])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Nominee Information</h2>
        <p className="text-muted-foreground">
          Provide details of your nominee (person who will receive benefits in case of your demise)
        </p>
      </div>

      <form className="space-y-6">
        {/* Nominee Personal Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nomineeFirstName">First Name *</Label>
              <Input id="nomineeFirstName" {...register('nomineeFirstName', { required: true })} />
              {errors.nomineeFirstName && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label htmlFor="nomineeMiddleName">Middle Name</Label>
              <Input id="nomineeMiddleName" {...register('nomineeMiddleName')} />
            </div>

            <div>
              <Label htmlFor="nomineeLastName">Last Name *</Label>
              <Input id="nomineeLastName" {...register('nomineeLastName', { required: true })} />
              {errors.nomineeLastName && <span className="text-sm text-red-500">Required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="relationId">Relationship with Nominee *</Label>
              <select
                id="relationId"
                {...register('relationId', { required: true })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Relation</option>
                {relations.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              {errors.relationId && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input type="date" id="dateOfBirth" {...register('dateOfBirth', { required: true })} />
              {errors.dateOfBirth && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                {...register('gender')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="citizenshipNo">Citizenship Number</Label>
              <Input id="citizenshipNo" {...register('citizenshipNo')} />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mobileNo">Mobile Number *</Label>
              <Input id="mobileNo" {...register('mobileNo', { required: true })} placeholder="98XXXXXXXX" />
              {errors.mobileNo && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="province">Province</Label>
              <Input id="province" {...register('province')} />
            </div>

            <div>
              <Label htmlFor="district">District</Label>
              <Input id="district" {...register('district')} />
            </div>

            <div>
              <Label htmlFor="municipality">Municipality</Label>
              <Input id="municipality" {...register('municipality')} />
            </div>

            <div>
              <Label htmlFor="wardNo">Ward No</Label>
              <Input id="wardNo" {...register('wardNo')} />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Input id="fullAddress" {...register('fullAddress')} />
            </div>
          </div>
        </div>

        {/* Guardian (if nominee is minor) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Guardian Details (if nominee is minor)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input id="guardianName" {...register('guardianName')} />
            </div>

            <div>
              <Label htmlFor="guardianRelation">Relation with Guardian</Label>
              <select
                id="guardianRelation"
                {...register('guardianRelation')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Relation</option>
                {relations.map((r: any) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="guardianMobile">Guardian Mobile</Label>
              <Input id="guardianMobile" {...register('guardianMobile')} />
            </div>

            <div>
              <Label htmlFor="guardianCitizenship">Guardian Citizenship No</Label>
              <Input id="guardianCitizenship" {...register('guardianCitizenship')} />
            </div>
          </div>
        </div>

        {/* Share Percentage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sharePercentage">Share Percentage *</Label>
            <Input
              type="number"
              id="sharePercentage"
              {...register('sharePercentage', { required: true, min: 1, max: 100 })}
              min="1"
              max="100"
              defaultValue="100"
            />
            {errors.sharePercentage && <span className="text-sm text-red-500">Required (1-100)</span>}
            <p className="text-xs text-muted-foreground mt-1">Percentage of benefits nominee will receive</p>
          </div>
        </div>
      </form>
    </div>
  )
}
