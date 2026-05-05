'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
    <div className="text-primary-400 text-xl">Loading...</div>
  </div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-400 mb-2 capitalize">{category} Database</h1>
        <p className="text-slate-400">Discover and explore {category} content</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entries.map(entry => (
          <div key={entry.id} className="glass p-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-primary-500 group cursor-pointer">
            <Image src={entry.posterImage || '/placeholder.jpg'} alt={entry.title} width={400} height={192} className="w-full h-48 object-cover rounded-lg mb-3 group-hover:brightness-110 transition-all" />
            <h3 className="text-lg font-semibold text-slate-200 group-hover:text-primary-300 mb-2 line-clamp-2">{entry.title}</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">{entry.type}</span>
              <span className="text-primary-400 font-medium">{entry.averageRating?.toFixed(1) || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-slate-500">{entry._count.ratings} reviews</span>
              <span className="text-accent-400">{entry.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}