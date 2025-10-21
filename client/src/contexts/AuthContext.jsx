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
    const storedToken = localStorage.getItem('q-sight-token')
    const storedUser = localStorage.getItem('q-sight-user')
    
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
    return `q-sight-${timestamp}-${randomString}`
  }

  // Login function
  const login = async (username, password) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Fake authentication - accept any username/password
    if (username && password) {
      const fakeToken = generateFakeToken()
      const fakeUser = {
        id: 1,
        username: username,
        name: 'Frankie Sullivan',
        role: 'Administrator',
        email: 'frankie.sullivan@dpc.gov.zw',
        department: 'Deposit Protection Corporation'
      }
      
      setToken(fakeToken)
      setUser(fakeUser)
      
      // Store in localStorage
      localStorage.setItem('q-sight-token', fakeToken)
      localStorage.setItem('q-sight-user', JSON.stringify(fakeUser))
      
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
    localStorage.removeItem('q-sight-token')
    localStorage.removeItem('q-sight-user')
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
