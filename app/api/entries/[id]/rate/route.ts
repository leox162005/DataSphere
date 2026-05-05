import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { value } = await request.json()

    if (value < 1 || value > 10) {
      return NextResponse.json({ error: 'Rating must be between 1 and 10' }, { status: 400 })
    }

    const rating = await prisma.rating.upsert({
      where: {
        userId_entryId: {
          userId: (session.user as { id: string }).id,
          entryId: params.id
        }
      },
      update: { value },
      create: {
        userId: (session.user as { id: string }).id,
        entryId: params.id,
        value
      }
    })

    // Update average rating
    const ratings = await prisma.rating.findMany({
      where: { entryId: params.id },
      select: { value: true }
    })

    const averageRating = ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length

    await prisma.entry.update({
      where: { id: params.id },
      data: { averageRating }
    })

    return NextResponse.json(rating)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to rate entry' }, { status: 500 })
  }
}