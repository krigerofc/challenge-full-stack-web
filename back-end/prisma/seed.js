const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding sample students...')
  const list = [
    { fullName: 'Alice Silva', email: 'alice@example.com', ra: 'RA1001', cpf: '11144477735' },
    { fullName: 'Bruno Costa', email: 'bruno@example.com', ra: 'RA1002', cpf: '22255588846' },
  ]

  for (const s of list) {
    try {
      await prisma.student.upsert({
        where: { ra: s.ra },
        update: {},
        create: s,
      })
    } catch (err) {
      console.error('Seed error for', s.ra, err.message)
    }
  }

  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
