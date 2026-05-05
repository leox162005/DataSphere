import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entry = await prisma.entry.findUnique({
      where: { id: params.id },
      include: {
        characters: {
          include: {
            voiceActors: true
          }
        },
        staff: true,
        seasons: true,
        relatedTitles: true,
        ratings: {
          include: {
            user: {
              select: { name: true }
            }
          }
        },
        comments: {
          include: {
            user: {
              select: { name: true }
            },
            replies: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { ratings: true, comments: true }
        }
      }
    })

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json(entry)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entry' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as { id: string }).id },
      select: { roles: true }
    })

    if (!user?.roles.includes('DATABASE_ENTRY_MODERATOR') && !user?.roles.includes('DATABASE_ADMIN') && !user?.roles.includes('OWNER')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await request.json()
    const entry = await prisma.entry.update({
      where: { id: params.id },
      data: {
        ...body,
        genres: body.genres || [],
        tags: body.tags || []
      }
    })

    return NextResponse.json(entry)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as { id: string }).id },
      select: { roles: true }
    })

    if (!user?.roles.includes('DATABASE_ADMIN') && !user?.roles.includes('OWNER')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    await prisma.entry.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Entry deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 })
  }
}