'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { masterApi } from '@/lib/api/master'

export default function Step3Family({ data, updateData }: any) {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      familyDetails: data.familyDetails || [],
    },
  })

  const formValues = watch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'familyDetails',
  })

  const [relations, setRelations] = useState([])

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
      if (formValues?.familyDetails && formValues.familyDetails.length > 0) {
        const processedData = formValues.familyDetails.map((family: any) => ({
          ...family,
          relation: family.relation ? parseInt(family.relation) : null,
        }))
        updateData({ familyDetails: processedData })
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [formValues, updateData])

  const addFamilyMember = () => {
    append({
      firstName: '',
      middleName: '',
      lastName: '',
      relation: '',
      citizenshipNo: '',
      issuedFrom: '',
      issuedDistrict: '',
      contactNo: '',
      contactAddress: '',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Family Details</h2>
        <p className="text-muted-foreground">Add your family members' information</p>
      </div>

      <form className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Family Member {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input {...register(`familyDetails.${index}.firstName`, { required: true })} />
              </div>

              <div>
                <Label>Middle Name</Label>
                <Input {...register(`familyDetails.${index}.middleName`)} />
              </div>

              <div>
                <Label>Last Name *</Label>
                <Input {...register(`familyDetails.${index}.lastName`, { required: true })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Relationship *</Label>
                <select
                  {...register(`familyDetails.${index}.relation`, { required: true })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="">Select Relation</option>
                  {relations.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Citizenship Number</Label>
                <Input {...register(`familyDetails.${index}.citizenshipNo`)} />
              </div>

              <div>
                <Label>Issued From</Label>
                <Input {...register(`familyDetails.${index}.issuedFrom`)} />
              </div>

              <div>
                <Label>Issued District</Label>
                <Input {...register(`familyDetails.${index}.issuedDistrict`)} />
              </div>

              <div>
                <Label>Contact No</Label>
                <Input {...register(`familyDetails.${index}.contactNo`)} />
              </div>

              <div>
                <Label>Contact Address</Label>
                <Input {...register(`familyDetails.${index}.contactAddress`)} />
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addFamilyMember} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Family Member
        </Button>

        {fields.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No family members added yet. Click the button above to add.
          </div>
        )}
      </form>
    </div>
  )
}
