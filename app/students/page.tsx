'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  MoreHorizontal,
} from 'lucide-react'
import { students } from '@/lib/mock-data'
import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const riskColors = {
  low: 'bg-accent/10 text-accent border-accent/20',
  medium: 'bg-chart-3/10 text-chart-3 border-chart-3/20',
  high: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
  critical: 'bg-destructive/10 text-destructive border-destructive/20',
}

const trendIcons = {
  improving: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
}

const trendColors = {
  improving: 'text-accent',
  stable: 'text-muted-foreground',
  declining: 'text-destructive',
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<string>('all')
  const [gradeFilter, setGradeFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('riskScore')

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter
    return matchesSearch && matchesRisk && matchesGrade
  })

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'riskScore':
        return b.riskScore - a.riskScore
      case 'gpa':
        return a.gpa - b.gpa
      case 'attendance':
        return a.attendance - b.attendance
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Student Directory"
          description="Comprehensive view of all students and their performance metrics"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Summary Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{students.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Average GPA</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Needing Intervention</p>
                  <p className="text-2xl font-bold text-destructive">
                    {students.filter((s) => s.riskLevel === 'high' || s.riskLevel === 'critical').length}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="flex flex-wrap items-center gap-4 p-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-36">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9th">9th</SelectItem>
                    <SelectItem value="10th">10th</SelectItem>
                    <SelectItem value="11th">11th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riskScore">Risk Score</SelectItem>
                    <SelectItem value="gpa">GPA</SelectItem>
                    <SelectItem value="attendance">Attendance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardContent>
            </Card>

            {/* Students Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>
                  Showing {sortedStudents.length} of {students.length} students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStudents.map((student) => {
                      const TrendIcon = trendIcons[student.trend]
                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-foreground">{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell className={student.gpa < 2.0 ? 'text-destructive font-medium' : ''}>
                            {student.gpa.toFixed(1)}
                          </TableCell>
                          <TableCell className={student.attendance < 80 ? 'text-chart-3 font-medium' : ''}>
                            {student.attendance}%
                          </TableCell>
                          <TableCell className={student.engagement < 50 ? 'text-destructive font-medium' : ''}>
                            {student.engagement}%
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{student.riskScore}%</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${riskColors[student.riskLevel]} border`}>
                              {student.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-1 ${trendColors[student.trend]}`}>
                              <TrendIcon className="h-4 w-4" />
                              <span className="text-xs capitalize">{student.trend}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Contact Guardian
                                </DropdownMenuItem>
                                <DropdownMenuItem>Add Intervention</DropdownMenuItem>
                                <DropdownMenuItem>View History</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
