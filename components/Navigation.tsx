'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navigation() {
  const { data: session, status } = useSession()

  return (
    <nav className="glass sticky top-0 z-10 p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6 flex-wrap">
          <Link href="/" className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors">DataSphere</Link>
          <Link href="/categories/anime" className="text-slate-300 hover:text-primary-400 transition-colors">Anime</Link>
          <Link href="/categories/movies" className="text-slate-300 hover:text-primary-400 transition-colors">Movies</Link>
          <Link href="/categories/series" className="text-slate-300 hover:text-primary-400 transition-colors">Series</Link>
          <Link href="/categories/manga" className="text-slate-300 hover:text-primary-400 transition-colors">Manga</Link>
          <Link href="/categories/novels" className="text-slate-300 hover:text-primary-400 transition-colors">Novels</Link>
          <Link href="/admin" className="text-slate-300 hover:text-primary-400 transition-colors">Admin</Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {status === 'loading' ? (
            <span className="text-slate-400">Checking session...</span>
          ) : session?.user ? (
            <>
              <Link href={`/users/${(session.user as any).id}`} className="text-slate-300 hover:text-primary-400 transition-colors">
                {(session.user as any).name || session.user.email}
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-primary-400 hover:text-primary-200 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => signIn()}
                className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-primary-400 hover:text-primary-200 transition-colors"
              >
                Sign in
              </button>
              <Link
                href="/auth/signup"
                className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-primary-400 hover:text-primary-200 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
