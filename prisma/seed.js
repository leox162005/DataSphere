const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const email = 'next162005@gmail.com'
  const password = 'admin123'
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      roles: ['OWNER'],
      name: 'Main Owner'
    },
    create: {
      email,
      name: 'Main Owner',
      password: hashedPassword,
      roles: ['OWNER']
    }
  })

  console.log(`Main owner account ready: ${user.email}`)
}

main()
  .catch(error => {
    console.error('Failed to seed owner account:', error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
