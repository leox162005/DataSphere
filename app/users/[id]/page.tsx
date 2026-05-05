'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface UserProfile {
  id: string
  name?: string
  image?: string
  roles: string[]
  _count: {
    ratings: number
    comments: number
  }
}

export default function UserProfilePage() {
  const params = useParams()
  const id = params.id as string
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="container mx-auto p-8">Loading profile...</div>
  if (!user) return <div className="container mx-auto p-8">User profile not found.</div>

  return (
    <div className="container mx-auto p-8">
      <div className="glass p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center text-primary-300 text-4xl">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary-300">{user.name || 'User'}</h1>
            <p className="text-primary-200">Roles: {user.roles.join(', ')}</p>
            <p className="text-primary-200">Ratings: {user._count.ratings}</p>
            <p className="text-primary-200">Comments: {user._count.comments}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
