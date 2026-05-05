import { NextRequest, NextResponse } from 'next/server'

type RateLimitEntry = { count: number; firstSeen: number }
const rateLimitStore = (globalThis as any).__rateLimitStore as Map<string, RateLimitEntry> ?? new Map()
;(globalThis as any).__rateLimitStore = rateLimitStore

const RATE_LIMIT_WINDOW = 60 * 1000
const AUTH_LIMIT = 5
const DEFAULT_LIMIT = 250

const securityHeaders: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block'
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function getRateLimit(pathname: string) {
  if (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup') || pathname.startsWith('/api/auth')) {
    return AUTH_LIMIT
  }

  return DEFAULT_LIMIT
}

function setSecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

export function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  const limit = getRateLimit(pathname)
  const ip = getClientIp(request)
  const key = `${pathname}:${ip}`
  const now = Date.now()
  const existing = rateLimitStore.get(key)

  if (existing) {
    if (now - existing.firstSeen > RATE_LIMIT_WINDOW) {
      rateLimitStore.set(key, { count: 1, firstSeen: now })
    } else if (existing.count >= limit) {
      const response = NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
      response.headers.set('Retry-After', '60')
      return setSecurityHeaders(response)
    } else {
      existing.count += 1
      rateLimitStore.set(key, existing)
    }
  } else {
    rateLimitStore.set(key, { count: 1, firstSeen: now })
  }

  const response = NextResponse.next()
  return setSecurityHeaders(response)
}

export const config = {
  matcher: ['/:path*']
}
