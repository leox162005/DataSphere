import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DataSphere',
  description: 'A comprehensive database platform for anime, movies, series, manga, and novels',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className + " bg-slate-900 text-slate-100"}>
        <SessionProvider>
          <Navigation />
          <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
