'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Database,
  Bell,
  Shield,
  Users,
  Settings,
  RefreshCcw,
  Check,
  AlertCircle,
  Plug,
  Key,
  Globe,
  Clock,
} from 'lucide-react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { useState } from 'react'

const connectedSources = [
  {
    name: 'Canvas LMS',
    type: 'Learning Management System',
    status: 'connected',
    lastSync: '5 minutes ago',
    records: '2,847 students',
  },
  {
    name: 'PowerSchool SIS',
    type: 'Student Information System',
    status: 'connected',
    lastSync: '10 minutes ago',
    records: '2,847 students',
  },
  {
    name: 'SwipeK12',
    type: 'Attendance Tracking',
    status: 'connected',
    lastSync: '2 hours ago',
    records: '156,432 records',
  },
  {
    name: 'Clever SSO',
    type: 'Single Sign-On',
    status: 'connected',
    lastSync: 'Real-time',
    records: 'Active',
  },
  {
    name: 'Google Classroom',
    type: 'Learning Platform',
    status: 'pending',
    lastSync: 'Not configured',
    records: '-',
  },
]

const notificationSettings = [
  { id: 'critical', label: 'Critical Risk Alerts', description: 'Immediate notification for critical risk students', enabled: true },
  { id: 'high', label: 'High Risk Alerts', description: 'Daily digest of high risk students', enabled: true },
  { id: 'attendance', label: 'Attendance Alerts', description: 'When attendance drops below threshold', enabled: true },
  { id: 'grade', label: 'Grade Drop Alerts', description: 'Significant grade decreases', enabled: true },
  { id: 'engagement', label: 'Engagement Alerts', description: 'LMS activity decreases', enabled: false },
  { id: 'weekly', label: 'Weekly Summary', description: 'Weekly overview email', enabled: true },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState(notificationSettings)

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="System Settings"
          description="Configure integrations, notifications, and system preferences"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <Tabs defaultValue="integrations" className="space-y-6">
              <TabsList>
                <TabsTrigger value="integrations" className="gap-2">
                  <Plug className="h-4 w-4" />
                  Data Integrations
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="api" className="gap-2">
                  <Key className="h-4 w-4" />
                  API Keys
                </TabsTrigger>
              </TabsList>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Connected Data Sources
                    </CardTitle>
                    <CardDescription>
                      Manage connections to your educational data systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectedSources.map((source) => (
                        <div
                          key={source.name}
                          className="flex items-center justify-between rounded-lg border border-border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                              source.status === 'connected' 
                                ? 'bg-accent/10' 
                                : 'bg-chart-3/10'
                            }`}>
                              {source.status === 'connected' ? (
                                <Check className="h-5 w-5 text-accent" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-chart-3" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{source.name}</p>
                              <p className="text-sm text-muted-foreground">{source.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-foreground">{source.records}</p>
                              <p className="text-xs text-muted-foreground">
                                Last sync: {source.lastSync}
                              </p>
                            </div>
                            <Badge
                              variant={source.status === 'connected' ? 'default' : 'secondary'}
                              className={source.status === 'connected' ? 'bg-accent/10 text-accent border-accent/20' : ''}
                            >
                              {source.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {source.status === 'connected' ? 'Configure' : 'Connect'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" className="gap-2">
                        <RefreshCcw className="h-4 w-4" />
                        Sync All Sources
                      </Button>
                      <Button className="gap-2">
                        <Plug className="h-4 w-4" />
                        Add New Integration
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sync Schedule</CardTitle>
                    <CardDescription>Configure automatic data synchronization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Real-time Events
                        </label>
                        <Select defaultValue="enabled">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled (Recommended)</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Batch Sync Frequency
                        </label>
                        <Select defaultValue="hourly">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15min">Every 15 minutes</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Sync Window
                        </label>
                        <Select defaultValue="always">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="always">Always</SelectItem>
                            <SelectItem value="business">Business Hours</SelectItem>
                            <SelectItem value="night">Night Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Alert Preferences
                    </CardTitle>
                    <CardDescription>
                      Configure when and how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings.map((setting) => (
                        <div
                          key={setting.id}
                          className="flex items-center justify-between rounded-lg border border-border p-4"
                        >
                          <div>
                            <p className="font-medium text-foreground">{setting.label}</p>
                            <p className="text-sm text-muted-foreground">{setting.description}</p>
                          </div>
                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={() => toggleSetting(setting.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Thresholds</CardTitle>
                    <CardDescription>
                      Set custom thresholds for when alerts are triggered
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Critical Risk Threshold
                        </label>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="85" className="w-24" />
                          <span className="text-sm text-muted-foreground">% and above</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          High Risk Threshold
                        </label>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="65" className="w-24" />
                          <span className="text-sm text-muted-foreground">% and above</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Attendance Alert Threshold
                        </label>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="80" className="w-24" />
                          <span className="text-sm text-muted-foreground">% and below</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Consecutive Absences Alert
                        </label>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="3" className="w-24" />
                          <span className="text-sm text-muted-foreground">days</span>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-6">Save Thresholds</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Data Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Configure data retention, anonymization, and access controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Data Retention Period
                        </label>
                        <Select defaultValue="7years">
                          <SelectTrigger className="w-64">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3years">3 Years</SelectItem>
                            <SelectItem value="5years">5 Years</SelectItem>
                            <SelectItem value="7years">7 Years (FERPA Recommended)</SelectItem>
                            <SelectItem value="indefinite">Indefinite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                          <p className="font-medium text-foreground">Auto-anonymize Graduated Students</p>
                          <p className="text-sm text-muted-foreground">
                            Automatically remove PII 1 year after graduation
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                          <p className="font-medium text-foreground">Aggregate-Only Mode for Reports</p>
                          <p className="text-sm text-muted-foreground">
                            Exports and reports show only aggregated data
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                          <p className="font-medium text-foreground">Audit Log Retention</p>
                          <p className="text-sm text-muted-foreground">
                            Keep detailed access logs for compliance
                          </p>
                        </div>
                        <Select defaultValue="2years">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1year">1 Year</SelectItem>
                            <SelectItem value="2years">2 Years</SelectItem>
                            <SelectItem value="5years">5 Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Access Control
                    </CardTitle>
                    <CardDescription>
                      Manage role-based access permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { role: 'Administrator', access: 'Full access to all data and settings', users: 3 },
                        { role: 'Counselor', access: 'Student profiles, interventions, risk data', users: 8 },
                        { role: 'Teacher', access: 'Own students only, limited risk data', users: 45 },
                        { role: 'Principal', access: 'School-wide aggregates and alerts', users: 2 },
                      ].map((role) => (
                        <div
                          key={role.role}
                          className="flex items-center justify-between rounded-lg border border-border p-4"
                        >
                          <div>
                            <p className="font-medium text-foreground">{role.role}</p>
                            <p className="text-sm text-muted-foreground">{role.access}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary">{role.users} users</Badge>
                            <Button variant="outline" size="sm">Configure</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      API Keys
                    </CardTitle>
                    <CardDescription>
                      Manage API keys for custom integrations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Production Key', created: 'Jan 15, 2024', lastUsed: '2 hours ago', status: 'active' },
                        { name: 'Development Key', created: 'Feb 20, 2024', lastUsed: '1 day ago', status: 'active' },
                        { name: 'Testing Key', created: 'Mar 1, 2024', lastUsed: 'Never', status: 'inactive' },
                      ].map((key) => (
                        <div
                          key={key.name}
                          className="flex items-center justify-between rounded-lg border border-border p-4"
                        >
                          <div className="flex items-center gap-4">
                            <Key className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">{key.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Created: {key.created} | Last used: {key.lastUsed}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={key.status === 'active' ? 'default' : 'secondary'}>
                              {key.status}
                            </Badge>
                            <Button variant="outline" size="sm">Revoke</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4">Generate New API Key</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Webhook Endpoints
                    </CardTitle>
                    <CardDescription>
                      Configure webhooks for real-time event notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Alert Webhook URL
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://your-app.com/webhooks/edupredict"
                            className="flex-1"
                          />
                          <Button variant="outline">Test</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Trigger Events
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['Critical Alerts', 'Risk Score Changes', 'Intervention Updates', 'New Students'].map((event) => (
                            <Badge key={event} variant="outline" className="cursor-pointer hover:bg-secondary">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4">Save Webhook Settings</Button>
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
