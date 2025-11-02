import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get all banks
export const getAllBanks = async (req, res) => {
  try {
    const banks = await prisma.bank.findMany({
      include: {
        _count: {
          select: {
            users: true,
            submissions: true
          }
        }
      },
      orderBy: {
        bankName: 'asc'
      }
    })
    
    res.json(banks)
  } catch (error) {
    console.error('Get banks error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Get bank by ID
export const getBankById = async (req, res) => {
  try {
    const bank = await prisma.bank.findUnique({
      where: { id: req.params.id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      }
    })
    
    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' })
    }
    
    res.json(bank)
  } catch (error) {
    console.error('Get bank error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Create bank
export const createBank = async (req, res) => {
  try {
    const { bankCode, bankName, email } = req.body
    
    if (!bankCode || !bankName || !email) {
      return res.status(400).json({
        error: 'Missing required fields: bankCode, bankName, email'
      })
    }
    
    const bank = await prisma.bank.create({
      data: {
        bankCode,
        bankName,
        email
      }
    })
    
    res.status(201).json({
      success: true,
      bank
    })
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Bank with this code or email already exists'
      })
    }
    console.error('Create bank error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Update bank
export const updateBank = async (req, res) => {
  try {
    const { bankName, email } = req.body
    
    const bank = await prisma.bank.update({
      where: { id: req.params.id },
      data: {
        ...(bankName && { bankName }),
        ...(email && { email })
      }
    })
    
    res.json({
      success: true,
      bank
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Bank not found' })
    }
    console.error('Update bank error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Delete bank
export const deleteBank = async (req, res) => {
  try {
    await prisma.bank.delete({
      where: { id: req.params.id }
    })
    
    res.json({
      success: true,
      message: 'Bank deleted successfully'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Bank not found' })
    }
    console.error('Delete bank error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}


