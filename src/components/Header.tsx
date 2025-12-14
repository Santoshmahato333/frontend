'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { authApi } from '@/lib/api/auth'
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = authApi.getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    authApi.logout()
    router.push('/auth/login')
  }

  if (!user) return null

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Skywings AML-CFT</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
