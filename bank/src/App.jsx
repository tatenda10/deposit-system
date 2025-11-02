import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import BankLoginPage from './pages/BankLoginPage'
import BankLayout from './components/layout/BankLayout'
import BankDashboard from './pages/BankDashboard'
import UploadReturns from './pages/UploadReturns'
import ValidationResults from './pages/ValidationResults'
import SubmissionHistory from './pages/SubmissionHistory'
import Penalties from './pages/Penalties'
import Invoices from './pages/Invoices'
import Payments from './pages/Payments'
import Reconciliation from './pages/Reconciliation'
import SCVUpload from './pages/SCVUpload'
import SCVValidation from './pages/SCVValidation'
import SCVReports from './pages/SCVReports'
import BankReports from './pages/BankReports'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BankLoginPage />} />
          <Route path="/bank" element={
            <ProtectedRoute>
              <BankLayout />
            </ProtectedRoute>
          }>
            <Route index element={<BankDashboard />} />
            <Route path="dashboard" element={<BankDashboard />} />
            
            {/* Returns Management Routes */}
            <Route path="upload-returns" element={<UploadReturns />} />
            <Route path="validation-results" element={<ValidationResults />} />
            <Route path="submission-history" element={<SubmissionHistory />} />
            <Route path="penalties" element={<Penalties />} />
            
            {/* Premium Management Routes */}
            <Route path="invoices" element={<Invoices />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reconciliation" element={<Reconciliation />} />
            
            {/* Single Customer View Routes */}
            <Route path="scv-upload" element={<SCVUpload />} />
            <Route path="scv-validation" element={<SCVValidation />} />
            <Route path="scv-reports" element={<SCVReports />} />
            
            {/* Reports & Notifications Routes */}
            <Route path="reports" element={<BankReports />} />
            <Route path="notifications" element={<Notifications />} />
            
            {/* Profile & Settings Routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App