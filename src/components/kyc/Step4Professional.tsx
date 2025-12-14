'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { masterApi } from '@/lib/api/master'

export default function Step4Professional({ data, updateData }: any) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      ...data.personalProfile,
      ...data.individual,
      // Map individual fields back to form field names
      citizenshipNumber: data.individual?.citizenshipNo,
      citizenshipIssuedDate: data.individual?.issuedDate,
      citizenshipIssuedDistrict: data.individual?.issuedDistrict,
      panNumber: data.individual?.panNo,
      passportNumber: data.individual?.passportId,
    },
  })

  const [occupations, setOccupations] = useState([])
  const [positions, setPositions] = useState([])
  const formValues = watch()

  const isEmployed = watch('occupationType') === 'employed'

  useEffect(() => {
    loadOccupations()
    loadPositions()
  }, [])

  const loadOccupations = async () => {
    try {
      const data = await masterApi.getOccupations()
      setOccupations(data)
    } catch (error) {
      // Failed to load occupations
    }
  }

  const loadPositions = async () => {
    try {
      const data = await masterApi.getPositions()
      setPositions(data)
    } catch (error) {
      // Failed to load positions
    }
  }

  // Auto-save with debounce using useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formValues && Object.keys(formValues).length > 0) {
        // Split data: Personal Profile vs Individual-specific
        const personalProfileData = {
          occupationId: formValues.occupationId ? parseInt(formValues.occupationId) : null,
          positionId: formValues.positionId ? parseInt(formValues.positionId) : null,
          organization: formValues.organization,
          annualSalary: formValues.annualSalary ? parseFloat(formValues.annualSalary) : null,
          areaOfOperation: formValues.areaOfOperation,
          sourceOfInvest: formValues.sourceOfInvest || formValues.primaryIncomeSource,
          purposeOfAccount: formValues.purposeOfAccount,
          monthlyTurnoverDr: formValues.monthlyTurnoverDr,
          monthlyTurnoverCr: formValues.monthlyTurnoverCr,
          yearlyInOutCount: formValues.yearlyInOutCount ? parseInt(formValues.yearlyInOutCount) : null,
          yearlyOutGoCount: formValues.yearlyOutGoCount ? parseInt(formValues.yearlyOutGoCount) : null,
        }
        
        // Individual-specific data (Citizenship, PAN)
        const individualData = {
          citizenshipNo: formValues.citizenshipNumber,
          issuedDate: formValues.citizenshipIssuedDate || null,
          issuedDistrict: formValues.citizenshipIssuedDistrict,
          panNo: formValues.panNumber,
          passportId: formValues.passportNumber || null,
        }
        
        updateData({ 
          personalProfile: personalProfileData,
          individual: individualData
        })
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [formValues, updateData])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Professional Information</h2>
        <p className="text-muted-foreground">Provide your occupation and employment details</p>
      </div>

      <form className="space-y-6">
        {/* Education */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Education</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Highest Education Level</Label>
              <select
                {...register('educationLevel')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Level</option>
                <option value="None">None</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Higher Secondary">Higher Secondary</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <Label>Field of Study</Label>
              <Input {...register('fieldOfStudy')} />
            </div>
          </div>
        </div>

        {/* Occupation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Occupation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Occupation Type *</Label>
              <select
                {...register('occupationType', { required: true })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Type</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>

            <div>
              <Label>Occupation *</Label>
              <select
                {...register('occupationId', { required: true })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Occupation</option>
                {occupations.map((o: any) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Employment Details (if employed) */}
        {isEmployed && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Employment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Employer Name</Label>
                <Input {...register('employerName')} />
              </div>

              <div>
                <Label>Position</Label>
                <select
                  {...register('positionId')}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="">Select Position</option>
                  {positions.map((p: any) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Office Address</Label>
                <Input {...register('officeAddress')} />
              </div>

              <div>
                <Label>Office Phone</Label>
                <Input {...register('officePhone')} />
              </div>

              <div>
                <Label>Years of Employment</Label>
                <Input type="number" {...register('yearsOfEmployment')} min="0" />
              </div>

              <div>
                <Label>Annual Income (NPR)</Label>
                <Input type="number" {...register('annualIncome')} min="0" />
              </div>
            </div>
          </div>
        )}

        {/* Income Source */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Source of Income</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Primary Income Source</Label>
              <select
                {...register('primaryIncomeSource')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Source</option>
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Pension">Pension</option>
                <option value="Remittance">Remittance</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Label>Purpose of Account</Label>
              <select
                {...register('purposeOfAccount')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Purpose</option>
                <option value="Savings">Savings</option>
                <option value="Salary">Salary Credit</option>
                <option value="Business">Business Transactions</option>
                <option value="Investment">Investment</option>
                <option value="Remittance">Remittance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Identification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Identification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>PAN Number</Label>
              <Input {...register('panNumber')} placeholder="e.g., 123456789" />
            </div>

            <div>
              <Label>Citizenship Number *</Label>
              <Input {...register('citizenshipNumber', { required: true })} />
            </div>

            <div>
              <Label>Issued District</Label>
              <Input {...register('citizenshipIssuedDistrict')} />
            </div>

            <div>
              <Label>Issued Date</Label>
              <Input type="date" {...register('citizenshipIssuedDate')} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
