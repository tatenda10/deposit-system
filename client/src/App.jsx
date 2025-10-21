import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import ClientLayout from './components/layout/ClientLayout'
import { 
  Dashboard, 
  ReturnsInbox, 
  ValidationLogs, 
  ReturnRepository, 
  PenaltiesEnforcement,
  PremiumCalculation,
  InvoiceManagement,
  PaymentReconciliation,
  PenaltyManagement,
  UserRoleManagement,
  SystemSettings,
  AuditTrail,
  IntegrationSettings
} from './pages'
import { DepositTrends, ExposureAnalysis, CamelsPerformance, InstitutionComparison } from './pages/surveillance'
import PremiumReceipting from './pages/premiums/PremiumReceipting'
import SubmissionView from './pages/returns/SubmissionView'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/client" element={
            <ProtectedRoute>
              <ClientLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Returns Management Routes */}
            <Route path="returns" element={<ReturnsInbox />} />
            <Route path="submission/:id" element={<SubmissionView />} />
            <Route path="validation" element={<ValidationLogs />} />
            <Route path="repository" element={<ReturnRepository />} />
            <Route path="penalties" element={<PenaltiesEnforcement />} />
            
            {/* Premium Management Routes */}
            <Route path="premiums" element={<PremiumCalculation />} />
            <Route path="invoices" element={<InvoiceManagement />} />
            <Route path="premium-receipts" element={<PremiumReceipting />} />
            <Route path="penalty-levying" element={<PenaltyManagement />} />
            <Route path="premium-reconciliations" element={<PaymentReconciliation />} />
            
            {/* Bank Surveillance Routes */}
            <Route path="deposit-trends" element={<DepositTrends />} />
            <Route path="exposure-analysis" element={<ExposureAnalysis />} />
            <Route path="camels-performance" element={<CamelsPerformance />} />
            <Route path="institution-comparison" element={<InstitutionComparison />} />
            
            {/* Administration Routes */}
            <Route path="users" element={<UserRoleManagement />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="audit" element={<AuditTrail />} />
            <Route path="integration" element={<IntegrationSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App