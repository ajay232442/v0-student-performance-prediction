'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Database,
  Server,
  Cloud,
  Shield,
  Zap,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Lock,
  Eye,
  FileText,
  Users,
  School,
  BookOpen,
  Activity,
  Wallet,
  Globe,
  Cpu,
  HardDrive,
  Network,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const dataSources = [
  {
    name: 'Student Information System',
    icon: Users,
    status: 'connected',
    lastSync: '2 minutes ago',
    records: '12,847',
    dataTypes: ['Demographics', 'Enrollment', 'Contact Info'],
  },
  {
    name: 'Learning Management System',
    icon: BookOpen,
    status: 'connected',
    lastSync: '5 minutes ago',
    records: '284,591',
    dataTypes: ['Assignments', 'Grades', 'Submissions'],
  },
  {
    name: 'Attendance System',
    icon: Clock,
    status: 'connected',
    lastSync: '1 minute ago',
    records: '1,247,832',
    dataTypes: ['Daily Attendance', 'Tardies', 'Absences'],
  },
  {
    name: 'Assessment Platform',
    icon: FileText,
    status: 'connected',
    lastSync: '15 minutes ago',
    records: '89,412',
    dataTypes: ['Test Scores', 'Benchmarks', 'Standards'],
  },
  {
    name: 'Financial Aid System',
    icon: Wallet,
    status: 'syncing',
    lastSync: 'In progress',
    records: '8,234',
    dataTypes: ['Aid Status', 'Economic Indicators'],
  },
  {
    name: 'External Demographics',
    icon: Globe,
    status: 'connected',
    lastSync: '1 hour ago',
    records: '12,847',
    dataTypes: ['Census Data', 'Community Metrics'],
  },
]

const pipelineSteps = [
  {
    name: 'Data Ingestion',
    description: 'Collect data from multiple sources via secure APIs',
    status: 'active',
    throughput: '2.4K records/sec',
    icon: Database,
  },
  {
    name: 'Data Validation',
    description: 'Verify data integrity and format compliance',
    status: 'active',
    throughput: '99.7% pass rate',
    icon: Shield,
  },
  {
    name: 'Transformation',
    description: 'Normalize and standardize data formats',
    status: 'active',
    throughput: '1.8K records/sec',
    icon: RefreshCw,
  },
  {
    name: 'Feature Engineering',
    description: 'Generate predictive features from raw data',
    status: 'active',
    throughput: '847 features',
    icon: Cpu,
  },
  {
    name: 'Model Inference',
    description: 'Generate predictions using ML ensemble',
    status: 'active',
    throughput: '94.2% accuracy',
    icon: Zap,
  },
  {
    name: 'Results Storage',
    description: 'Store predictions and insights securely',
    status: 'active',
    throughput: '45ms latency',
    icon: HardDrive,
  },
]

const securityFeatures = [
  {
    name: 'Data Encryption',
    description: 'AES-256 encryption at rest and in transit',
    status: 'active',
    icon: Lock,
  },
  {
    name: 'Access Control',
    description: 'Role-based permissions with MFA',
    status: 'active',
    icon: Shield,
  },
  {
    name: 'Audit Logging',
    description: 'Complete audit trail of all data access',
    status: 'active',
    icon: Eye,
  },
  {
    name: 'Data Anonymization',
    description: 'PII masking for analytics and reporting',
    status: 'active',
    icon: Users,
  },
]

const complianceStandards = [
  { name: 'FERPA', status: 'compliant', description: 'Family Educational Rights and Privacy Act' },
  { name: 'COPPA', status: 'compliant', description: 'Children\'s Online Privacy Protection Act' },
  { name: 'SOC 2 Type II', status: 'compliant', description: 'Service Organization Control' },
  { name: 'GDPR', status: 'compliant', description: 'General Data Protection Regulation' },
]

export default function DataFlowPage() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Data Flow & Integration"
          description="Real-time data pipeline status and integration overview"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Pipeline Status Overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <Activity className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pipeline Status</p>
                      <p className="text-lg font-semibold text-accent">Healthy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Records Processed</p>
                      <p className="text-lg font-semibold text-foreground">1.64M / day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/10">
                      <Clock className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Latency</p>
                      <p className="text-lg font-semibold text-foreground">45ms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-5/10">
                      <Shield className="h-5 w-5 text-chart-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Security Score</p>
                      <p className="text-lg font-semibold text-foreground">98/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="pipeline" className="space-y-4">
              <TabsList className="bg-secondary">
                <TabsTrigger value="pipeline">Data Pipeline</TabsTrigger>
                <TabsTrigger value="sources">Data Sources</TabsTrigger>
                <TabsTrigger value="security">Security & Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="pipeline" className="space-y-6">
                {/* Animated Pipeline Visualization */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Real-Time Data Pipeline</CardTitle>
                    <CardDescription>Live visualization of data flow through the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-2">
                      {pipelineSteps.map((step, index) => (
                        <div key={step.name} className="flex flex-1 items-center gap-2">
                          <div
                            className={`flex-1 rounded-lg border p-4 transition-all duration-300 ${
                              index === activeStep
                                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                : 'border-border bg-secondary'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                  index === activeStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                <step.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{step.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <Badge
                                variant="secondary"
                                className={index === activeStep ? 'bg-primary/20 text-primary' : ''}
                              >
                                {step.throughput}
                              </Badge>
                              {index === activeStep && (
                                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                          {index < pipelineSteps.length - 1 && (
                            <ArrowRight
                              className={`hidden h-5 w-5 shrink-0 lg:block ${
                                index === activeStep ? 'text-primary' : 'text-muted-foreground'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pipeline Metrics */}
                <div className="grid gap-4 lg:grid-cols-3">
                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Ingestion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">2,847</div>
                      <p className="text-sm text-muted-foreground">records/second</p>
                      <Progress value={78} className="mt-3" />
                      <p className="mt-1 text-xs text-muted-foreground">78% of capacity</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Processing Queue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">1,247</div>
                      <p className="text-sm text-muted-foreground">records pending</p>
                      <Progress value={12} className="mt-3" />
                      <p className="mt-1 text-xs text-muted-foreground">12% queue utilization</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-foreground">Error Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-accent">0.03%</div>
                      <p className="text-sm text-muted-foreground">validation failures</p>
                      <Progress value={3} className="mt-3" />
                      <p className="mt-1 text-xs text-muted-foreground">Well within tolerance</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sources" className="space-y-4">
                {/* Data Sources Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {dataSources.map((source) => (
                    <Card key={source.name} className="border-border bg-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                              <source.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{source.name}</p>
                              <p className="text-xs text-muted-foreground">{source.records} records</p>
                            </div>
                          </div>
                          <Badge
                            variant={source.status === 'connected' ? 'default' : 'secondary'}
                            className={
                              source.status === 'connected'
                                ? 'bg-accent/20 text-accent'
                                : source.status === 'syncing'
                                ? 'bg-chart-3/20 text-chart-3'
                                : ''
                            }
                          >
                            {source.status === 'connected' ? (
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                            ) : source.status === 'syncing' ? (
                              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                            ) : (
                              <AlertCircle className="mr-1 h-3 w-3" />
                            )}
                            {source.status}
                          </Badge>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Last Sync</span>
                            <span className="text-foreground">{source.lastSync}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {source.dataTypes.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Configure
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Integration Instructions */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Add New Data Source</CardTitle>
                    <CardDescription>Supported integration methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg border border-border bg-secondary p-4 text-center">
                        <Cloud className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 font-medium text-foreground">REST API</p>
                        <p className="text-xs text-muted-foreground">Secure API endpoints</p>
                      </div>
                      <div className="rounded-lg border border-border bg-secondary p-4 text-center">
                        <Database className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 font-medium text-foreground">Direct Database</p>
                        <p className="text-xs text-muted-foreground">Read-only connections</p>
                      </div>
                      <div className="rounded-lg border border-border bg-secondary p-4 text-center">
                        <FileText className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 font-medium text-foreground">File Import</p>
                        <p className="text-xs text-muted-foreground">CSV, Excel, JSON</p>
                      </div>
                      <div className="rounded-lg border border-border bg-secondary p-4 text-center">
                        <Network className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-2 font-medium text-foreground">Webhooks</p>
                        <p className="text-xs text-muted-foreground">Real-time events</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                {/* Security Features */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Security Framework</CardTitle>
                    <CardDescription>Multi-layered security protecting student data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {securityFeatures.map((feature) => (
                        <div key={feature.name} className="rounded-lg bg-secondary p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                              <feature.icon className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{feature.name}</p>
                              <Badge variant="secondary" className="mt-1 bg-accent/20 text-accent">
                                Active
                              </Badge>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Status */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Compliance Status</CardTitle>
                    <CardDescription>Regulatory compliance certifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {complianceStandards.map((standard) => (
                        <div
                          key={standard.name}
                          className="flex items-center gap-4 rounded-lg border border-accent/30 bg-accent/5 p-4"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                            <CheckCircle2 className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{standard.name}</p>
                            <p className="text-xs text-muted-foreground">{standard.description}</p>
                            <Badge variant="secondary" className="mt-1 bg-accent/20 text-accent">
                              Compliant
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Data Privacy Controls */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Data Privacy Controls</CardTitle>
                    <CardDescription>Configure data handling and retention policies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">Data Retention Period</p>
                            <p className="text-sm text-muted-foreground">How long data is stored</p>
                          </div>
                        </div>
                        <Badge variant="outline">7 Years</Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                        <div className="flex items-center gap-3">
                          <Eye className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">PII Masking</p>
                            <p className="text-sm text-muted-foreground">Automatic anonymization</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-accent/20 text-accent">
                          Enabled
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-foreground">Access Logging</p>
                            <p className="text-sm text-muted-foreground">Complete audit trail</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-accent/20 text-accent">
                          Enabled
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
