import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as { id: string }).id },
      select: { roles: true }
    })

    if (!user?.roles.includes('OWNER')) {
      return NextResponse.json({ error: 'Only owners can manage roles' }, { status: 403 })
    }

    const { userId, roles } = await request.json()

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { roles },
      select: { id: true, name: true, roles: true }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update roles' }, { status: 500 })
  }
}