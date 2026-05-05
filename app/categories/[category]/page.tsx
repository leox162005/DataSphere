'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Entry {
  id: string
  title: string
  type: string
  status: string
  averageRating: number
  posterImage: string
  _count: {
    ratings: number
    comments: number
  }
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/entries?type=${category}`)
      .then(res => res.json())
      .then(data => {
        setEntries(data.entries)
        setLoading(false)
      })
  }, [category])

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-200 p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-200 p-8">
      <h1 className="text-3xl font-bold text-primary-300 mb-8 capitalize">{category} Database</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entries.map(entry => (
          <div key={entry.id} className="glass p-4 rounded-lg hover:bg-opacity-30 transition">
            <img src={entry.posterImage || '/placeholder.jpg'} alt={entry.title} className="w-full h-48 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold text-primary-300">{entry.title}</h3>
            <p className="text-primary-200">Rating: {entry.averageRating?.toFixed(1) || 'N/A'}</p>
            <p className="text-primary-200">Reviews: {entry._count.ratings}</p>
          </div>
        ))}
      </div>
    </div>
  )
}