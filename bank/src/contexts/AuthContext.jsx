import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('bank-token')
    const storedUser = localStorage.getItem('bank-user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Generate fake token
  const generateFakeToken = () => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    return `bank-${timestamp}-${randomString}`
  }

  // Login function
  const login = async (credentials) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock authentication
    const mockUsers = {
      'cbz@bank.com': {
        id: 1,
        email: 'cbz@bank.com',
        bankName: 'CBZ Bank Limited',
        bankCode: 'CBZ',
        role: 'Uploader',
        permissions: ['upload', 'view', 'submit'],
        name: 'John Moyo'
      },
      'scb@bank.com': {
        id: 2,
        email: 'scb@bank.com',
        bankName: 'Standard Chartered Bank',
        bankCode: 'SCB',
        role: 'Reviewer',
        permissions: ['upload', 'view', 'submit', 'review'],
        name: 'Sarah Chikwanda'
      }
    }

    const user = mockUsers[credentials.email]
    if (user && credentials.password === 'password123') {
      const fakeToken = generateFakeToken()
      
      setToken(fakeToken)
      setUser(user)
      
      // Store in localStorage
      localStorage.setItem('bank-token', fakeToken)
      localStorage.setItem('bank-user', JSON.stringify(user))
      
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: 'Invalid credentials' }
    }
  }

  // Logout function
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('bank-token')
    localStorage.removeItem('bank-user')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}