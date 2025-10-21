import React, { useState } from 'react'
import { Card, Badge, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Alert } from 'flowbite-react'
import { FileText, Download, Eye, CheckCircle, XCircle, Clock, Filter, Search, Calendar } from 'lucide-react'

const sampleReturns = [
  {
    id: 1,
    bankName: "CBZ Bank Limited",
    bankCode: "CBZ",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-15",
    dueDate: "2024-01-20",
    status: "Pending Review",
    validationStatus: "Passed",
    remarks: "All data validated successfully",
    fileSize: "2.4 MB",
    submittedBy: "John Smith",
    priority: "High"
  },
  {
    id: 2,
    bankName: "Standard Chartered Bank Zimbabwe",
    bankCode: "SCB",
    returnType: "Quarterly Returns",
    submissionDate: "2024-01-14",
    dueDate: "2024-01-25",
    status: "Approved",
    validationStatus: "Passed",
    remarks: "Complete and accurate submission",
    fileSize: "3.1 MB",
    submittedBy: "Sarah Johnson",
    priority: "Medium"
  },
  {
    id: 3,
    bankName: "FBC Bank Limited",
    bankCode: "FBC",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-13",
    dueDate: "2024-01-18",
    status: "Rejected",
    validationStatus: "Failed",
    remarks: "Missing required fields in section 3",
    fileSize: "1.8 MB",
    submittedBy: "Mike Chen",
    priority: "High"
  },
  {
    id: 4,
    bankName: "NMB Bank Limited",
    bankCode: "NMB",
    returnType: "Annual Returns",
    submissionDate: "2024-01-12",
    dueDate: "2024-01-30",
    status: "Under Review",
    validationStatus: "Warning",
    remarks: "Minor discrepancies in calculation",
    fileSize: "4.2 MB",
    submittedBy: "Emily Davis",
    priority: "Low"
  },
  {
    id: 5,
    bankName: "Zimbabwe Building Society",
    bankCode: "ZBS",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-11",
    dueDate: "2024-01-16",
    status: "Overdue",
    validationStatus: "Failed",
    remarks: "Submission past due date",
    fileSize: "2.1 MB",
    submittedBy: "David Wilson",
    priority: "Critical"
  }
]

export default function ReturnsInbox() {
  const [selectedReturns, setSelectedReturns] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success'
      case 'Pending Review': return 'warning'
      case 'Under Review': return 'info'
      case 'Rejected': return 'failure'
      case 'Overdue': return 'failure'
      default: return 'gray'
    }
  }

  const getValidationColor = (status) => {
    switch (status) {
      case 'Passed': return 'success'
      case 'Failed': return 'failure'
      case 'Warning': return 'warning'
      default: return 'gray'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'red'
      case 'High': return 'orange'
      case 'Medium': return 'yellow'
      case 'Low': return 'green'
      default: return 'gray'
    }
  }

  const filteredReturns = sampleReturns.filter(returnItem => {
    const matchesStatus = filterStatus === 'All' || returnItem.status === filterStatus
    const matchesSearch = returnItem.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.returnType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleSelectReturn = (returnId) => {
    setSelectedReturns(prev => 
      prev.includes(returnId) 
        ? prev.filter(id => id !== returnId)
        : [...prev, returnId]
    )
  }

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for returns:`, selectedReturns)
    // Implement bulk actions here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Returns Inbox</h1>
            <p className="text-gray-600">Manage and review bank return submissions</p>
          </div>
          <div className="flex gap-2">
            <Button color="blue" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button color="green" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Returns</h3>
              <p className="text-2xl font-bold text-blue-600">{sampleReturns.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pending Review</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {sampleReturns.filter(r => r.status === 'Pending Review').length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
              <p className="text-2xl font-bold text-green-600">
                {sampleReturns.filter(r => r.status === 'Approved').length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Overdue</h3>
              <p className="text-2xl font-bold text-red-600">
                {sampleReturns.filter(r => r.status === 'Overdue').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Alert color="warning">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>2 returns are approaching their due date</span>
        </div>
      </Alert>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search banks or return types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          {selectedReturns.length > 0 && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                color="green"
                onClick={() => handleBulkAction('approve')}
              >
                Approve Selected
              </Button>
              <Button 
                size="sm" 
                color="red"
                onClick={() => handleBulkAction('reject')}
              >
                Reject Selected
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Returns Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell className="w-4">
                  <input
                    type="checkbox"
                    className="rounded"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReturns(filteredReturns.map(r => r.id))
                      } else {
                        setSelectedReturns([])
                      }
                    }}
                  />
                </TableHeadCell>
                <TableHeadCell>Bank</TableHeadCell>
                <TableHeadCell>Return Type</TableHeadCell>
                <TableHeadCell>Submission Date</TableHeadCell>
                <TableHeadCell>Due Date</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Validation</TableHeadCell>
                <TableHeadCell>Priority</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {filteredReturns.map((returnItem) => (
                <TableRow key={returnItem.id} className="bg-white hover:bg-gray-50">
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedReturns.includes(returnItem.id)}
                      onChange={() => handleSelectReturn(returnItem.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{returnItem.bankName}</div>
                      <div className="text-sm text-gray-500">{returnItem.bankCode}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-gray-900">{returnItem.returnType}</div>
                    <div className="text-xs text-gray-500">{returnItem.fileSize}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{returnItem.submissionDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{returnItem.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(returnItem.status)}>
                      {returnItem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={getValidationColor(returnItem.validationStatus)}>
                      {returnItem.validationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={getPriorityColor(returnItem.priority)}>
                      {returnItem.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="xs" color="blue">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="xs" color="green">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="xs" color="red">
                        <XCircle className="h-3 w-3" />
                      </Button>
                      <Button size="xs" color="gray">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Remarks Section */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Remarks</h3>
        <div className="space-y-3">
          {sampleReturns.slice(0, 3).map((returnItem) => (
            <div key={returnItem.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{returnItem.bankName}</p>
                  <p className="text-xs text-gray-500">{returnItem.remarks}</p>
                </div>
                <Badge color={getStatusColor(returnItem.status)}>
                  {returnItem.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
