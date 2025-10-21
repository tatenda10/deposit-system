import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut,
  Menu,
  X,
  Shield,
  Home,
  Grid3X3,
  Palette,
  Sparkles,
  Folder,
  Upload,
  Clock,
  MoreVertical,
  CheckCircle
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Returns Management', href: '/client/returns', icon: FileText },
  { name: 'Bank Surveillance', href: '/client/surveillance', icon: Building2 },
  { name: 'Risk Analysis', href: '/client/risk', icon: AlertTriangle },
  { name: 'Premium Management', href: '/client/premiums', icon: DollarSign },
  { name: 'Single Customer View', href: '/client/scv', icon: Users },
  { name: 'Reports & Analytics', href: '/client/reports', icon: BarChart3 },
  { name: 'Administration', href: '/client/admin', icon: Settings },
]

export default function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-64 flex-col bg-gray-200/30 shadow-xl max-h-screen overflow-y-auto">
          {/* Mobile sidebar content - same as desktop but with close button */}
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-700">Q-Sight</h1>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2">
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 px-6 py-4 overflow-y-auto sidebar-scroll">
            {/* DASHBOARD Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">DASHBOARD</h3>
              <div className="space-y-1">
                <Link
                  to="/client/dashboard"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/dashboard'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </div>
            </div>

            {/* SUBMISSIONS Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">SUBMISSIONS</h3>
              <div className="space-y-1">
                <Link
                  to="/client/returns"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/returns'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Submissions Inbox
                </Link>
              </div>
            </div>

            {/* PREMIUM MANAGEMENT Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">PREMIUM MANAGEMENT</h3>
              <div className="space-y-1">
                <Link
                  to="/client/premiums"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/premiums'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Premium Calculation
                </Link>
                <Link
                  to="/client/invoices"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/invoices'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Premium Invoicing
                </Link>
                <Link
                  to="/client/premium-receipts"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/premium-receipts'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Premium Receipting
                </Link>
                <Link
                  to="/client/penalty-levying"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/penalty-levying'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Penalty Levying
                </Link>
                <Link
                  to="/client/premium-reconciliations"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/premium-reconciliations'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Premium Reconciliations
                </Link>
              </div>
            </div>

            {/* BANK SURVEILLANCE Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">BANK SURVEILLANCE</h3>
              <div className="space-y-1">
                <Link
                  to="/client/deposit-trends"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/deposit-trends'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Deposit Trends
                </Link>
                <Link
                  to="/client/exposure-analysis"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/exposure-analysis'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Exposure Analysis
                </Link>
                <Link
                  to="/client/camels-performance"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/camels-performance'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  CAMELS & Performance
                </Link>
                <Link
                  to="/client/institution-comparison"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/institution-comparison'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Institution Comparison
                </Link>
              </div>
            </div>

            {/* RISK ANALYSIS Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">RISK ANALYSIS</h3>
              <div className="space-y-1">
                <Link
                  to="/client/risk"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/risk'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Risk Scoring
                </Link>
                <Link
                  to="/client/predictive"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/predictive'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Predictive Analytics
                </Link>
                <Link
                  to="/client/anomaly"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/anomaly'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Anomaly Detection
                </Link>
                <Link
                  to="/client/stress-testing"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/stress-testing'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Stress Testing
                </Link>
                <Link
                  to="/client/compliance"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/compliance'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Compliance Tracker
                </Link>
              </div>
            </div>

            {/* SINGLE CUSTOMER VIEW Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">SINGLE CUSTOMER VIEW</h3>
              <div className="space-y-1">
                <Link
                  to="/client/scv"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/scv'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  SCV Summary
                </Link>
                <Link
                  to="/client/deposit-register"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/deposit-register'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Deposit Register
                </Link>
                <Link
                  to="/client/scv-simulation"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/scv-simulation'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  SCV Simulation
                </Link>
              </div>
            </div>

            {/* REPORTS & ANALYTICS Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">REPORTS & ANALYTICS</h3>
              <div className="space-y-1">
                <Link
                  to="/client/reports"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/reports'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Report Builder
                </Link>
                <Link
                  to="/client/trends"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/trends'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Trends & KPIs
                </Link>
                <Link
                  to="/client/export"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/export'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Export Tools
                </Link>
              </div>
            </div>

            {/* ADMINISTRATION Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">ADMINISTRATION</h3>
              <div className="space-y-1">
                <Link
                  to="/client/users"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/users'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  User & Role Management
                </Link>
                <Link
                  to="/client/settings"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/settings'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Link>
                <Link
                  to="/client/audit"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/audit'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Audit Trail
                </Link>
                <Link
                  to="/client/integration"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/integration'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Integration Settings
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-30">
        <div className="flex flex-col flex-grow bg-gray-200/30 border-r border-gray-200 shadow-lg max-h-screen overflow-y-auto">
          {/* Logo and App Name */}
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-700">Q-Sight</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 overflow-y-auto sidebar-scroll">
            {/* DASHBOARD Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">DASHBOARD</h3>
              <div className="space-y-1">
                <Link
                  to="/client/dashboard"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/dashboard'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </div>
            </div>

            {/* SUBMISSIONS Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">SUBMISSIONS</h3>
              <div className="space-y-1">
                <Link
                  to="/client/returns"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/returns'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Submissions Inbox
                </Link>
              </div>
            </div>

            {/* PREMIUM MANAGEMENT Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">PREMIUM MANAGEMENT</h3>
              <div className="space-y-1">
                <Link
                  to="/client/premiums"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/premiums'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Premium Calculation
                </Link>
                <Link
                  to="/client/invoices"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/invoices'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Premium Invoicing
                </Link>
                <Link
                  to="/client/premium-receipts"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/premium-receipts'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Premium Receipting
                </Link>
                <Link
                  to="/client/penalty-levying"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/penalty-levying'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Penalty Levying
                </Link>
                <Link
                  to="/client/premium-reconciliations"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/premium-reconciliations'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Premium Reconciliations
                </Link>
              </div>
            </div>

            {/* BANK SURVEILLANCE Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">BANK SURVEILLANCE</h3>
              <div className="space-y-1">
                <Link
                  to="/client/deposit-trends"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/deposit-trends'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Deposit Trends
                </Link>
                <Link
                  to="/client/exposure-analysis"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/exposure-analysis'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Exposure Analysis
                </Link>
                <Link
                  to="/client/camels-performance"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/camels-performance'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  CAMELS & Performance
                </Link>
                <Link
                  to="/client/institution-comparison"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/institution-comparison'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Institution Comparison
                </Link>
              </div>
            </div>

            {/* RISK ANALYSIS Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">RISK ANALYSIS</h3>
              <div className="space-y-1">
                <Link
                  to="/client/risk"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/risk'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Risk Scoring
                </Link>
                <Link
                  to="/client/predictive"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/predictive'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Predictive Analytics
                </Link>
                <Link
                  to="/client/anomaly"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/anomaly'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Anomaly Detection
                </Link>
                <Link
                  to="/client/stress-testing"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/stress-testing'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Stress Testing
                </Link>
                <Link
                  to="/client/compliance"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/compliance'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Compliance Tracker
                </Link>
              </div>
            </div>

            {/* SINGLE CUSTOMER VIEW Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">SINGLE CUSTOMER VIEW</h3>
              <div className="space-y-1">
                <Link
                  to="/client/scv"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/scv'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Users className="mr-2 h-4 w-4" />
                  SCV Summary
                </Link>
                <Link
                  to="/client/deposit-register"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/deposit-register'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Deposit Register
                </Link>
                <Link
                  to="/client/scv-simulation"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/scv-simulation'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  SCV Simulation
                </Link>
              </div>
            </div>

            {/* REPORTS & ANALYTICS Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">REPORTS & ANALYTICS</h3>
              <div className="space-y-1">
                <Link
                  to="/client/reports"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/reports'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Report Builder
                </Link>
                <Link
                  to="/client/trends"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/trends'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Trends & KPIs
                </Link>
                <Link
                  to="/client/export"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/export'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Export Tools
                </Link>
              </div>
            </div>

            {/* ADMINISTRATION Section */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">ADMINISTRATION</h3>
              <div className="space-y-1">
                <Link
                  to="/client/users"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/users'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Users className="mr-2 h-4 w-4" />
                  User & Role Management
                </Link>
                <Link
                  to="/client/settings"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/settings'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Link>
                <Link
                  to="/client/audit"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/audit'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Audit Trail
                </Link>
                <Link
                  to="/client/integration"
                  className={`flex items-center px-2 py-1.5 text-xs font-medium rounded-lg border-b border-gray-200 ${
                    location.pathname === '/client/integration'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Integration Settings
                </Link>
              </div>
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">FS</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-700">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-700">{user?.role || 'Administrator'}</p>
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-500" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center gap-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'DPC Administrator'}</p>
                  <p className="text-xs text-gray-500">{user?.department || 'Deposit Protection Corporation'}</p>
                </div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Admin
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
        <main className="py-6 bg-gray-50 min-h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
