'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { performanceData } from '@/lib/mock-data'

export function PerformanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>
          Historical tracking of key performance indicators across the institution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                name="Attendance %"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-1)', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                name="Engagement %"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-2)', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="atRisk"
                name="At-Risk Students"
                stroke="var(--chart-4)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-4)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
