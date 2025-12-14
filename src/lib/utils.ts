import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateAge(dateOfBirth: Date | string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

export function validateCitizenshipNumber(number: string): boolean {
  // Nepal citizenship number validation
  const pattern = /^\d{2}-\d{2}-\d{2}-\d{5}$/
  return pattern.test(number)
}

export function validatePAN(pan: string): boolean {
  // Nepal PAN validation (9 digits)
  const pattern = /^\d{9}$/
  return pattern.test(pan)
}

export function validateMobile(mobile: string): boolean {
  // Nepal mobile number validation
  const pattern = /^(98|97)\d{8}$/
  return pattern.test(mobile)
}
