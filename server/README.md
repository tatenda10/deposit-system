# Depositors System - Bank Upload API Server

Node.js/Express API server with Prisma ORM for handling bank data uploads.

## Project Structure

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── submissionController.js
│   │   ├── bankController.js
│   │   ├── userController.js
│   │   └── validationController.js
│   ├── routes/          # API routes
│   │   ├── submissionRoutes.js
│   │   ├── bankRoutes.js
│   │   ├── userRoutes.js
│   │   └── validationRoutes.js
│   ├── services/        # Business logic
│   │   ├── submissionService.js
│   │   └── validationService.js
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/           # Utility functions
│   │   ├── fileUtils.js
│   │   └── response.js
│   ├── config/           # Configuration
│   │   └── constants.js
│   └── index.js         # Server entry point
├── prisma/
│   └── schema.prisma    # Database schema
└── uploads/             # Uploaded files storage
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env`
- Update `DATABASE_URL` and `JWT_SECRET` as needed

3. Initialize Prisma:
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Submissions
- `POST /api/bank/submissions/upload` - Upload bank returns (Excel files)
- `GET /api/bank/submissions/:id` - Get submission details
- `GET /api/bank/submissions/bank/:bankId` - List submissions for a bank
- `PUT /api/bank/submissions/:id/approve` - Approve submission
- `PUT /api/bank/submissions/:id/reject` - Reject submission
- `DELETE /api/bank/submissions/:id` - Delete submission

### Banks
- `GET /api/banks` - Get all banks
- `GET /api/banks/:id` - Get bank by ID
- `POST /api/banks` - Create bank
- `PUT /api/banks/:id` - Update bank
- `DELETE /api/banks/:id` - Delete bank

### Users
- `GET /api/users/bank/:bankId` - Get users for a bank
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Validations
- `GET /api/validations` - Get all validation results
- `GET /api/validations/submission/:submissionId` - Get validation result for submission

## Upload Request Example

**POST /api/bank/submissions/upload**
- `Content-Type: multipart/form-data`
- Fields:
  - `bankId` (string, required)
  - `userId` (string, required)
  - `period` (string, required) - e.g., "2024-01" or "Q4-2023"
  - `returnType` (string, required) - one of: `monthly`, `quarterly`, `scv`, `balance_sheet`, `income_statement`
  - `files` (file[], required) - Excel files (.xlsx, .xls)

**Response:**
```json
{
  "success": true,
  "submissionId": "...",
  "status": "validated",
  "validation": {
    "status": "passed",
    "errors": 0,
    "warnings": 2,
    "details": [...]
  },
  "files": [...]
}
```

## Database Schema

- **Bank**: Bank information
- **User**: Bank users (Uploader, Reviewer, Approver roles)
- **Submission**: Bank data submission records
- **SubmissionFile**: Uploaded files
- **ValidationResult**: File validation results
- **ValidationDetail**: Individual validation errors/warnings

## Supported Return Types

1. **monthly** - Monthly Returns (deposit accounts data)
2. **quarterly** - Quarterly Returns (consolidated quarterly data)
3. **scv** - Single Customer View (depositor-level aggregated data)
4. **balance_sheet** - Balance Sheet (assets, liabilities, equity) - Separate upload
5. **income_statement** - Income Statement (revenue, expenses, net income) - Separate upload

## File Validation

The API validates:
- File format (Excel only)
- Required columns for each return type
- Data structure and completeness
- File size (max 10MB per file)
- File count (max 10 files per submission)

