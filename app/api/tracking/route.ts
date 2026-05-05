import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tracking = await prisma.tracking.findMany({
      where: { userId: (session.user as { id: string }).id },
      include: {
        entry: {
          select: { id: true, title: true, type: true, posterImage: true }
        }
      }
    })

    return NextResponse.json(tracking)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tracking' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { entryId, status, progress } = await request.json()

    const tracking = await prisma.tracking.upsert({
      where: {
        userId_entryId: {
          userId: (session.user as { id: string }).id,
          entryId
        }
      },
      update: { status, progress },
      create: {
        userId: (session.user as { id: string }).id,
        entryId,
        status,
        progress
      }
    })

    return NextResponse.json(tracking)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tracking' }, { status: 500 })
  }
}