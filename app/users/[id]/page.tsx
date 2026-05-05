'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { User as UserIcon } from 'lucide-react'

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

  if (loading) return <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
    <div className="text-primary-400 text-xl">Loading profile...</div>
  </div>
  if (!user) return <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-primary-300">
        <UserIcon className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-300 mb-2">User not found</h2>
      <p className="text-slate-500">The user profile you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  </div>

  return (
    <div className="container mx-auto p-8">
      <div className="glass p-8 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-primary-300 mb-2">{user.name || 'Anonymous User'}</h1>
            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {user.roles.map(role => (
                <span key={role} className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm font-medium">
                  {role}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-center md:text-left">
              <div className="glass p-4 rounded-lg bg-slate-800/30">
                <div className="text-2xl font-bold text-primary-400">{user._count.ratings}</div>
                <div className="text-slate-400">Ratings</div>
              </div>
              <div className="glass p-4 rounded-lg bg-slate-800/30">
                <div className="text-2xl font-bold text-primary-400">{user._count.comments}</div>
                <div className="text-slate-400">Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
