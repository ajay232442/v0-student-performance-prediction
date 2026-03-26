'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Database,
  Cloud,
  Server,
  Lock,
  Zap,
  Globe,
  GitBranch,
  Layers,
  ArrowRight,
  Shield,
  RefreshCcw,
  Cpu,
  HardDrive,
  Network,
  FileJson,
  BarChart3,
  Bell,
} from 'lucide-react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'

const architectureLayers = [
  {
    name: 'Data Sources',
    icon: Database,
    color: 'bg-chart-1/10 text-chart-1 border-chart-1/30',
    components: [
      { name: 'Learning Management System', type: 'LMS', status: 'connected' },
      { name: 'Student Information System', type: 'SIS', status: 'connected' },
      { name: 'Attendance Tracking', type: 'External', status: 'connected' },
      { name: 'Assessment Platform', type: 'API', status: 'connected' },
      { name: 'Socioeconomic Data', type: 'Secure', status: 'encrypted' },
    ],
  },
  {
    name: 'Data Ingestion',
    icon: Zap,
    color: 'bg-chart-2/10 text-chart-2 border-chart-2/30',
    components: [
      { name: 'Real-time Stream Processor', type: 'Kafka', status: 'active' },
      { name: 'Batch ETL Pipeline', type: 'Apache Spark', status: 'scheduled' },
      { name: 'Data Validation Layer', type: 'Schema Validation', status: 'active' },
      { name: 'Anonymization Service', type: 'Privacy', status: 'active' },
    ],
  },
  {
    name: 'Storage & Processing',
    icon: HardDrive,
    color: 'bg-chart-3/10 text-chart-3 border-chart-3/30',
    components: [
      { name: 'Data Warehouse', type: 'Snowflake', status: 'primary' },
      { name: 'Feature Store', type: 'Redis', status: 'cache' },
      { name: 'Time-Series DB', type: 'InfluxDB', status: 'metrics' },
      { name: 'Document Store', type: 'MongoDB', status: 'profiles' },
    ],
  },
  {
    name: 'ML Engine',
    icon: Cpu,
    color: 'bg-primary/10 text-primary border-primary/30',
    components: [
      { name: 'Risk Prediction Model', type: 'XGBoost', status: 'v2.3' },
      { name: 'Intervention Recommender', type: 'Neural Network', status: 'v1.8' },
      { name: 'Anomaly Detection', type: 'Isolation Forest', status: 'v1.2' },
      { name: 'Model Registry', type: 'MLflow', status: 'active' },
    ],
  },
  {
    name: 'API Gateway',
    icon: Network,
    color: 'bg-chart-5/10 text-chart-5 border-chart-5/30',
    components: [
      { name: 'REST API', type: 'GraphQL', status: 'v3.0' },
      { name: 'WebSocket Server', type: 'Real-time', status: 'active' },
      { name: 'Rate Limiting', type: 'Protection', status: 'active' },
      { name: 'Auth Service', type: 'OAuth 2.0', status: 'secure' },
    ],
  },
]

const dataFlowSteps = [
  {
    step: 1,
    title: 'Data Collection',
    description: 'Aggregate data from LMS, SIS, and external sources via secure APIs',
    icon: Database,
    details: ['API integrations', 'Webhook listeners', 'Scheduled batch imports'],
  },
  {
    step: 2,
    title: 'Processing & Validation',
    description: 'Clean, validate, and transform incoming data streams',
    icon: RefreshCcw,
    details: ['Schema validation', 'Data normalization', 'Duplicate detection'],
  },
  {
    step: 3,
    title: 'Feature Engineering',
    description: 'Extract and compute predictive features from raw data',
    icon: Layers,
    details: ['Historical aggregations', 'Trend calculations', 'Risk indicators'],
  },
  {
    step: 4,
    title: 'ML Prediction',
    description: 'Run predictive models to generate risk scores and recommendations',
    icon: Cpu,
    details: ['Risk scoring', 'Intervention matching', 'Anomaly detection'],
  },
  {
    step: 5,
    title: 'Alert Generation',
    description: 'Generate real-time alerts based on prediction thresholds',
    icon: Bell,
    details: ['Threshold monitoring', 'Priority classification', 'Notification routing'],
  },
  {
    step: 6,
    title: 'Dashboard Delivery',
    description: 'Serve insights through interactive dashboards and reports',
    icon: BarChart3,
    details: ['Real-time updates', 'Custom reports', 'API endpoints'],
  },
]

const securityFeatures = [
  {
    name: 'End-to-End Encryption',
    description: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256)',
    icon: Lock,
  },
  {
    name: 'Role-Based Access Control',
    description: 'Granular permissions for administrators, teachers, and counselors',
    icon: Shield,
  },
  {
    name: 'FERPA Compliance',
    description: 'Full compliance with educational data privacy regulations',
    icon: FileJson,
  },
  {
    name: 'Audit Logging',
    description: 'Comprehensive audit trails for all data access and modifications',
    icon: GitBranch,
  },
  {
    name: 'Data Anonymization',
    description: 'PII protection through pseudonymization and aggregation',
    icon: Cloud,
  },
  {
    name: 'SOC 2 Certified',
    description: 'Enterprise-grade security controls and monitoring',
    icon: Server,
  },
]

const integrations = [
  { name: 'Canvas LMS', status: 'native', category: 'LMS' },
  { name: 'Blackboard', status: 'native', category: 'LMS' },
  { name: 'Moodle', status: 'native', category: 'LMS' },
  { name: 'Google Classroom', status: 'native', category: 'LMS' },
  { name: 'PowerSchool', status: 'native', category: 'SIS' },
  { name: 'Infinite Campus', status: 'native', category: 'SIS' },
  { name: 'Clever', status: 'native', category: 'SSO' },
  { name: 'ClassLink', status: 'native', category: 'SSO' },
  { name: 'Custom API', status: 'available', category: 'Custom' },
]

export default function ArchitecturePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="System Architecture"
          description="Technical overview of the EduPredict AI platform architecture"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Architecture Overview</TabsTrigger>
                <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
                <TabsTrigger value="security">Security & Privacy</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Architecture Diagram */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      System Architecture Layers
                    </CardTitle>
                    <CardDescription>
                      Modular, scalable architecture designed for deployment across institutions of all sizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {architectureLayers.map((layer, index) => (
                        <div key={layer.name} className="relative">
                          {index < architectureLayers.length - 1 && (
                            <div className="absolute left-6 top-16 h-full w-0.5 bg-border" />
                          )}
                          <div className="flex items-start gap-4">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${layer.color}`}>
                              <layer.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h4 className="font-semibold text-foreground">{layer.name}</h4>
                              </div>
                              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                {layer.components.map((component) => (
                                  <div
                                    key={component.name}
                                    className="rounded-lg border border-border bg-secondary/30 p-3"
                                  >
                                    <p className="text-sm font-medium text-foreground">
                                      {component.name}
                                    </p>
                                    <div className="mt-1 flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">
                                        {component.type}
                                      </span>
                                      <Badge variant="outline" className="text-xs">
                                        {component.status}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid gap-4 sm:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Prediction Latency</p>
                      <p className="text-2xl font-bold text-foreground">&lt;100ms</p>
                      <p className="text-xs text-muted-foreground">Real-time scoring</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">System Uptime</p>
                      <p className="text-2xl font-bold text-accent">99.9%</p>
                      <p className="text-xs text-muted-foreground">SLA guaranteed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Data Throughput</p>
                      <p className="text-2xl font-bold text-foreground">1M+</p>
                      <p className="text-xs text-muted-foreground">Events per day</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Model Accuracy</p>
                      <p className="text-2xl font-bold text-primary">94.2%</p>
                      <p className="text-xs text-muted-foreground">Validated performance</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="dataflow" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-primary" />
                      Data Pipeline Architecture
                    </CardTitle>
                    <CardDescription>
                      End-to-end data flow from source systems to actionable insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dataFlowSteps.map((step, index) => (
                        <div key={step.step} className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1 rounded-lg border border-border bg-secondary/30 p-4">
                            <div className="flex items-center gap-2">
                              <step.icon className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold text-foreground">{step.title}</h4>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {step.details.map((detail) => (
                                <Badge key={detail} variant="secondary" className="text-xs">
                                  {detail}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {index < dataFlowSteps.length - 1 && (
                            <ArrowRight className="mt-3 h-5 w-5 shrink-0 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Security & Privacy Framework
                    </CardTitle>
                    <CardDescription>
                      Enterprise-grade security measures ensuring student data protection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {securityFeatures.map((feature) => (
                        <div
                          key={feature.name}
                          className="rounded-lg border border-border bg-secondary/30 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                              <feature.icon className="h-5 w-5 text-accent" />
                            </div>
                            <h4 className="font-medium text-foreground">{feature.name}</h4>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {['FERPA', 'COPPA', 'SOC 2 Type II', 'GDPR', 'ISO 27001', 'WCAG 2.1'].map(
                        (cert) => (
                          <Badge
                            key={cert}
                            variant="outline"
                            className="border-accent/30 bg-accent/10 text-accent py-2 px-4"
                          >
                            {cert}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Supported Integrations
                    </CardTitle>
                    <CardDescription>
                      Native integrations with popular educational platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {['LMS', 'SIS', 'SSO', 'Custom'].map((category) => (
                        <div key={category}>
                          <h4 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {category}
                          </h4>
                          <div className="space-y-2">
                            {integrations
                              .filter((i) => i.category === category)
                              .map((integration) => (
                                <div
                                  key={integration.name}
                                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
                                >
                                  <span className="text-sm text-foreground">{integration.name}</span>
                                  <Badge
                                    variant={integration.status === 'native' ? 'default' : 'outline'}
                                    className="text-xs"
                                  >
                                    {integration.status}
                                  </Badge>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>API Documentation</CardTitle>
                    <CardDescription>
                      RESTful API and GraphQL endpoints for custom integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-border bg-secondary/50 p-4 font-mono text-sm">
                      <pre className="text-muted-foreground overflow-auto">
{`// Example API Request
GET /api/v3/students/{id}/risk-score
Authorization: Bearer <token>

// Response
{
  "studentId": "12345",
  "riskScore": 72,
  "riskLevel": "high",
  "factors": {
    "academic": 0.35,
    "attendance": 0.25,
    "engagement": 0.40
  },
  "recommendations": [...]
}`}
                      </pre>
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
