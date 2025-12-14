'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { masterApi } from '@/lib/api/master'

export default function Step8FinancialDetails({ data, updateData }: any) {
  const { register, watch, formState: { errors } } = useForm({
    defaultValues: data.financialProfile || {},
  })

  const [occupations, setOccupations] = useState([])
  const [positions, setPositions] = useState([])
  const formValues = watch()

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

  // Auto-save with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formValues && Object.keys(formValues).length > 0) {
        const processedData = {
          ...formValues,
          occupationId: formValues.occupationId ? parseInt(formValues.occupationId) : null,
          positionId: formValues.positionId ? parseInt(formValues.positionId) : null,
          annualSalary: formValues.annualSalary ? parseFloat(formValues.annualSalary) : null,
          yearlyTurnoverDr: formValues.yearlyTurnoverDr ? parseInt(formValues.yearlyTurnoverDr) : null,
          yearlyTurnoverCr: formValues.yearlyTurnoverCr ? parseInt(formValues.yearlyTurnoverCr) : null,
          monthlyDrTranCount: formValues.monthlyDrTranCount ? parseInt(formValues.monthlyDrTranCount) : null,
          monthlyCrTranCount: formValues.monthlyCrTranCount ? parseInt(formValues.monthlyCrTranCount) : null,
          yearlyDrTranCount: formValues.yearlyDrTranCount ? parseInt(formValues.yearlyDrTranCount) : null,
          yearlyCrTranCount: formValues.yearlyCrTranCount ? parseInt(formValues.yearlyCrTranCount) : null,
        }
        updateData({ financialProfile: processedData })
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [JSON.stringify(formValues), updateData])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Profile</h2>
        <p className="text-muted-foreground">Provide detailed financial and transaction information</p>
      </div>

      <form className="space-y-6">
        {/* Occupation Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Occupation Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Occupation *</Label>
              <select
                {...register('occupationId', { required: true })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Occupation</option>
                {occupations.map((occ: any) => (
                  <option key={occ.id} value={occ.id}>{occ.name}</option>
                ))}
              </select>
              {errors.occupationId && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label>Position</Label>
              <select
                {...register('positionId')}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Position</option>
                {positions.map((pos: any) => (
                  <option key={pos.id} value={pos.id}>{pos.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Organization *</Label>
              <Input {...register('organization', { required: true })} placeholder="Company/Organization name" />
              {errors.organization && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label>Annual Salary *</Label>
              <Input 
                type="number" 
                step="0.01"
                {...register('annualSalary', { required: true })} 
                placeholder="e.g., 500000" 
              />
              {errors.annualSalary && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div className="md:col-span-2">
              <Label>Address of Organization</Label>
              <Input {...register('addressOfOrganization')} placeholder="Complete address" />
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Source of Funds & Purpose</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Source of Fund *</Label>
              <select
                {...register('sourceOfFund', { required: true })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Source</option>
                <option value="Salary">Salary</option>
                <option value="Business">Business Income</option>
                <option value="Investment">Investment Returns</option>
                <option value="Pension">Pension</option>
                <option value="Remittance">Remittance</option>
                <option value="Inheritance">Inheritance</option>
                <option value="Other">Other</option>
              </select>
              {errors.sourceOfFund && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label>Purpose of Account *</Label>
              <select
                {...register('purposeOfAccount', { required: true })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="">Select Purpose</option>
                <option value="Savings">Personal Savings</option>
                <option value="Salary">Salary Credit</option>
                <option value="Business">Business Transactions</option>
                <option value="Investment">Investment</option>
                <option value="Remittance">Remittance</option>
                <option value="Other">Other</option>
              </select>
              {errors.purposeOfAccount && <span className="text-sm text-red-500">Required</span>}
            </div>
          </div>
        </div>

        {/* Monthly Turnover */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Monthly Turnover</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Monthly Turnover (Dr) *</Label>
              <Input {...register('monthlyTurnoverDr', { required: true })} placeholder="e.g., 50000-100000" />
              {errors.monthlyTurnoverDr && <span className="text-sm text-red-500">Required</span>}
            </div>

            <div>
              <Label>Monthly Turnover (Cr) *</Label>
              <Input {...register('monthlyTurnoverCr', { required: true })} placeholder="e.g., 50000-100000" />
              {errors.monthlyTurnoverCr && <span className="text-sm text-red-500">Required</span>}
            </div>
          </div>
        </div>

        {/* Yearly Turnover */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Yearly Turnover</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Yearly Turnover (Dr)</Label>
              <Input type="number" {...register('yearlyTurnoverDr')} placeholder="e.g., 600000" />
            </div>

            <div>
              <Label>Yearly Turnover (Cr)</Label>
              <Input type="number" {...register('yearlyTurnoverCr')} placeholder="e.g., 600000" />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Another Earning Member</Label>
              <Input {...register('anotherEarningMember')} placeholder="Name of other earning member" />
            </div>

            <div>
              <Label>Saving Transaction</Label>
              <Input {...register('savingTransaction')} placeholder="Type of saving transactions" />
            </div>

            <div>
              <Label>Share Transaction</Label>
              <Input {...register('shareTransaction')} placeholder="Type of share transactions" />
            </div>

            <div>
              <Label>Other Transaction</Label>
              <Input {...register('otherTransaction')} placeholder="Other transaction types" />
            </div>
          </div>
        </div>

        {/* Transaction Counts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Transaction Counts</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Monthly Dr Transaction Count</Label>
              <Input type="number" {...register('monthlyDrTranCount')} placeholder="e.g., 10" />
            </div>

            <div>
              <Label>Monthly Cr Transaction Count</Label>
              <Input type="number" {...register('monthlyCrTranCount')} placeholder="e.g., 5" />
            </div>

            <div>
              <Label>Yearly Dr Transaction Count</Label>
              <Input type="number" {...register('yearlyDrTranCount')} placeholder="e.g., 120" />
            </div>

            <div>
              <Label>Yearly Cr Transaction Count</Label>
              <Input type="number" {...register('yearlyCrTranCount')} placeholder="e.g., 60" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
