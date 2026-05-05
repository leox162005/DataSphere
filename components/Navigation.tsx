import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="glass sticky top-0 z-10 p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors">DataSphere</Link>
        <div className="flex space-x-6">
          <Link href="/categories/anime" className="text-slate-300 hover:text-primary-400 transition-colors">Anime</Link>
          <Link href="/categories/movies" className="text-slate-300 hover:text-primary-400 transition-colors">Movies</Link>
          <Link href="/categories/series" className="text-slate-300 hover:text-primary-400 transition-colors">Series</Link>
          <Link href="/categories/manga" className="text-slate-300 hover:text-primary-400 transition-colors">Manga</Link>
          <Link href="/categories/novels" className="text-slate-300 hover:text-primary-400 transition-colors">Novels</Link>
          <Link href="/admin" className="text-slate-300 hover:text-primary-400 transition-colors">Admin</Link>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Discord</a>
          <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Twitter</a>
          <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Reddit</a>
        </div>
      </div>
    </nav>
  )
}