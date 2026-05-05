'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
      return
    }

    router.push('/')
  }

  return (
    <div className="container mx-auto p-8 min-h-screen flex items-center justify-center">
      <div className="glass w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-8 w-8 text-primary-300" />
          <h1 className="text-4xl font-bold text-primary-400">Sign in</h1>
        </div>
        <p className="text-slate-400 mb-6">Use your email and password to access your account.</p>

        {error && <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500 p-4 text-sm text-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary-400 px-4 py-3 text-slate-900 font-semibold hover:bg-primary-300 transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-slate-400 text-center">
          New to DataSphere?{' '}
          <Link href="/auth/signup" className="text-primary-300 hover:text-primary-200">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
