import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

// Use the same IDs as in the frontend config
const DEMO_BANK_ID = 'cmhhc6y5t00001vxm3ek6lxgj'
const DEMO_USER_ID = 'cmhhc6ya700021vxmri14apv5'

async function createTestData() {
  try {
    console.log('Creating test data on server with specific IDs...')
    console.log('Target Bank ID:', DEMO_BANK_ID)
    console.log('Target User ID:', DEMO_USER_ID)

    // Check if bank with this ID already exists
    let bank = await prisma.bank.findUnique({
      where: { id: DEMO_BANK_ID }
    })

    if (!bank) {
      // Check if bank with this code exists (might have different ID)
      const existingBank = await prisma.bank.findUnique({
        where: { bankCode: 'TEST001' }
      })

      if (existingBank) {
        console.log('⚠️  Bank with code TEST001 exists but has different ID')
        console.log('   Existing ID:', existingBank.id)
        console.log('   Deleting and recreating with target ID...')
        await prisma.bank.delete({ where: { id: existingBank.id } })
      }

      // Create bank with specific ID using create with id
      bank = await prisma.bank.create({
        data: {
          id: DEMO_BANK_ID,
          bankCode: 'TEST001',
          bankName: 'Test Bank',
          email: 'testbank@example.com'
        }
      })
      console.log('✅ Bank created with ID:', bank.id, bank.bankName)
    } else {
      console.log('✅ Bank already exists with correct ID:', bank.id, bank.bankName)
    }

    // Check if user with this ID already exists
    let user = await prisma.user.findUnique({
      where: { id: DEMO_USER_ID }
    })

    if (!user) {
      // Check if user with this email exists (might have different ID)
      const existingUser = await prisma.user.findUnique({
        where: { email: 'testuser@example.com' }
      })

      if (existingUser) {
        console.log('⚠️  User with email testuser@example.com exists but has different ID')
        console.log('   Existing ID:', existingUser.id)
        console.log('   Deleting and recreating with target ID...')
        await prisma.user.delete({ where: { id: existingUser.id } })
      }

      // Create user with specific ID
      const hashedPassword = await bcrypt.hash('password123', 10)
      user = await prisma.user.create({
        data: {
          id: DEMO_USER_ID,
          bankId: bank.id,
          email: 'testuser@example.com',
          name: 'Test User',
          role: 'Uploader',
          password: hashedPassword
        }
      })
      console.log('✅ User created with ID:', user.id, user.name)
    } else {
      console.log('✅ User already exists with correct ID:', user.id, user.name)
    }

    console.log('\n✅ Test data created with matching IDs!')
    console.log('   Bank ID:', bank.id)
    console.log('   User ID:', user.id)
    console.log('\n✅ Frontend config is already correct - no changes needed!')

  } catch (error) {
    console.error('❌ Error creating test data:', error)
    
    // If it's a unique constraint error, the IDs might already exist
    if (error.code === 'P2002') {
      console.log('\n⚠️  Record with this ID or unique field already exists')
      console.log('   Try deleting existing records first or use different IDs')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createTestData()

