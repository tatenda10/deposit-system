import * as XLSX from 'xlsx'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const publicAssetsDir = join(__dirname, 'public', 'assets')
mkdirSync(publicAssetsDir, { recursive: true })

const sampleData = [
  ['Account_Number', 'Customer_ID', 'Account_Type', 'Balance', 'Opening_Balance', 'Deposits', 'Withdrawals', 'Interest_Paid', 'Account_Status', 'Date'],
  ['ACC-001234', 'CUST-5678', 'Savings', 50000, 45000, 8000, 3000, 250, 'Active', '2024-01-31'],
  ['ACC-001235', 'CUST-5679', 'Current', 125000, 120000, 15000, 10000, 0, 'Active', '2024-01-31'],
  ['ACC-001236', 'CUST-5680', 'Fixed Deposit', 1000000, 1000000, 0, 0, 12500, 'Active', '2024-01-31'],
  ['ACC-001237', 'CUST-5681', 'Savings', 75000, 70000, 10000, 5000, 300, 'Active', '2024-01-31'],
  ['ACC-001238', 'CUST-5682', 'Current', 200000, 180000, 30000, 10000, 0, 'Active', '2024-01-31'],
  ['ACC-001239', 'CUST-5683', 'Savings', 35000, 30000, 6000, 1000, 180, 'Active', '2024-01-31'],
  ['ACC-001240', 'CUST-5684', 'Fixed Deposit', 500000, 500000, 0, 0, 6250, 'Active', '2024-01-31'],
  ['ACC-001241', 'CUST-5685', 'Current', 95000, 90000, 12000, 7000, 0, 'Active', '2024-01-31'],
  ['ACC-001242', 'CUST-5686', 'Savings', 60000, 55000, 9000, 4000, 220, 'Active', '2024-01-31'],
  ['ACC-001243', 'CUST-5687', 'Fixed Deposit', 750000, 750000, 0, 0, 9375, 'Active', '2024-01-31']
]
const ws1 = XLSX.utils.aoa_to_sheet(sampleData)
const wb1 = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb1, ws1, 'Monthly Returns')
XLSX.writeFile(wb1, join(publicAssetsDir, 'Sample_Monthly_Returns.xlsx'))

const quarterlyData = [
  ['Period', 'Total_Deposits', 'Total_Withdrawals', 'Net_Deposits', 'Interest_Expense', 'Average_Balance', 'Account_Growth', 'Compliance_Score'],
  ['Q4 2023', 850000000, 620000000, 230000000, 12500000, 2850000000, 8.5, 92],
  ['Q3 2023', 780000000, 580000000, 200000000, 11800000, 2620000000, 7.2, 89],
  ['Q2 2023', 720000000, 550000000, 170000000, 11200000, 2450000000, 6.8, 87],
  ['Q1 2023', 680000000, 520000000, 160000000, 10800000, 2280000000, 6.5, 85]
]
const ws2 = XLSX.utils.aoa_to_sheet(quarterlyData)
const wb2 = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb2, ws2, 'Quarterly Returns')
XLSX.writeFile(wb2, join(publicAssetsDir, 'Sample_Quarterly_Returns.xlsx'))

const scvData = [
  ['Customer_ID', 'Customer_Name', 'Total_Accounts', 'Total_Balance', 'Account_Types', 'Largest_Account', 'Date_of_Birth', 'ID_Number', 'Contact_Address'],
  ['CUST-5678', 'John Moyo', 3, 450000, 'Savings, Current', 250000, '1980-05-15', '80-123456-A-01', '123 Main St, Harare'],
  ['CUST-5679', 'Sarah Chikwanda', 2, 280000, 'Savings, Fixed Deposit', 200000, '1985-08-22', '85-234567-B-02', '456 First Ave, Bulawayo'],
  ['CUST-5680', 'Michael Ndlovu', 1, 1250000, 'Fixed Deposit', 1250000, '1975-12-10', '75-345678-C-03', '789 Second St, Mutare'],
  ['CUST-5681', 'Patience Dube', 4, 680000, 'Savings, Current, Fixed Deposit', 400000, '1990-03-20', '90-456789-D-04', '321 Third Rd, Gweru'],
  ['CUST-5682', 'David Sibanda', 2, 320000, 'Savings, Current', 200000, '1988-07-14', '88-567890-E-05', '654 Fourth Ave, Masvingo'],
  ['CUST-5683', 'Grace Moyo', 3, 580000, 'Savings, Fixed Deposit', 350000, '1983-11-08', '83-678901-F-06', '987 Fifth St, Kwekwe'],
  ['CUST-5684', 'Tendai Makoni', 1, 950000, 'Fixed Deposit', 950000, '1978-09-30', '78-789012-G-07', '147 Sixth Ave, Chitungwiza'],
  ['CUST-5685', 'Blessing Nkomo', 2, 240000, 'Savings, Current', 150000, '1992-01-25', '92-890123-H-08', '258 Seventh St, Bindura'],
  ['CUST-5686', 'Faith Nyathi', 3, 420000, 'Savings, Fixed Deposit', 250000, '1987-06-18', '87-901234-I-09', '369 Eighth Rd, Victoria Falls'],
  ['CUST-5687', 'Hope Mhlongo', 2, 380000, 'Savings, Current', 220000, '1989-04-12', '89-012345-J-10', '741 Ninth Ave, Kariba']
]
const ws3 = XLSX.utils.aoa_to_sheet(scvData)
const wb3 = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb3, ws3, 'SCV Data')
XLSX.writeFile(wb3, join(publicAssetsDir, 'Sample_SCV_Data.xlsx'))

const balanceSheetData = [
  ['ASSETS', 'Amount'],
  ['Cash and Cash Equivalents', 450000000],
  ['Investment Securities', 1800000000],
  ['Loans and Advances', 2200000000],
  ['Fixed Assets', 150000000],
  ['Other Assets', 400000000],
  ['Total Assets', 5000000000],
  ['LIABILITIES', 'Amount'],
  ['Deposits from Customers', 2850000000],
  ['Borrowings', 800000000],
  ['Other Liabilities', 550000000],
  ['Total Liabilities', 4200000000],
  ['EQUITY', 'Amount'],
  ['Share Capital', 500000000],
  ['Retained Earnings', 250000000],
  ['Other Reserves', 50000000],
  ['Total Equity', 800000000],
  ['Total Liabilities and Equity', 5000000000]
]
const ws5 = XLSX.utils.aoa_to_sheet(balanceSheetData)
const wb5 = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb5, ws5, 'Balance Sheet')
XLSX.writeFile(wb5, join(publicAssetsDir, 'Sample_Balance_Sheet.xlsx'))

const incomeStatementData = [
  ['REVENUE', 'Amount'],
  ['Interest Income', 450000000],
  ['Non-Interest Income', 85000000],
  ['Total Income', 535000000],
  ['EXPENSES', 'Amount'],
  ['Interest Expense', 125000000],
  ['Operating Expenses', 180000000],
  ['Provision for Loan Losses', 35000000],
  ['Other Expenses', 25000000],
  ['Total Expenses', 365000000],
  ['NET INCOME', 170000000],
  ['DEPOSIT PROTECTION', 'Amount'],
  ['Total Insured Deposits', 2500000000],
  ['Premium Payable', 8500000],
  ['Non-Performing Loans', 85000000]
]
const ws6 = XLSX.utils.aoa_to_sheet(incomeStatementData)
const wb6 = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb6, ws6, 'Income Statement')
XLSX.writeFile(wb6, join(publicAssetsDir, 'Sample_Income_Statement.xlsx'))
