// Return types
export const RETURN_TYPES = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  SCV: 'scv',
  BALANCE_SHEET: 'balance_sheet',
  INCOME_STATEMENT: 'income_statement'
}

// Submission statuses
export const SUBMISSION_STATUS = {
  PENDING: 'pending',
  VALIDATED: 'validated',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

// Validation statuses
export const VALIDATION_STATUS = {
  PASSED: 'passed',
  FAILED: 'failed',
  WARNING: 'warning'
}

// User roles
export const USER_ROLES = {
  UPLOADER: 'Uploader',
  REVIEWER: 'Reviewer',
  APPROVER: 'Approver'
}

// File validation
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ALLOWED_TYPES: ['.xlsx', '.xls'],
  ALLOWED_MIME_TYPES: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ]
}

// Required columns for each return type
export const REQUIRED_COLUMNS = {
  monthly: ['Account_Number', 'Customer_ID', 'Account_Type', 'Balance', 'Opening_Balance', 'Deposits', 'Withdrawals', 'Interest_Paid', 'Account_Status', 'Date'],
  quarterly: ['Period', 'Total_Deposits', 'Total_Withdrawals', 'Net_Deposits', 'Interest_Expense', 'Average_Balance', 'Account_Growth', 'Compliance_Score'],
  scv: ['Customer_ID', 'Customer_Name', 'Total_Accounts', 'Total_Balance', 'Account_Types', 'Largest_Account', 'Date_of_Birth', 'ID_Number', 'Contact_Address'],
  balance_sheet: ['ASSETS', 'Amount'],
  income_statement: ['REVENUE', 'Amount']
}


