import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = type ? { type: type.toUpperCase() as any } : {}

    const entries = await prisma.entry.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        ratings: true,
        _count: {
          select: { ratings: true, comments: true }
        }
      }
    })

    const total = await prisma.entry.count({ where })

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has permission to add entries
    const user = await prisma.user.findUnique({
      where: { id: (session.user as { id: string }).id },
      select: { roles: true }
    })

    if (!user?.roles.includes('DATABASE_ADDER') && !user?.roles.includes('DATABASE_ADMIN') && !user?.roles.includes('OWNER')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await request.json()
    const entry = await prisma.entry.create({
      data: {
        ...body,
        genres: body.genres || [],
        tags: body.tags || []
      }
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
  }
}