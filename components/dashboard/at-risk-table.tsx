'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TrendingDown, TrendingUp, Minus, ChevronRight } from 'lucide-react'
import { students } from '@/lib/mock-data'
import Link from 'next/link'

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

export function AtRiskTable() {
  const atRiskStudents = students
    .filter((s) => s.riskLevel === 'high' || s.riskLevel === 'critical')
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5)

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>At-Risk Students</CardTitle>
          <CardDescription>
            Students with high or critical risk scores requiring intervention
          </CardDescription>
        </div>
        <Link href="/students">
          <Button variant="ghost" size="sm" className="gap-1">
            View all students
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {atRiskStudents.map((student) => {
            const TrendIcon = trendIcons[student.trend]
            return (
              <div
                key={student.id}
                className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{student.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {student.grade}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>GPA: {student.gpa.toFixed(1)}</span>
                    <span>Attendance: {student.attendance}%</span>
                    <span>Engagement: {student.engagement}%</span>
                  </div>
                </div>

                <div className="w-32 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Risk Score</span>
                    <span className="font-medium text-foreground">{student.riskScore}%</span>
                  </div>
                  <Progress
                    value={student.riskScore}
                    className="h-2"
                  />
                </div>

                <Badge className={`${riskColors[student.riskLevel]} border`}>
                  {student.riskLevel}
                </Badge>

                <div className={`flex items-center gap-1 ${trendColors[student.trend]}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-xs capitalize">{student.trend}</span>
                </div>

                <Button variant="outline" size="sm">
                  Intervene
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
