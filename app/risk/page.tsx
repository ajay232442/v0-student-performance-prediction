'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
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
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
} from 'lucide-react'
import { students, type Student } from '@/lib/mock-data'
import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'

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

function RiskFactorCard({ student }: { student: Student }) {
  const factors = [
    {
      name: 'Academic Performance',
      score: 100 - student.gpa * 25,
      icon: BookOpen,
      status: student.gpa < 2.0 ? 'critical' : student.gpa < 2.5 ? 'warning' : 'ok',
    },
    {
      name: 'Attendance Rate',
      score: 100 - student.attendance,
      icon: Clock,
      status: student.attendance < 75 ? 'critical' : student.attendance < 85 ? 'warning' : 'ok',
    },
    {
      name: 'Engagement Level',
      score: 100 - student.engagement,
      icon: CheckCircle,
      status: student.engagement < 50 ? 'critical' : student.engagement < 70 ? 'warning' : 'ok',
    },
    {
      name: 'Socioeconomic Factors',
      score:
        (student.socioeconomic.freeReducedLunch ? 20 : 0) +
        (student.socioeconomic.firstGeneration ? 15 : 0) +
        (student.socioeconomic.englishLearner ? 15 : 0),
      icon: AlertTriangle,
      status: 'info',
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{student.name}</CardTitle>
              <CardDescription>
                {student.grade} Grade | Last active: {student.lastActivity}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${riskColors[student.riskLevel]} border`}>
              {student.riskLevel}
            </Badge>
            <span className="text-2xl font-bold text-foreground">{student.riskScore}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Risk Factors */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Risk Factor Analysis</h4>
            {factors.map((factor) => (
              <div key={factor.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <factor.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{factor.name}</span>
                  </div>
                  <span
                    className={`font-medium ${
                      factor.status === 'critical'
                        ? 'text-destructive'
                        : factor.status === 'warning'
                        ? 'text-chart-3'
                        : factor.status === 'ok'
                        ? 'text-accent'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {Math.round(factor.score)}%
                  </span>
                </div>
                <Progress value={factor.score} className="h-1.5" />
              </div>
            ))}
          </div>

          {/* Subject Performance */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Subject Performance</h4>
            <div className="grid grid-cols-2 gap-2">
              {student.subjects.map((subject) => {
                const TrendIcon =
                  subject.trend === 'up'
                    ? TrendingUp
                    : subject.trend === 'down'
                    ? TrendingDown
                    : Minus
                return (
                  <div
                    key={subject.name}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
                  >
                    <span className="text-xs text-muted-foreground">{subject.name}</span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm font-medium ${
                          subject.grade < 60
                            ? 'text-destructive'
                            : subject.grade < 70
                            ? 'text-chart-3'
                            : 'text-foreground'
                        }`}
                      >
                        {subject.grade}%
                      </span>
                      <TrendIcon
                        className={`h-3 w-3 ${
                          subject.trend === 'up'
                            ? 'text-accent'
                            : subject.trend === 'down'
                            ? 'text-destructive'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active Interventions */}
          {student.interventions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Active Interventions</h4>
              <div className="flex flex-wrap gap-2">
                {student.interventions.map((intervention) => (
                  <Badge key={intervention} variant="secondary" className="text-xs">
                    {intervention}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              View Full Profile
            </Button>
            <Button size="sm" variant="outline">
              Add Intervention
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RiskAssessmentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<string>('all')
  const [gradeFilter, setGradeFilter] = useState<string>('all')

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === 'all' || student.riskLevel === riskFilter
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter
    return matchesSearch && matchesRisk && matchesGrade
  })

  const sortedStudents = [...filteredStudents].sort((a, b) => b.riskScore - a.riskScore)

  const riskCounts = {
    critical: students.filter((s) => s.riskLevel === 'critical').length,
    high: students.filter((s) => s.riskLevel === 'high').length,
    medium: students.filter((s) => s.riskLevel === 'medium').length,
    low: students.filter((s) => s.riskLevel === 'low').length,
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Risk Assessment"
          description="AI-powered student risk analysis and early warning system"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Risk Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(riskCounts).map(([level, count]) => (
                <Card
                  key={level}
                  className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 ${
                    riskFilter === level ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setRiskFilter(riskFilter === level ? 'all' : level)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm capitalize text-muted-foreground">{level} Risk</p>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                    </div>
                    <Badge className={`${riskColors[level as keyof typeof riskColors]} border`}>
                      {level}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="flex flex-wrap items-center gap-4 p-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Risk Level" />
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
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Grade Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9th">9th Grade</SelectItem>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </CardContent>
            </Card>

            {/* Student Risk Cards */}
            <div className="grid gap-6 lg:grid-cols-2">
              {sortedStudents.map((student) => (
                <RiskFactorCard key={student.id} student={student} />
              ))}
            </div>

            {sortedStudents.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">No students found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
