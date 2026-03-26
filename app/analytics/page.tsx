'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Layers,
  Database,
  Zap,
  Download,
  RefreshCw,
  Calendar,
} from 'lucide-react'
import { useState } from 'react'

// Performance prediction accuracy over time
const accuracyData = [
  { month: 'Jan', accuracy: 78, baseline: 65 },
  { month: 'Feb', accuracy: 82, baseline: 65 },
  { month: 'Mar', accuracy: 85, baseline: 65 },
  { month: 'Apr', accuracy: 84, baseline: 65 },
  { month: 'May', accuracy: 88, baseline: 65 },
  { month: 'Jun', accuracy: 91, baseline: 65 },
  { month: 'Jul', accuracy: 89, baseline: 65 },
  { month: 'Aug', accuracy: 92, baseline: 65 },
  { month: 'Sep', accuracy: 94, baseline: 65 },
]

// Feature importance data
const featureImportance = [
  { feature: 'Prior GPA', importance: 0.28 },
  { feature: 'Attendance Rate', importance: 0.22 },
  { feature: 'Assignment Completion', importance: 0.18 },
  { feature: 'LMS Engagement', importance: 0.12 },
  { feature: 'Socioeconomic Index', importance: 0.10 },
  { feature: 'Class Participation', importance: 0.06 },
  { feature: 'Peer Interactions', importance: 0.04 },
]

// Model performance comparison
const modelComparison = [
  { model: 'Random Forest', precision: 0.89, recall: 0.86, f1: 0.87, auc: 0.92 },
  { model: 'XGBoost', precision: 0.91, recall: 0.88, f1: 0.89, auc: 0.94 },
  { model: 'Neural Network', precision: 0.93, recall: 0.91, f1: 0.92, auc: 0.96 },
  { model: 'Ensemble', precision: 0.94, recall: 0.92, f1: 0.93, auc: 0.97 },
]

// Student outcome distribution
const outcomeDistribution = [
  { score: '90-100', predicted: 245, actual: 238, category: 'Excellent' },
  { score: '80-89', predicted: 412, actual: 425, category: 'Good' },
  { score: '70-79', predicted: 356, actual: 348, category: 'Average' },
  { score: '60-69', predicted: 189, actual: 195, category: 'Below Average' },
  { score: '< 60', predicted: 45, actual: 41, category: 'At Risk' },
]

// Intervention effectiveness
const interventionEffectiveness = [
  { name: 'Tutoring', success: 78, partial: 15, noEffect: 7 },
  { name: 'Mentorship', success: 72, partial: 20, noEffect: 8 },
  { name: 'Study Groups', success: 65, partial: 25, noEffect: 10 },
  { name: 'Parent Outreach', success: 58, partial: 28, noEffect: 14 },
  { name: 'Counseling', success: 82, partial: 12, noEffect: 6 },
]

// Radar chart data for multi-dimensional analysis
const radarData = [
  { metric: 'Academic', current: 85, previous: 78, target: 90 },
  { metric: 'Attendance', current: 92, previous: 88, target: 95 },
  { metric: 'Engagement', current: 76, previous: 70, target: 85 },
  { metric: 'Social', current: 68, previous: 65, target: 80 },
  { metric: 'Emotional', current: 72, previous: 68, target: 85 },
  { metric: 'Behavioral', current: 88, previous: 82, target: 90 },
]

// Correlation matrix data
const correlationData = [
  { x: 'GPA', y: 'Attendance', value: 0.78 },
  { x: 'GPA', y: 'Engagement', value: 0.65 },
  { x: 'GPA', y: 'SES', value: 0.42 },
  { x: 'Attendance', y: 'Engagement', value: 0.71 },
  { x: 'Attendance', y: 'SES', value: 0.38 },
  { x: 'Engagement', y: 'SES', value: 0.29 },
]

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('semester')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Predictive Analytics"
          description="AI model performance, feature analysis, and outcome predictions"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="semester">This Semester</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Real-time
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Model Performance Summary */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Model Accuracy</p>
                      <p className="text-2xl font-bold text-foreground">94.2%</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-accent">
                    <TrendingUp className="h-3 w-3" />
                    <span>+2.3% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Predictions Made</p>
                      <p className="text-2xl font-bold text-foreground">12,847</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                      <Brain className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-accent">
                    <TrendingUp className="h-3 w-3" />
                    <span>+847 this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Data Sources</p>
                      <p className="text-2xl font-bold text-foreground">8</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
                      <Database className="h-6 w-6 text-chart-3" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <span>All sources synced</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Models</p>
                      <p className="text-2xl font-bold text-foreground">4</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-5/10">
                      <Layers className="h-6 w-6 text-chart-5" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <span>Ensemble selected</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Analytics Tabs */}
            <Tabs defaultValue="accuracy" className="space-y-4">
              <TabsList className="bg-secondary">
                <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
                <TabsTrigger value="features">Feature Analysis</TabsTrigger>
                <TabsTrigger value="outcomes">Outcome Predictions</TabsTrigger>
                <TabsTrigger value="interventions">Intervention Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="accuracy" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Accuracy Over Time */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Prediction Accuracy Trend</CardTitle>
                      <CardDescription>Model accuracy vs baseline over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={accuracyData}>
                            <defs>
                              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 100]} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="accuracy"
                              stroke="hsl(var(--chart-1))"
                              fill="url(#colorAccuracy)"
                              strokeWidth={2}
                              name="AI Model"
                            />
                            <Line
                              type="monotone"
                              dataKey="baseline"
                              stroke="hsl(var(--muted-foreground))"
                              strokeDasharray="5 5"
                              strokeWidth={2}
                              name="Baseline"
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Model Comparison */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Model Performance Comparison</CardTitle>
                      <CardDescription>Precision, Recall, F1, and AUC scores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={modelComparison} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis type="number" domain={[0, 1]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis dataKey="model" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                              formatter={(value: number) => (value * 100).toFixed(1) + '%'}
                            />
                            <Legend />
                            <Bar dataKey="precision" fill="hsl(var(--chart-1))" name="Precision" />
                            <Bar dataKey="recall" fill="hsl(var(--chart-2))" name="Recall" />
                            <Bar dataKey="f1" fill="hsl(var(--chart-3))" name="F1 Score" />
                            <Bar dataKey="auc" fill="hsl(var(--chart-5))" name="AUC" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Feature Importance */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Feature Importance</CardTitle>
                      <CardDescription>Relative importance of predictive factors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={featureImportance} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis type="number" domain={[0, 0.3]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={130} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                              formatter={(value: number) => (value * 100).toFixed(1) + '%'}
                            />
                            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                              {featureImportance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Multi-dimensional Radar */}
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Multi-Dimensional Analysis</CardTitle>
                      <CardDescription>Current vs previous period performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                            <Radar
                              name="Current"
                              dataKey="current"
                              stroke="hsl(var(--chart-1))"
                              fill="hsl(var(--chart-1))"
                              fillOpacity={0.3}
                            />
                            <Radar
                              name="Previous"
                              dataKey="previous"
                              stroke="hsl(var(--chart-2))"
                              fill="hsl(var(--chart-2))"
                              fillOpacity={0.2}
                            />
                            <Radar
                              name="Target"
                              dataKey="target"
                              stroke="hsl(var(--muted-foreground))"
                              strokeDasharray="5 5"
                              fill="none"
                            />
                            <Legend />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Correlation Insights */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Key Correlation Insights</CardTitle>
                    <CardDescription>Relationships between predictive factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {correlationData.map((item, index) => (
                        <div key={index} className="rounded-lg bg-secondary p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {item.x} - {item.y}
                            </span>
                            <Badge
                              variant={item.value > 0.7 ? 'default' : item.value > 0.5 ? 'secondary' : 'outline'}
                              className={item.value > 0.7 ? 'bg-accent text-accent-foreground' : ''}
                            >
                              {item.value > 0.7 ? 'Strong' : item.value > 0.5 ? 'Moderate' : 'Weak'}
                            </Badge>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-foreground">{(item.value * 100).toFixed(0)}%</p>
                          <div className="mt-2 h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="outcomes" className="space-y-4">
                {/* Outcome Distribution */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Predicted vs Actual Outcomes</CardTitle>
                    <CardDescription>Distribution of student performance predictions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={outcomeDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="score" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                          <Legend />
                          <Bar dataKey="predicted" fill="hsl(var(--chart-1))" name="Predicted" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Actual" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Outcome Categories */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {outcomeDistribution.map((item, index) => (
                    <Card key={index} className="border-border bg-card">
                      <CardContent className="p-4">
                        <p className="text-sm font-medium text-muted-foreground">{item.category}</p>
                        <p className="text-2xl font-bold text-foreground">{item.actual}</p>
                        <p className="text-xs text-muted-foreground">
                          Score: {item.score}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs">
                          {item.predicted > item.actual ? (
                            <>
                              <TrendingDown className="h-3 w-3 text-chart-4" />
                              <span className="text-chart-4">{item.predicted - item.actual} below prediction</span>
                            </>
                          ) : (
                            <>
                              <TrendingUp className="h-3 w-3 text-accent" />
                              <span className="text-accent">{item.actual - item.predicted} above prediction</span>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="interventions" className="space-y-4">
                {/* Intervention Effectiveness */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Intervention Effectiveness Analysis</CardTitle>
                    <CardDescription>Success rates by intervention type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={interventionEffectiveness}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                            formatter={(value: number) => value + '%'}
                          />
                          <Legend />
                          <Bar dataKey="success" stackId="a" fill="hsl(var(--chart-2))" name="Success" />
                          <Bar dataKey="partial" stackId="a" fill="hsl(var(--chart-3))" name="Partial Effect" />
                          <Bar dataKey="noEffect" stackId="a" fill="hsl(var(--chart-4))" name="No Effect" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Intervention Recommendations */}
                <div className="grid gap-4 lg:grid-cols-3">
                  <Card className="border-accent/30 bg-accent/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                          <Target className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Counseling</p>
                          <p className="text-sm text-muted-foreground">Highest success rate</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Success Rate</span>
                          <span className="font-medium text-accent">82%</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[82%] rounded-full bg-accent" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Tutoring</p>
                          <p className="text-sm text-muted-foreground">Most commonly applied</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Success Rate</span>
                          <span className="font-medium text-primary">78%</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div className="h-2 w-[78%] rounded-full bg-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-chart-3/30 bg-chart-3/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/20">
                          <Zap className="h-5 w-5 text-chart-3" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">AI Recommendation</p>
                          <p className="text-sm text-muted-foreground">Best ROI intervention</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          For current at-risk cohort, counseling combined with tutoring shows 91% improvement rate.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
