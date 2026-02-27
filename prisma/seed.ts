import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@foodhub.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@foodhub.com",
      password: hashed,
      role: Role.ADMIN
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())