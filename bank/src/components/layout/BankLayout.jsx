import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  Building2,
  Home,
  Upload,
  FileText,
  History,
  AlertTriangle,
  DollarSign,
  CreditCard,
  RefreshCw,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
  MoreVertical
} from 'lucide-react'

const BankLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/bank/dashboard',
      icon: Home,
      current: location.pathname === '/bank/dashboard'
    },
    {
      name: 'Upload Returns',
      href: '/bank/upload-returns',
      icon: Upload,
      current: location.pathname === '/bank/upload-returns'
    },
    {
      name: 'Validation Results',
      href: '/bank/validation-results',
      icon: CheckCircle,
      current: location.pathname === '/bank/validation-results'
    },
    {
      name: 'Submission History',
      href: '/bank/submission-history',
      icon: History,
      current: location.pathname === '/bank/submission-history'
    },
    {
      name: 'Penalties',
      href: '/bank/penalties',
      icon: AlertTriangle,
      current: location.pathname === '/bank/penalties'
    },
    {
      name: 'Invoices & Payments',
      href: '/bank/invoices',
      icon: FileText,
      current: location.pathname === '/bank/invoices' || location.pathname === '/bank/payments'
    },
    {
      name: 'Reconciliation',
      href: '/bank/reconciliation',
      icon: RefreshCw,
      current: location.pathname === '/bank/reconciliation'
    },
    {
      name: 'SCV Management',
      href: '/bank/scv-upload',
      icon: BarChart3,
      current: location.pathname === '/bank/scv-upload' || location.pathname === '/bank/scv-validation' || location.pathname === '/bank/scv-reports'
    },
    {
      name: 'Reports',
      href: '/bank/reports',
      icon: BarChart3,
      current: location.pathname === '/bank/reports'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-64 flex-col bg-white shadow-xl max-h-screen overflow-y-auto">
          {/* Mobile sidebar content */}
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-700">Bank Portal</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 px-6 py-4 overflow-y-auto">
            {navigation.map((item, index) => (
              <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                <Link
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-30">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-lg max-h-screen overflow-y-auto">
          {/* Logo and App Name */}
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-700">Bank Portal</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {navigation.map((item) => (
              <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                <Link
                  to={item.href}
                  className={`${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-700">{user?.role}</p>
              </div>
              <button className="p-1">
                <MoreVertical className="h-3 w-3 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 min-h-screen">
        {/* Top navigation */}
        <div className="fixed top-0 right-0 left-0 lg:left-64 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-500" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
              
              <div className="flex items-center gap-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {user?.role || 'User'}
                </span>
              </div>

              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-500"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="pt-20 pb-6 bg-gray-50 min-h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default BankLayout