'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Entry {
  id: string
  title: string
  type: string
  status: string
  description?: string
  averageRating?: number
  posterImage?: string
  _count?: {
    ratings: number
    comments: number
  }
}

export default function EntryPage() {
  const params = useParams()
  const id = params.id as string
  const [entry, setEntry] = useState<Entry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/entries/${id}`)
      .then(res => res.json())
      .then(data => {
        setEntry(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
    <div className="text-primary-400 text-xl">Loading entry...</div>
  </div>
  if (!entry) return <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-slate-300 mb-2">Entry not found</h2>
      <p className="text-slate-500">The entry you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  </div>

  return (
    <div className="container mx-auto p-8">
      <div className="glass p-8 rounded-xl bg-slate-800/50 border border-slate-700">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] items-start">
          <div className="space-y-4">
            <Image src={entry.posterImage || '/placeholder.jpg'} alt={entry.title} width={300} height={450} className="rounded-xl w-full object-cover shadow-2xl" />
            <div className="glass p-4 rounded-lg bg-slate-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Rating</span>
                <span className="text-primary-400 font-bold text-lg">{entry.averageRating?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Reviews</span>
                <span className="text-slate-300">{entry._count?.ratings || 0}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-primary-300 mb-3 bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text text-transparent">{entry.title}</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium">{entry.type}</span>
                <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm font-medium">{entry.status}</span>
              </div>
            </div>
            {entry.description && (
              <div className="glass p-6 rounded-lg bg-slate-800/30">
                <h3 className="text-xl font-semibold text-slate-200 mb-3">Description</h3>
                <p className="text-slate-300 leading-relaxed">{entry.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
