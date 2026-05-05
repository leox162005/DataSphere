import Link from 'next/link'
import { Film, Video, Monitor, BookOpen, Bookmark } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <section className="text-center mb-12">
        <h2 className="text-5xl font-bold text-primary-400 mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          Welcome to DataSphere
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Your ultimate database for anime, movies, series, manga, and novels. Discover, track, and share your favorite content.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Link href="/categories/anime" className="group glass p-6 rounded-xl text-center hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-primary-500">
          <Film className="mx-auto mb-3 h-12 w-12 text-primary-300" />
          <h3 className="text-xl font-semibold text-primary-300 group-hover:text-primary-200">Anime</h3>
        </Link>
        <Link href="/categories/movies" className="group glass p-6 rounded-xl text-center hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-primary-500">
          <Video className="mx-auto mb-3 h-12 w-12 text-primary-300" />
          <h3 className="text-xl font-semibold text-primary-300 group-hover:text-primary-200">Movies</h3>
        </Link>
        <Link href="/categories/series" className="group glass p-6 rounded-xl text-center hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-primary-500">
          <Monitor className="mx-auto mb-3 h-12 w-12 text-primary-300" />
          <h3 className="text-xl font-semibold text-primary-300 group-hover:text-primary-200">Series</h3>
        </Link>
        <Link href="/categories/manga" className="group glass p-6 rounded-xl text-center hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-primary-500">
          <BookOpen className="mx-auto mb-3 h-12 w-12 text-primary-300" />
          <h3 className="text-xl font-semibold text-primary-300 group-hover:text-primary-200">Manga</h3>
        </Link>
        <Link href="/categories/novels" className="group glass p-6 rounded-xl text-center hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-primary-500">
          <Bookmark className="mx-auto mb-3 h-12 w-12 text-primary-300" />
          <h3 className="text-xl font-semibold text-primary-300 group-hover:text-primary-200">Novels</h3>
        </Link>
      </section>
    </div>
  )
}
