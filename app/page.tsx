import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <section>
        <h2 className="text-4xl font-bold text-center text-primary-300 mb-8">Welcome to DataSphere</h2>
        <p className="text-center text-primary-200 mb-8">Your ultimate database for anime, movies, series, manga, and novels.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Link href="/categories/anime" className="glass p-6 rounded-lg text-center hover:bg-opacity-30 transition">
          <h3 className="text-xl font-semibold text-primary-300">Anime</h3>
        </Link>
        <Link href="/categories/movies" className="glass p-6 rounded-lg text-center hover:bg-opacity-30 transition">
          <h3 className="text-xl font-semibold text-primary-300">Movies</h3>
        </Link>
        <Link href="/categories/series" className="glass p-6 rounded-lg text-center hover:bg-opacity-30 transition">
          <h3 className="text-xl font-semibold text-primary-300">Series</h3>
        </Link>
        <Link href="/categories/manga" className="glass p-6 rounded-lg text-center hover:bg-opacity-30 transition">
          <h3 className="text-xl font-semibold text-primary-300">Manga</h3>
        </Link>
        <Link href="/categories/novels" className="glass p-6 rounded-lg text-center hover:bg-opacity-30 transition">
          <h3 className="text-xl font-semibold text-primary-300">Novels</h3>
        </Link>
      </section>
    </div>
  )
}
