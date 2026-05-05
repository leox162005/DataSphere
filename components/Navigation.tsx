import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="glass sticky top-0 z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-300">DataSphere</Link>
        <div className="flex space-x-4">
          <Link href="/categories/anime" className="text-primary-300 hover:text-primary-100">Anime</Link>
          <Link href="/categories/movies" className="text-primary-300 hover:text-primary-100">Movies</Link>
          <Link href="/categories/series" className="text-primary-300 hover:text-primary-100">Series</Link>
          <Link href="/categories/manga" className="text-primary-300 hover:text-primary-100">Manga</Link>
          <Link href="/categories/novels" className="text-primary-300 hover:text-primary-100">Novels</Link>
          <Link href="/admin" className="text-primary-300 hover:text-primary-100">Admin</Link>
        </div>
        <div className="flex space-x-2">
          <a href="#" className="text-primary-300 hover:text-primary-100">Discord</a>
          <a href="#" className="text-primary-300 hover:text-primary-100">Twitter</a>
          <a href="#" className="text-primary-300 hover:text-primary-100">Reddit</a>
        </div>
      </div>
    </nav>
  )
}