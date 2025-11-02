import dotenv from 'dotenv'
import { join } from 'path'
import fs from 'fs'

const envPath = join(process.cwd(), '.env')
console.log('Looking for .env at:', envPath)
console.log('File exists:', fs.existsSync(envPath))

if (fs.existsSync(envPath)) {
  console.log('\n📄 Contents of .env file (first 10 lines):')
  const content = fs.readFileSync(envPath, 'utf-8')
  const lines = content.split('\n').slice(0, 10)
  lines.forEach((line, index) => {
    console.log(`${index + 1}: ${line}`)
  })
}

console.log('\n📋 Loading environment variables...')
dotenv.config({ path: envPath })

console.log('\n✅ Environment variables loaded:')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? `"${process.env.DATABASE_URL}"` : '❌ NOT FOUND')
console.log('PORT:', process.env.PORT || 'Not set')
console.log('UPLOAD_DIR:', process.env.UPLOAD_DIR || 'Not set')

if (!process.env.DATABASE_URL) {
  console.log('\n❌ DATABASE_URL is missing!')
  console.log('\nExpected format in .env file:')
  console.log('DATABASE_URL="file:./prisma/dev.db"')
} else {
  console.log('\n✅ DATABASE_URL is set correctly!')
}

