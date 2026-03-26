'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, BookOpen, Clock, UserX, ChevronRight } from 'lucide-react'
import { alerts } from '@/lib/mock-data'
import Link from 'next/link'

const typeIcons = {
  attendance: UserX,
  grade: BookOpen,
  engagement: Clock,
  behavior: AlertTriangle,
}

const typeColors = {
  attendance: 'bg-chart-4/10 text-chart-4',
  grade: 'bg-chart-1/10 text-chart-1',
  engagement: 'bg-chart-3/10 text-chart-3',
  behavior: 'bg-destructive/10 text-destructive',
}

export function AlertsPanel() {
  const activeAlerts = alerts.filter((alert) => !alert.acknowledged).slice(0, 4)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Early Warning Alerts</CardTitle>
          <CardDescription>Students requiring immediate attention</CardDescription>
        </div>
        <Link href="/risk">
          <Button variant="ghost" size="sm" className="gap-1">
            View all
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeAlerts.map((alert) => {
            const Icon = typeIcons[alert.type]
            return (
              <div
                key={alert.id}
                className="flex items-start gap-4 rounded-lg border border-border bg-secondary/50 p-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeColors[alert.type]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {alert.studentName}
                    </span>
                    <Badge
                      variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
