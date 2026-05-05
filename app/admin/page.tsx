'use client'

import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

const availableRoles = [
  'OWNER',
  'DATABASE_ADMIN',
  'DATABASE_ADDER',
  'DATABASE_ENTRY_MODERATOR',
  'COMMUNITY_ADMIN',
  'COMMUNITY_MODERATOR',
  'COMMENT_ADMIN',
  'COMMENT_MODERATOR',
  'USER'
] as const

type RoleType = (typeof availableRoles)[number]

type UserRecord = {
  id: string
  name?: string
  email: string
  roles: RoleType[]
  createdAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<UserRecord[]>([])
  const [selectedRoles, setSelectedRoles] = useState<Record<string, RoleType[]>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status !== 'authenticated') {
      return
    }

    async function loadUsers() {
      setLoading(true)
      const response = await fetch('/api/users')
      if (!response.ok) {
        setError('Unable to load users. Please sign in or check your permissions.')
        setLoading(false)
        return
      }

      const data = await response.json()
      setUsers(data)
      setSelectedRoles(
        data.reduce((acc: Record<string, RoleType[]>, user: UserRecord) => {
          acc[user.id] = user.roles
          return acc
        }, {})
      )
      setLoading(false)
    }

    loadUsers()
  }, [status])

  const currentRoles = (session?.user as any)?.roles as string[] | undefined
  const canManageRoles = currentRoles?.includes('OWNER') || currentRoles?.includes('DATABASE_ADMIN')

  const updateRoleSelection = (userId: string, role: RoleType) => {
    setSelectedRoles(prev => {
      const existing = prev[userId] || []
      const next = existing.includes(role)
        ? existing.filter(item => item !== role)
        : [...existing, role]

      return { ...prev, [userId]: next }
    })
  }

  const handleSaveRoles = async (userId: string) => {
    setError(null)
    setMessage(null)
    const roles = selectedRoles[userId] || []

    const response = await fetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, roles })
    })

    if (!response.ok) {
      const errorData = await response.json()
      setError(errorData?.error || 'Failed to save roles')
      return
    }

    const updatedUser = await response.json()
    setUsers(prev => prev.map(user => (user.id === updatedUser.id ? { ...user, roles: updatedUser.roles } : user)))
    setMessage('Roles updated successfully.')
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
        <div className="text-primary-400 text-xl">Loading admin dashboard...</div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h1 className="text-4xl font-bold text-primary-400 mb-4">Admin Access Required</h1>
        <p className="text-slate-300 mb-6">Please sign in with an admin account to manage roles and user permissions.</p>
        <button
          type="button"
          onClick={() => signIn()}
          className="rounded-full border border-primary-500 px-6 py-3 text-sm text-primary-200 hover:bg-primary-500/10 transition-colors"
        >
          Sign in
        </button>
      </div>
    )
  }

  if (!canManageRoles) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h1 className="text-4xl font-bold text-primary-400 mb-4">Unauthorized</h1>
        <p className="text-slate-300">Your account does not have permission to manage user roles.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="glass p-8 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-400">Admin Dashboard</h1>
            <p className="text-slate-300 mt-2">Manage users, assign roles, and keep the database secure.</p>
          </div>
          <div className="text-slate-400 text-sm">
            {session.user && (
              <span>Signed in as <strong>{(session.user as any).name || session.user.email}</strong></span>
            )}
          </div>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 p-4 text-red-200">{error}</div>}
        {message && <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500 p-4 text-emerald-200">{message}</div>}

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm text-slate-200">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Roles</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">{user.name || 'Unnamed'}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {availableRoles.map(role => {
                        const selected = selectedRoles[user.id]?.includes(role)
                        return (
                          <button
                            key={`${user.id}-${role}`}
                            type="button"
                            onClick={() => updateRoleSelection(user.id, role)}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors ${selected ? 'border-primary-400 bg-primary-500/10 text-primary-200' : 'border-slate-700 bg-slate-900/70 text-slate-400 hover:border-slate-500'}`}
                          >
                            {role}
                          </button>
                        )
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleSaveRoles(user.id)}
                      className="rounded-full border border-primary-500 px-4 py-2 text-sm text-primary-200 hover:bg-primary-500/10 transition-colors"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
