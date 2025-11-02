import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Get all users for a bank
export const getUsersByBank = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { bankId: req.params.bankId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    res.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        bank: {
          select: {
            id: true,
            bankName: true,
            bankCode: true
          }
        },
        _count: {
          select: {
            submissions: true
          }
        }
      }
    })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Create user
export const createUser = async (req, res) => {
  try {
    const { bankId, name, email, role, password } = req.body
    
    if (!bankId || !name || !email || !role || !password) {
      return res.status(400).json({
        error: 'Missing required fields: bankId, name, email, role, password'
      })
    }
    
    // Validate role
    const validRoles = ['Uploader', 'Reviewer', 'Approver']
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be one of: Uploader, Reviewer, Approver'
      })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        bankId,
        name,
        email,
        role,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
    
    res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'User with this email already exists'
      })
    }
    console.error('Create user error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body
    
    const updateData = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (role) {
      const validRoles = ['Uploader', 'Reviewer', 'Approver']
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          error: 'Invalid role. Must be one of: Uploader, Reviewer, Approver'
        })
      }
      updateData.role = role
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    })
    
    res.json({
      success: true,
      user
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' })
    }
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    })
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' })
    }
    console.error('Delete user error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}


