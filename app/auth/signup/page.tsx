'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setError(data.error || 'Unable to create account')
      return
    }

    setSuccess('Account created. Redirecting to sign in…')
    setTimeout(() => router.push('/auth/signin'), 1200)
  }

  return (
    <div className="container mx-auto p-8 min-h-screen flex items-center justify-center">
      <div className="glass w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <UserPlus className="h-8 w-8 text-primary-300" />
          <h1 className="text-4xl font-bold text-primary-400">Create your account</h1>
        </div>
        <p className="text-slate-400 mb-6">Sign up and save entries, rate content, and use admin features if your role permits.</p>

        {error && <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500 p-4 text-sm text-red-200">{error}</div>}
        {success && <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500 p-4 text-sm text-emerald-200">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-slate-300 text-sm">Name</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-primary-400"
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="text-slate-300 text-sm">Email</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-primary-400"
              required
            />
          </label>

          <label className="block">
            <span className="text-slate-300 text-sm">Password</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-primary-400"
              required
              minLength={6}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary-400 px-4 py-3 text-slate-900 font-semibold hover:bg-primary-300 transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-slate-400 text-center">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary-300 hover:text-primary-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
