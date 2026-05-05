import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { entryId: params.id, parentId: null },
      include: {
        user: {
          select: { name: true, image: true }
        },
        replies: {
          include: {
            user: {
              select: { name: true, image: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, parentId } = await request.json()

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: (session.user as { id: string }).id,
        entryId: params.id,
        parentId: parentId || null
      },
      include: {
        user: {
          select: { name: true, image: true }
        }
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}