# Depositors System - Bank Upload API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API uses demo/test IDs. In production, authentication will be implemented.

**Demo IDs for testing:**
- `DEMO_BANK_ID`: `cmhhc6y5t00001vxm3ek6lxgj`
- `DEMO_USER_ID`: `cmhhc6ya700021vxmri14apv5`

---

## Endpoints

### 1. Health Check

Check if the API server is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "Depositors System API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Upload Submission

Upload bank returns (Excel files) for processing and validation.

**Endpoint:** `POST /api/bank/submissions/upload`

**Content-Type:** `multipart/form-data`

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bankId` | String | Yes | Bank ID |
| `userId` | String | Yes | User ID who is uploading |
| `period` | String | Yes | Reporting period (format: `YYYY-MM` or `Q1-2024`) |
| `returnType` | String | Yes | Type of return (see Return Types below) |
| `files` | File[] | Yes | Excel files (.xlsx, .xls) - Max 10 files, 10MB each |

**Return Types:**
- `monthly` - Monthly Returns
- `quarterly` - Quarterly Returns
- `scv` - SCV Data (Single Customer View)
- `balance_sheet` - Balance Sheet
- `income_statement` - Income Statement

**Example Request (Postman):**
- Method: `POST`
- URL: `http://localhost:5000/api/bank/submissions/upload`
- Body Type: `form-data`
- Fields:
  - `bankId`: `cmhhc6y5t00001vxm3ek6lxgj`
  - `userId`: `cmhhc6ya700021vxmri14apv5`
  - `period`: `2024-01`
  - `returnType`: `balance_sheet`
  - `files`: [Select Excel file(s)]

**Success Response (200):**
```json
{
  "success": true,
  "submissionId": "cmhhcfa5m0001jk36qyzh6lrg",
  "status": "validated",
  "validation": {
    "status": "passed",
    "errors": 0,
    "warnings": 0,
    "details": [
      {
        "fileName": "Sample_Balance_Sheet.xlsx",
        "fileId": "cmhhcfa6b0003jk36va9c1k9e",
        "validation": {
          "valid": true,
          "errors": [],
          "warnings": [],
          "rowCount": 18,
          "headers": ["ASSETS", "Amount"]
        }
      }
    ]
  },
  "files": [
    {
      "id": "cmhhcfa6b0003jk36va9c1k9e",
      "fileName": "Sample_Balance_Sheet.xlsx",
      "fileSize": 17794
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Missing required fields: bankId, userId, period, returnType",
  "details": {
    "bankId": true,
    "userId": false,
    "period": true,
    "returnType": true
  }
}
```

**Error Response - File Issues (400):**
```json
{
  "error": "No files uploaded"
}
```

```json
{
  "error": "File too large",
  "message": "Maximum file size is 10MB"
}
```

---

### 3. Get All Submissions

Get all submissions from all banks with optional filtering.

**Endpoint:** `GET /api/bank/submissions/all`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bankId` | String | No | Filter by specific bank ID |
| `returnType` | String | No | Filter by return type |
| `status` | String | No | Filter by status (`pending`, `validated`, `approved`, `rejected`) |
| `period` | String | No | Filter by period (e.g., `2024-01` or `Q1-2024`) |

**Example Requests:**
- All submissions: `GET /api/bank/submissions/all`
- By status: `GET /api/bank/submissions/all?status=validated`
- By return type: `GET /api/bank/submissions/all?returnType=balance_sheet`
- Multiple filters: `GET /api/bank/submissions/all?status=validated&returnType=income_statement&period=2024-01`

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "submissions": [
    {
      "id": "cmhhcfa5m0001jk36qyzh6lrg",
      "bankId": "cmhhc6y5t00001vxm3ek6lxgj",
      "userId": "cmhhc6ya700021vxmri14apv5",
      "period": "2024-01",
      "returnType": "balance_sheet",
      "status": "validated",
      "submittedAt": "2024-01-15T10:30:00.000Z",
      "validatedAt": "2024-01-15T10:30:15.000Z",
      "approvedAt": null,
      "rejectedAt": null,
      "reviewerId": null,
      "comments": null,
      "bank": {
        "id": "cmhhc6y5t00001vxm3ek6lxgj",
        "bankName": "Test Bank",
        "bankCode": "TEST001"
      },
      "user": {
        "id": "cmhhc6ya700021vxmri14apv5",
        "name": "Test User",
        "email": "testuser@example.com",
        "role": "Uploader"
      },
      "files": [
        {
          "id": "cmhhcfa6b0003jk36va9c1k9e",
          "fileName": "Sample_Balance_Sheet.xlsx",
          "fileSize": 17794,
          "uploadedAt": "2024-01-15T10:30:00.000Z"
        }
      ],
      "validationResult": {
        "id": "cmhhcfa6b0004jk36va9c1k9f",
        "status": "passed",
        "errors": 0,
        "warnings": 0,
        "validatedAt": "2024-01-15T10:30:15.000Z"
      }
    }
  ]
}
```

---

### 4. Get Submissions by Bank

Get all submissions for a specific bank.

**Endpoint:** `GET /api/bank/submissions/bank/:bankId`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bankId` | String | Yes | Bank ID |

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `returnType` | String | No | Filter by return type |
| `status` | String | No | Filter by status |
| `period` | String | No | Filter by period |

**Example:**
`GET /api/bank/submissions/bank/cmhhc6y5t00001vxm3ek6lxgj?status=validated`

**Response (200):**
```json
[
  {
    "id": "...",
    "bankId": "...",
    "userId": "...",
    "period": "2024-01",
    "returnType": "balance_sheet",
    "status": "validated",
    "files": [...],
    "validationResult": {...},
    "user": {
      "name": "...",
      "email": "..."
    }
  }
]
```

---

### 5. Get Submission by ID

Get detailed information about a specific submission.

**Endpoint:** `GET /api/bank/submissions/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | Submission ID |

**Example:**
`GET /api/bank/submissions/cmhhcfa5m0001jk36qyzh6lrg`

**Response (200):**
```json
{
  "id": "cmhhcfa5m0001jk36qyzh6lrg",
  "bankId": "cmhhc6y5t00001vxm3ek6lxgj",
  "userId": "cmhhc6ya700021vxmri14apv5",
  "period": "2024-01",
  "returnType": "balance_sheet",
  "status": "validated",
  "submittedAt": "2024-01-15T10:30:00.000Z",
  "validatedAt": "2024-01-15T10:30:15.000Z",
  "files": [
    {
      "id": "...",
      "fileName": "...",
      "filePath": "...",
      "fileType": "xlsx",
      "fileSize": 17794,
      "uploadedAt": "..."
    }
  ],
  "validationResult": {
    "id": "...",
    "status": "passed",
    "errors": 0,
    "warnings": 0,
    "details": "[...]",
    "details_list": [
      {
        "id": "...",
        "field": "File Structure",
        "status": "valid",
        "message": "...",
        "rowNumber": null
      }
    ]
  },
  "bank": {
    "bankName": "Test Bank",
    "bankCode": "TEST001"
  },
  "user": {
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "Uploader"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Submission not found"
}
```

---

### 6. Download File

Download a file associated with a submission.

**Endpoint:** `GET /api/files/:fileId/download`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileId` | String | Yes | File ID (from submission files) |

**Example:**
`GET /api/files/cmhhcfa6b0003jk36va9c1k9e/download`

**Response:**
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (for .xlsx)
- Content-Disposition: `attachment; filename="Sample_Balance_Sheet.xlsx"`
- Body: File binary stream

**Error Response (404):**
```json
{
  "error": "File not found"
}
```

---

### 7. Approve Submission

Approve a submission (for reviewers/admins).

**Endpoint:** `PUT /api/bank/submissions/:id/approve`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | Submission ID |

**Request Body (JSON):**
```json
{
  "reviewerId": "reviewer-user-id",
  "comments": "All data validated and approved"
}
```

**Response (200):**
```json
{
  "success": true,
  "submission": {
    "id": "...",
    "status": "approved",
    "approvedAt": "2024-01-15T11:00:00.000Z",
    "reviewerId": "...",
    "comments": "...",
    ...
  }
}
```

---

### 8. Reject Submission

Reject a submission (for reviewers/admins).

**Endpoint:** `PUT /api/bank/submissions/:id/reject`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | Submission ID |

**Request Body (JSON):**
```json
{
  "reviewerId": "reviewer-user-id",
  "comments": "Required fields missing" // Required for rejection
}
```

**Response (200):**
```json
{
  "success": true,
  "submission": {
    "id": "...",
    "status": "rejected",
    "rejectedAt": "2024-01-15T11:00:00.000Z",
    "reviewerId": "...",
    "comments": "...",
    ...
  }
}
```

**Error Response (400):**
```json
{
  "error": "Comments are required for rejection"
}
```

---

### 9. Delete Submission

Delete a submission and its associated files.

**Endpoint:** `DELETE /api/bank/submissions/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | Submission ID |

**Response (200):**
```json
{
  "success": true,
  "message": "Submission deleted successfully"
}
```

---

### 10. Get All Banks

Get list of all banks.

**Endpoint:** `GET /api/banks`

**Response (200):**
```json
[
  {
    "id": "cmhhc6y5t00001vxm3ek6lxgj",
    "bankCode": "TEST001",
    "bankName": "Test Bank",
    "email": "testbank@example.com",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "_count": {
      "users": 1,
      "submissions": 5
    }
  }
]
```

---

### 11. Get Bank by ID

Get detailed information about a specific bank.

**Endpoint:** `GET /api/banks/:id`

**Response (200):**
```json
{
  "id": "...",
  "bankCode": "TEST001",
  "bankName": "Test Bank",
  "email": "testbank@example.com",
  "users": [...],
  "_count": {
    "submissions": 5
  }
}
```

---

### 12. Get Validation Result

Get validation result for a specific submission.

**Endpoint:** `GET /api/validations/submission/:submissionId`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `submissionId` | String | Yes | Submission ID |

**Response (200):**
```json
{
  "id": "...",
  "submissionId": "...",
  "status": "passed",
  "errors": 0,
  "warnings": 0,
  "details": "[...]",
  "validatedAt": "2024-01-15T10:30:15.000Z",
  "details_list": [
    {
      "id": "...",
      "field": "File Structure",
      "status": "valid",
      "message": "All required columns present",
      "rowNumber": null
    }
  ],
  "submission": {
    "id": "...",
    "period": "2024-01",
    "returnType": "balance_sheet",
    "bank": {
      "bankName": "Test Bank",
      "bankCode": "TEST001"
    }
  }
}
```

---

## Data Models

### Submission Status
- `pending` - Submission created but not yet validated
- `validated` - Files validated successfully
- `approved` - Submission approved by reviewer
- `rejected` - Submission rejected by reviewer

### Validation Status
- `passed` - All validations passed
- `failed` - Validation failed with errors
- `warning` - Validation passed but with warnings

### Return Types
- `monthly` - Monthly Returns
- `quarterly` - Quarterly Returns
- `scv` - SCV Data (Single Customer View)
- `balance_sheet` - Balance Sheet
- `income_statement` - Income Statement

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "message": "Additional details" // Optional
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error, missing fields)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

---

## File Upload Requirements

### Supported File Types
- `.xlsx` - Excel 2007+ format
- `.xls` - Excel 97-2003 format

### File Limits
- Maximum file size: **10MB per file**
- Maximum files per upload: **10 files**
- Maximum total upload size: **100MB** (10 files × 10MB)

### Required Columns by Return Type

#### Monthly Returns (`monthly`)
- `Account_Number`
- `Customer_ID`
- `Account_Type`
- `Balance`
- `Opening_Balance`
- `Deposits`
- `Withdrawals`
- `Interest_Paid`
- `Account_Status`
- `Date`

#### Quarterly Returns (`quarterly`)
- `Period`
- `Total_Deposits`
- `Total_Withdrawals`
- `Net_Deposits`
- `Interest_Expense`
- `Average_Balance`
- `Account_Growth`
- `Compliance_Score`

#### SCV Data (`scv`)
- `Customer_ID`
- `Customer_Name`
- `Total_Accounts`
- `Total_Balance`
- `Account_Types`
- `Largest_Account`
- `Date_of_Birth`
- `ID_Number`
- `Contact_Address`

#### Balance Sheet (`balance_sheet`)
- `ASSETS`
- `Amount`

#### Income Statement (`income_statement`)
- `REVENUE`
- `Amount`

---

## Example Integration Code (JavaScript/TypeScript)

### Upload Submission

```javascript
const uploadSubmission = async (bankId, userId, period, returnType, files) => {
  const formData = new FormData()
  formData.append('bankId', bankId)
  formData.append('userId', userId)
  formData.append('period', period)
  formData.append('returnType', returnType)
  
  // Append files
  files.forEach(file => {
    formData.append('files', file)
  })
  
  const response = await fetch('http://localhost:5000/api/bank/submissions/upload', {
    method: 'POST',
    body: formData
    // Don't set Content-Type - browser will set it with boundary
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Upload failed')
  }
  
  return await response.json()
}

// Usage
try {
  const result = await uploadSubmission(
    'cmhhc6y5t00001vxm3ek6lxgj',
    'cmhhc6ya700021vxmri14apv5',
    '2024-01',
    'balance_sheet',
    [file1, file2]
  )
  console.log('Upload successful:', result)
} catch (error) {
  console.error('Upload failed:', error.message)
}
```

### Get All Submissions

```javascript
const getAllSubmissions = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const response = await fetch(
    `http://localhost:5000/api/bank/submissions/all?${params.toString()}`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch submissions')
  }
  
  return await response.json()
}

// Usage
const submissions = await getAllSubmissions({
  status: 'validated',
  returnType: 'balance_sheet'
})
console.log(`Found ${submissions.count} submissions`)
```

### Download File

```javascript
const downloadFile = async (fileId, fileName) => {
  const response = await fetch(
    `http://localhost:5000/api/files/${fileId}/download`
  )
  
  if (!response.ok) {
    throw new Error('Failed to download file')
  }
  
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
```

---

## Testing with Postman Collection

### Collection Variables
- `baseUrl`: `http://localhost:5000/api`
- `bankId`: `cmhhc6y5t00001vxm3ek6lxgj`
- `userId`: `cmhhc6ya700021vxmri14apv5`

### Quick Test Checklist

1. ✅ Health Check: `GET {{baseUrl}}/health`
2. ✅ Upload File: `POST {{baseUrl}}/bank/submissions/upload`
3. ✅ Get All Submissions: `GET {{baseUrl}}/bank/submissions/all`
4. ✅ Get Submission by ID: `GET {{baseUrl}}/bank/submissions/:id`
5. ✅ Download File: `GET {{baseUrl}}/files/:fileId/download`

---

## Notes for Frontend Developers

1. **CORS**: Already configured to allow requests from `http://localhost:5173` (Vite default). Update if using different port.

2. **File Upload**: Use `FormData` and let the browser set the `Content-Type` header automatically (includes boundary for multipart/form-data).

3. **Error Handling**: Always check `response.ok` before parsing JSON. Error responses follow the format: `{ error: "...", message?: "..." }`.

4. **File Downloads**: Use blob response and create download link client-side.

5. **Polling**: For long-running validations, consider polling the submission status endpoint.

6. **Environment Variables**: Set `VITE_API_BASE_URL` in frontend `.env` file if API is on different host/port.

---

## Support

For issues or questions:
- Check server logs for detailed error messages
- Verify database connection and migrations are run
- Ensure Prisma Client is generated: `npm run prisma:generate`

