'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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

  if (loading) return <div className="container mx-auto p-8">Loading entry...</div>
  if (!entry) return <div className="container mx-auto p-8">Entry not found.</div>

  return (
    <div className="container mx-auto p-8">
      <div className="glass p-6 rounded-xl">
        <div className="grid gap-6 md:grid-cols-[200px_1fr] items-start">
          <img src={entry.posterImage || '/placeholder.jpg'} alt={entry.title} className="rounded-xl w-full h-auto object-cover" />
          <div>
            <h1 className="text-4xl font-bold text-primary-300 mb-2">{entry.title}</h1>
            <p className="text-primary-200 mb-4">Type: {entry.type}</p>
            <p className="text-primary-200 mb-4">Status: {entry.status}</p>
            <p className="text-primary-200 mb-4">Rating: {entry.averageRating?.toFixed(1) || 'N/A'}</p>
            <p className="text-primary-200">{entry.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
