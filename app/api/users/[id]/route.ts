import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        image: true,
        roles: true,
        ratings: {
          include: {
            entry: {
              select: { id: true, title: true, type: true }
            }
          }
        },
        comments: {
          include: {
            entry: {
              select: { id: true, title: true, type: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        tracking: {
          include: {
            entry: {
              select: { id: true, title: true, type: true, posterImage: true }
            }
          }
        },
        _count: {
          select: { ratings: true, comments: true }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}