'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, AlertTriangle, Brain, Database, TrendingUp, TrendingDown } from 'lucide-react'
import { systemMetrics } from '@/lib/mock-data'

const stats = [
  {
    name: 'Total Students',
    value: systemMetrics.totalStudents.toLocaleString(),
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'Across all institutions',
  },
  {
    name: 'Active Alerts',
    value: systemMetrics.activeAlerts.toString(),
    change: '+5',
    changeType: 'negative' as const,
    icon: AlertTriangle,
    description: 'Requiring attention',
  },
  {
    name: 'Model Accuracy',
    value: `${systemMetrics.modelAccuracy}%`,
    change: '+2.1%',
    changeType: 'positive' as const,
    icon: Brain,
    description: 'Prediction accuracy',
  },
  {
    name: 'Data Sources',
    value: systemMetrics.dataSourcesConnected.toString(),
    change: 'Connected',
    changeType: 'neutral' as const,
    icon: Database,
    description: 'Active integrations',
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-accent'
                    : stat.changeType === 'negative'
                    ? 'text-destructive'
                    : 'text-muted-foreground'
                }`}
              >
                {stat.changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
                {stat.changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.name}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
