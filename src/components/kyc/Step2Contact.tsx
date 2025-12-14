'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { masterApi } from '@/lib/api/master'

export default function Step2Contact({ data, updateData }: any) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: data.contact || {},
  })

  const [provinces, setProvinces] = useState([])
  const formValues = watch()

  const sameAsPermanent = watch('sameAsPermanent')
  const selectedProvince = watch('porProvince')
  const selectedTempProvince = watch('tempProvince')

  useEffect(() => {
    loadProvinces()
  }, [])

  const loadProvinces = async () => {
    try {
      const data = await masterApi.getProvinces()
      setProvinces(data)
    } catch (error) {
      // Failed to load provinces
    }
  }

  // Auto-save whenever ANY field changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Remove district/municipality text fields (backend expects only IDs or null)
      const { porDistrict, porMunicipality, tempDistrict, tempMunicipality, ...restValues } = formValues
      
      const processedData = {
        ...restValues,
        porProvince: formValues.porProvince ? parseInt(formValues.porProvince) : null,
        porDistrict: null, // Backend expects int but we're using text input for district name
        porMunicipality: null, // Backend expects int but we're using text input for municipality name
        tempProvince: formValues.tempProvince ? parseInt(formValues.tempProvince) : null,
        tempDistrict: null, // Backend expects int but we're using text input
        tempMunicipality: null, // Backend expects int but we're using text input
        sameAsPermanent: formValues.sameAsPermanent || false,
      }
      updateData({ contact: processedData })
    }, 500)
    return () => clearTimeout(timeout)
  }, [JSON.stringify(formValues), updateData])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Details</h2>
        <p className="text-muted-foreground">Provide your address and contact information</p>
      </div>

      <form className="space-y-6">
        {/* Permanent Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Permanent Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Province *</Label>
              <select 
                {...register('porProvince', { required: true })} 
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Province</option>
                {provinces.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>District *</Label>
              <Input 
                {...register('porDistrict', { required: true })} 
                placeholder="Enter district name" 
              />
            </div>

            <div>
              <Label>Municipality *</Label>
              <Input 
                {...register('porMunicipality', { required: true })} 
                placeholder="Enter municipality name" 
              />
            </div>

            <div>
              <Label>Ward No *</Label>
              <Input 
                {...register('porWard', { required: true })} 
                placeholder="e.g., 1" 
              />
            </div>

            <div>
              <Label>Tole/Basti</Label>
              <Input 
                {...register('toleBastano')} 
              />
            </div>

            <div>
              <Label>City</Label>
              <Input {...register('porCity')} />
            </div>

            <div>
              <Label>Street</Label>
              <Input {...register('porStreet')} />
            </div>

            <div>
              <Label>House No</Label>
              <Input {...register('porHouseNo')} />
            </div>
          </div>
        </div>

        {/* Current Address */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register('sameAsPermanent')} id="sameAsPermanent" />
            <Label htmlFor="sameAsPermanent" className="cursor-pointer">
              Same as Permanent Address
            </Label>
          </div>

          {!sameAsPermanent && (
            <>
              <h3 className="text-lg font-semibold">Current Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Province</Label>
                  <select 
                    {...register('tempProvince')} 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Select Province</option>
                    {provinces.map((p: any) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>District</Label>
                  <Input 
                    {...register('tempDistrict')} 
                    placeholder="Enter district name" 
                  />
                </div>

                <div>
                  <Label>Municipality</Label>
                  <Input 
                    {...register('tempMunicipality')} 
                    placeholder="Enter municipality name" 
                  />
                </div>

                <div>
                  <Label>Ward No</Label>
                  <Input 
                    {...register('tempWard')} 
                  />
                </div>

                <div>
                  <Label>City</Label>
                  <Input {...register('tempCity')} />
                </div>

                <div>
                  <Label>Street</Label>
                  <Input {...register('tempStreet')} />
                </div>

                <div>
                  <Label>House No</Label>
                  <Input {...register('tempHouseNo')} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Mobile Number *</Label>
              <Input 
                {...register('mobile', { required: true })} 
                placeholder="98xxxxxxxx" 
              />
              {errors.mobile && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label>Alternate Mobile</Label>
              <Input {...register('alternateMobile')} placeholder="98xxxxxxxx" />
            </div>

            <div>
              <Label>Email *</Label>
              <Input 
                type="email" 
                {...register('email', { required: true })} 
                placeholder="your@email.com" 
              />
              {errors.email && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label>Alternate Email</Label>
              <Input type="email" {...register('alternateEmail')} placeholder="alternate@email.com" />
            </div>

            <div>
              <Label>Post Box No</Label>
              <Input {...register('postBoxNo')} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
