'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  BookOpen,
  Users,
  Calendar,
  Target,
  Clock,
  CheckCircle,
  Plus,
  Sparkles,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Brain,
} from 'lucide-react'
import { interventions, students, type Intervention, type Student } from '@/lib/mock-data'
import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'

const interventionIcons: Record<string, typeof BookOpen> = {
  'One-on-One Tutoring': BookOpen,
  'Peer Mentoring Program': Users,
  'Attendance Intervention': Calendar,
  'Study Skills Workshop': Target,
  'Parent/Guardian Engagement': Users,
  'Social-Emotional Learning': Brain,
}

function InterventionCard({ intervention }: { intervention: Intervention }) {
  const Icon = interventionIcons[intervention.name] || Lightbulb
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="group cursor-pointer transition-all hover:ring-2 hover:ring-primary/20">
        <DialogTrigger asChild>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">
                {intervention.duration}
              </Badge>
            </div>
            <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary">
              {intervention.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {intervention.description}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Effectiveness</span>
                <span className="font-medium text-foreground">{intervention.effectiveness}%</span>
              </div>
              <Progress value={intervention.effectiveness} className="h-2" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Target: {intervention.targetGroup}
            </p>
          </CardContent>
        </DialogTrigger>
      </Card>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            {intervention.name}
          </DialogTitle>
          <DialogDescription>{intervention.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Effectiveness Rate</p>
              <p className="text-2xl font-bold text-accent">{intervention.effectiveness}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold text-foreground">{intervention.duration}</p>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-foreground">Target Group</h4>
            <Badge variant="secondary">{intervention.targetGroup}</Badge>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-foreground">Required Resources</h4>
            <div className="flex flex-wrap gap-2">
              {intervention.resources.map((resource) => (
                <Badge key={resource} variant="outline">
                  {resource}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Assign to Student
            </Button>
            <Button variant="outline">View Analytics</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AIRecommendationCard({ student }: { student: Student }) {
  const recommendedInterventions = student.riskLevel === 'critical'
    ? interventions.slice(0, 3)
    : student.riskLevel === 'high'
    ? interventions.slice(0, 2)
    : interventions.slice(0, 1)

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-foreground">{student.name}</h4>
              <p className="text-sm text-muted-foreground">
                {student.grade} | Risk Score: {student.riskScore}%
              </p>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Recommended
          </Badge>
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-sm text-muted-foreground">Recommended Interventions:</p>
          {recommendedInterventions.map((intervention, index) => (
            <div
              key={intervention.id}
              className="flex items-center justify-between rounded-lg bg-background p-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground">{intervention.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {intervention.effectiveness}% effective
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1">
            Apply Recommendations
          </Button>
          <Button size="sm" variant="outline">
            Customize
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function InterventionsPage() {
  const atRiskStudents = students.filter(
    (s) => s.riskLevel === 'high' || s.riskLevel === 'critical'
  )
  
  const activeInterventionCount = students.reduce(
    (sum, s) => sum + s.interventions.length,
    0
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Intervention Recommendations"
          description="AI-powered intervention strategies and personalized recommendations"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Available Interventions</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">{interventions.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-chart-3" />
                    <span className="text-sm text-muted-foreground">Active Interventions</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">{activeInterventionCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-destructive" />
                    <span className="text-sm text-muted-foreground">Students Needing Help</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">{atRiskStudents.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Avg Effectiveness</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {Math.round(
                      interventions.reduce((sum, i) => sum + i.effectiveness, 0) /
                        interventions.length
                    )}%
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="recommendations" className="space-y-6">
              <TabsList>
                <TabsTrigger value="recommendations" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Recommendations
                </TabsTrigger>
                <TabsTrigger value="catalog" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Intervention Catalog
                </TabsTrigger>
                <TabsTrigger value="active" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Active Interventions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <CardTitle>AI-Powered Recommendations</CardTitle>
                    </div>
                    <CardDescription>
                      Our machine learning model analyzes student data to recommend the most
                      effective interventions based on historical success rates and individual
                      student profiles.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                  {atRiskStudents.slice(0, 4).map((student) => (
                    <AIRecommendationCard key={student.id} student={student} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="catalog" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {interventions.map((intervention) => (
                    <InterventionCard key={intervention.id} intervention={intervention} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Currently Active Interventions</CardTitle>
                    <CardDescription>
                      Track progress and outcomes for ongoing intervention programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students
                        .filter((s) => s.interventions.length > 0)
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between rounded-lg border border-border p-4"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{student.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {student.interventions.length} active intervention(s)
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {student.interventions.map((intervention) => (
                                <Badge key={intervention} variant="secondary">
                                  {intervention}
                                </Badge>
                              ))}
                            </div>
                            <Button variant="outline" size="sm">
                              View Progress
                            </Button>
                          </div>
                        ))}
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
