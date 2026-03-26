'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FileText,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Filter,
  BarChart2,
  PieChart,
  TrendingUp,
  Users,
  School,
  FileSpreadsheet,
  Mail,
  Printer,
} from 'lucide-react'
import { useState } from 'react'

const reportTemplates = [
  {
    id: 1,
    name: 'Student Risk Summary',
    description: 'Overview of at-risk students with intervention recommendations',
    type: 'risk',
    icon: AlertCircle,
    lastGenerated: '2 hours ago',
    frequency: 'Weekly',
  },
  {
    id: 2,
    name: 'Performance Analytics',
    description: 'Detailed performance metrics and trend analysis',
    type: 'analytics',
    icon: BarChart2,
    lastGenerated: 'Yesterday',
    frequency: 'Monthly',
  },
  {
    id: 3,
    name: 'Intervention Effectiveness',
    description: 'Analysis of intervention outcomes and success rates',
    type: 'interventions',
    icon: TrendingUp,
    lastGenerated: '3 days ago',
    frequency: 'Monthly',
  },
  {
    id: 4,
    name: 'District Overview',
    description: 'High-level summary for district administrators',
    type: 'summary',
    icon: School,
    lastGenerated: '1 week ago',
    frequency: 'Quarterly',
  },
  {
    id: 5,
    name: 'Student Demographics',
    description: 'Demographic breakdown with performance correlations',
    type: 'demographics',
    icon: PieChart,
    lastGenerated: '5 days ago',
    frequency: 'Semester',
  },
  {
    id: 6,
    name: 'Attendance Patterns',
    description: 'Attendance trends and early warning indicators',
    type: 'attendance',
    icon: Calendar,
    lastGenerated: '1 day ago',
    frequency: 'Weekly',
  },
]

const recentReports = [
  {
    id: 1,
    name: 'Q1 District Risk Report',
    template: 'Student Risk Summary',
    generatedAt: '2024-03-15 09:30 AM',
    generatedBy: 'Dr. Sarah Johnson',
    status: 'completed',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'February Performance Review',
    template: 'Performance Analytics',
    generatedAt: '2024-03-14 02:15 PM',
    generatedBy: 'Principal Mike Chen',
    status: 'completed',
    size: '4.1 MB',
  },
  {
    id: 3,
    name: 'Intervention Q1 Summary',
    template: 'Intervention Effectiveness',
    generatedAt: '2024-03-13 11:00 AM',
    generatedBy: 'Counselor Amy Williams',
    status: 'completed',
    size: '1.8 MB',
  },
  {
    id: 4,
    name: 'Spring Attendance Analysis',
    template: 'Attendance Patterns',
    generatedAt: '2024-03-12 04:45 PM',
    generatedBy: 'Admin Assistant',
    status: 'processing',
    size: '-',
  },
]

const scheduledReports = [
  {
    id: 1,
    name: 'Weekly Risk Alert',
    template: 'Student Risk Summary',
    schedule: 'Every Monday at 7:00 AM',
    recipients: ['principals@district.edu', 'counselors@district.edu'],
    nextRun: 'Mar 18, 2024',
    status: 'active',
  },
  {
    id: 2,
    name: 'Monthly Performance Digest',
    template: 'Performance Analytics',
    schedule: '1st of every month',
    recipients: ['superintendent@district.edu'],
    nextRun: 'Apr 1, 2024',
    status: 'active',
  },
  {
    id: 3,
    name: 'Daily Attendance Alert',
    template: 'Attendance Patterns',
    schedule: 'Daily at 3:00 PM',
    recipients: ['attendance-team@district.edu'],
    nextRun: 'Tomorrow',
    status: 'paused',
  },
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof reportTemplates[0] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Reports & Export"
          description="Generate, schedule, and download analytics reports"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <FileText className="h-3 w-3" />
                  {recentReports.length} reports this week
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Generate New Report</DialogTitle>
                      <DialogDescription>
                        Select a template and configure your report options
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Report Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Date Range</Label>
                          <Select defaultValue="month">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="week">Last Week</SelectItem>
                              <SelectItem value="month">Last Month</SelectItem>
                              <SelectItem value="quarter">Last Quarter</SelectItem>
                              <SelectItem value="semester">This Semester</SelectItem>
                              <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Format</Label>
                          <Select defaultValue="pdf">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF Document</SelectItem>
                              <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                              <SelectItem value="csv">CSV File</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Scope</Label>
                        <Select defaultValue="district">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="district">Entire District</SelectItem>
                            <SelectItem value="school">Specific School</SelectItem>
                            <SelectItem value="grade">Grade Level</SelectItem>
                            <SelectItem value="class">Specific Class</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label>Include Sections</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="summary" defaultChecked />
                            <Label htmlFor="summary" className="text-sm font-normal">
                              Executive Summary
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="charts" defaultChecked />
                            <Label htmlFor="charts" className="text-sm font-normal">
                              Visual Charts
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="details" defaultChecked />
                            <Label htmlFor="details" className="text-sm font-normal">
                              Detailed Data
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="recommendations" defaultChecked />
                            <Label htmlFor="recommendations" className="text-sm font-normal">
                              AI Recommendations
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Report Templates */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Report Templates</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reportTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="group cursor-pointer border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                          <template.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{template.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {template.lastGenerated}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {template.frequency}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 transition-opacity group-hover:opacity-100">
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Recent Reports</CardTitle>
                    <CardDescription>Previously generated reports available for download</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Report Name</TableHead>
                      <TableHead className="text-muted-foreground">Template</TableHead>
                      <TableHead className="text-muted-foreground">Generated</TableHead>
                      <TableHead className="text-muted-foreground">By</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Size</TableHead>
                      <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {report.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{report.template}</TableCell>
                        <TableCell className="text-muted-foreground">{report.generatedAt}</TableCell>
                        <TableCell className="text-muted-foreground">{report.generatedBy}</TableCell>
                        <TableCell>
                          {report.status === 'completed' ? (
                            <Badge variant="secondary" className="bg-accent/20 text-accent">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-chart-3/20 text-chart-3">
                              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                              Processing
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{report.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" disabled={report.status !== 'completed'}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" disabled={report.status !== 'completed'}>
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" disabled={report.status !== 'completed'}>
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Scheduled Reports */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Scheduled Reports</CardTitle>
                    <CardDescription>Automated report generation and distribution</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Schedule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-secondary p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{report.name}</p>
                          <p className="text-sm text-muted-foreground">{report.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Next Run</p>
                          <p className="font-medium text-foreground">{report.nextRun}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Recipients</p>
                          <p className="font-medium text-foreground">{report.recipients.length} email(s)</p>
                        </div>
                        <Badge
                          variant={report.status === 'active' ? 'default' : 'secondary'}
                          className={report.status === 'active' ? 'bg-accent/20 text-accent' : ''}
                        >
                          {report.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Data Export</CardTitle>
                <CardDescription>Export raw data for external analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-auto flex-col gap-2 py-6">
                    <FileSpreadsheet className="h-8 w-8 text-accent" />
                    <span>Student Data</span>
                    <span className="text-xs text-muted-foreground">12,847 records</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 py-6">
                    <BarChart2 className="h-8 w-8 text-primary" />
                    <span>Performance Metrics</span>
                    <span className="text-xs text-muted-foreground">284,591 records</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 py-6">
                    <AlertCircle className="h-8 w-8 text-chart-4" />
                    <span>Risk Assessments</span>
                    <span className="text-xs text-muted-foreground">1,247 at-risk</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col gap-2 py-6">
                    <TrendingUp className="h-8 w-8 text-chart-3" />
                    <span>Interventions</span>
                    <span className="text-xs text-muted-foreground">892 active</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
