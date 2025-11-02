import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    console.log('Checking database...\n')

    // Check banks
    const banks = await prisma.bank.findMany()
    console.log('📊 Banks in database:')
    if (banks.length === 0) {
      console.log('   ❌ No banks found!')
    } else {
      banks.forEach(bank => {
        console.log(`   ✅ ID: ${bank.id}`)
        console.log(`      Code: ${bank.bankCode}, Name: ${bank.bankName}`)
      })
    }

    // Check users
    const users = await prisma.user.findMany({
      include: {
        bank: {
          select: {
            bankName: true,
            bankCode: true
          }
        }
      }
    })
    console.log('\n👤 Users in database:')
    if (users.length === 0) {
      console.log('   ❌ No users found!')
    } else {
      users.forEach(user => {
        console.log(`   ✅ ID: ${user.id}`)
        console.log(`      Email: ${user.email}, Name: ${user.name}`)
        console.log(`      Bank ID: ${user.bankId}, Bank: ${user.bank?.bankName || 'N/A'}`)
      })
    }

    // Check what frontend expects
    console.log('\n📋 Frontend expects:')
    console.log('   Bank ID: cmhhc6y5t00001vxm3ek6lxgj')
    console.log('   User ID: cmhhc6ya700021vxmri14apv5')

    // Check if expected IDs exist
    const expectedBank = await prisma.bank.findUnique({
      where: { id: 'cmhhc6y5t00001vxm3ek6lxgj' }
    })
    const expectedUser = await prisma.user.findUnique({
      where: { id: 'cmhhc6ya700021vxmri14apv5' }
    })

    console.log('\n🔍 Validation:')
    if (expectedBank) {
      console.log('   ✅ Expected Bank ID exists')
    } else {
      console.log('   ❌ Expected Bank ID NOT FOUND - run create-test-data-server.js')
    }

    if (expectedUser) {
      console.log('   ✅ Expected User ID exists')
      if (expectedUser.bankId !== 'cmhhc6y5t00001vxm3ek6lxgj') {
        console.log(`   ⚠️  User belongs to different bank: ${expectedUser.bankId}`)
      } else {
        console.log('   ✅ User belongs to correct bank')
      }
    } else {
      console.log('   ❌ Expected User ID NOT FOUND - run create-test-data-server.js')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()

