import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { join } from 'path'

// Load .env file from the current working directory (server folder)
// Since script is run from server folder, process.cwd() should be the server directory
const envPath = join(process.cwd(), '.env')
dotenv.config({ path: envPath })

// Debug: Check if DATABASE_URL is loaded
console.log('Looking for .env at:', envPath)
console.log('Current working directory:', process.cwd())

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables')
  console.error(`Tried loading from: ${envPath}`)
  console.error('Make sure your .env file contains exactly: DATABASE_URL="file:./prisma/dev.db"')
  console.error('(No spaces around the = sign, and use quotes)')
  process.exit(1)
}

console.log('✅ DATABASE_URL loaded successfully')

const prisma = new PrismaClient()

async function createTestData() {
  try {
    console.log('Creating test data...')

    // Create a test bank
    const bank = await prisma.bank.create({
      data: {
        bankCode: 'TEST001',
        bankName: 'Test Bank',
        email: 'testbank@example.com'
      }
    })

    console.log('✅ Bank created:', bank.id, bank.bankName)

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10)
    const user = await prisma.user.create({
      data: {
        bankId: bank.id,
        email: 'testuser@example.com',
        name: 'Test User',
        role: 'Uploader',
        password: hashedPassword
      }
    })

    console.log('✅ User created:', user.id, user.name)

    console.log('\n📋 Use these IDs in Postman:')
    console.log('bankId:', bank.id)
    console.log('userId:', user.id)
    console.log('\n✅ Test data created successfully!')

  } catch (error) {
    console.error('❌ Error creating test data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestData()

