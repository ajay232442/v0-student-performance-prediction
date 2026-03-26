// Mock data for the Student Performance Prediction System

export interface Student {
  id: string
  name: string
  grade: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number
  gpa: number
  attendance: number
  engagement: number
  trend: 'improving' | 'stable' | 'declining'
  lastActivity: string
  interventions: string[]
  subjects: {
    name: string
    grade: number
    trend: 'up' | 'down' | 'stable'
  }[]
  socioeconomic: {
    freeReducedLunch: boolean
    firstGeneration: boolean
    englishLearner: boolean
  }
}

export interface Alert {
  id: string
  studentId: string
  studentName: string
  type: 'attendance' | 'grade' | 'engagement' | 'behavior'
  severity: 'warning' | 'critical'
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface Intervention {
  id: string
  name: string
  description: string
  targetGroup: string
  effectiveness: number
  duration: string
  resources: string[]
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    grade: '10th',
    riskLevel: 'critical',
    riskScore: 87,
    gpa: 1.8,
    attendance: 72,
    engagement: 45,
    trend: 'declining',
    lastActivity: '2 days ago',
    interventions: ['Academic tutoring', 'Counselor meeting'],
    subjects: [
      { name: 'Mathematics', grade: 58, trend: 'down' },
      { name: 'English', grade: 65, trend: 'stable' },
      { name: 'Science', grade: 62, trend: 'down' },
      { name: 'History', grade: 70, trend: 'up' },
    ],
    socioeconomic: {
      freeReducedLunch: true,
      firstGeneration: true,
      englishLearner: false,
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    grade: '11th',
    riskLevel: 'high',
    riskScore: 72,
    gpa: 2.3,
    attendance: 78,
    engagement: 55,
    trend: 'declining',
    lastActivity: '1 day ago',
    interventions: ['Peer mentoring'],
    subjects: [
      { name: 'Mathematics', grade: 68, trend: 'down' },
      { name: 'English', grade: 72, trend: 'stable' },
      { name: 'Science', grade: 70, trend: 'down' },
      { name: 'History', grade: 75, trend: 'stable' },
    ],
    socioeconomic: {
      freeReducedLunch: false,
      firstGeneration: false,
      englishLearner: true,
    },
  },
  {
    id: '3',
    name: 'Sarah Williams',
    grade: '9th',
    riskLevel: 'medium',
    riskScore: 48,
    gpa: 2.8,
    attendance: 85,
    engagement: 68,
    trend: 'stable',
    lastActivity: '4 hours ago',
    interventions: [],
    subjects: [
      { name: 'Mathematics', grade: 75, trend: 'stable' },
      { name: 'English', grade: 82, trend: 'up' },
      { name: 'Science', grade: 78, trend: 'stable' },
      { name: 'History', grade: 80, trend: 'up' },
    ],
    socioeconomic: {
      freeReducedLunch: true,
      firstGeneration: false,
      englishLearner: false,
    },
  },
  {
    id: '4',
    name: 'James Rodriguez',
    grade: '12th',
    riskLevel: 'low',
    riskScore: 22,
    gpa: 3.5,
    attendance: 95,
    engagement: 88,
    trend: 'improving',
    lastActivity: '30 minutes ago',
    interventions: [],
    subjects: [
      { name: 'Mathematics', grade: 88, trend: 'up' },
      { name: 'English', grade: 92, trend: 'up' },
      { name: 'Science', grade: 85, trend: 'stable' },
      { name: 'History', grade: 90, trend: 'up' },
    ],
    socioeconomic: {
      freeReducedLunch: false,
      firstGeneration: true,
      englishLearner: false,
    },
  },
  {
    id: '5',
    name: 'Olivia Brown',
    grade: '10th',
    riskLevel: 'high',
    riskScore: 68,
    gpa: 2.1,
    attendance: 80,
    engagement: 50,
    trend: 'declining',
    lastActivity: '1 day ago',
    interventions: ['Study skills workshop'],
    subjects: [
      { name: 'Mathematics', grade: 62, trend: 'down' },
      { name: 'English', grade: 70, trend: 'stable' },
      { name: 'Science', grade: 65, trend: 'down' },
      { name: 'History', grade: 72, trend: 'stable' },
    ],
    socioeconomic: {
      freeReducedLunch: true,
      firstGeneration: true,
      englishLearner: false,
    },
  },
  {
    id: '6',
    name: 'David Kim',
    grade: '11th',
    riskLevel: 'low',
    riskScore: 15,
    gpa: 3.8,
    attendance: 98,
    engagement: 92,
    trend: 'improving',
    lastActivity: '1 hour ago',
    interventions: [],
    subjects: [
      { name: 'Mathematics', grade: 95, trend: 'up' },
      { name: 'English', grade: 88, trend: 'stable' },
      { name: 'Science', grade: 92, trend: 'up' },
      { name: 'History', grade: 90, trend: 'stable' },
    ],
    socioeconomic: {
      freeReducedLunch: false,
      firstGeneration: false,
      englishLearner: false,
    },
  },
  {
    id: '7',
    name: 'Isabella Martinez',
    grade: '9th',
    riskLevel: 'critical',
    riskScore: 91,
    gpa: 1.5,
    attendance: 65,
    engagement: 35,
    trend: 'declining',
    lastActivity: '4 days ago',
    interventions: ['Parent conference', 'Attendance intervention', 'Academic support'],
    subjects: [
      { name: 'Mathematics', grade: 48, trend: 'down' },
      { name: 'English', grade: 55, trend: 'down' },
      { name: 'Science', grade: 52, trend: 'down' },
      { name: 'History', grade: 60, trend: 'stable' },
    ],
    socioeconomic: {
      freeReducedLunch: true,
      firstGeneration: true,
      englishLearner: true,
    },
  },
  {
    id: '8',
    name: 'Ethan Taylor',
    grade: '12th',
    riskLevel: 'medium',
    riskScore: 42,
    gpa: 2.9,
    attendance: 88,
    engagement: 72,
    trend: 'stable',
    lastActivity: '2 hours ago',
    interventions: [],
    subjects: [
      { name: 'Mathematics', grade: 78, trend: 'stable' },
      { name: 'English', grade: 82, trend: 'up' },
      { name: 'Science', grade: 75, trend: 'stable' },
      { name: 'History', grade: 80, trend: 'stable' },
    ],
    socioeconomic: {
      freeReducedLunch: false,
      firstGeneration: false,
      englishLearner: false,
    },
  },
]

export const alerts: Alert[] = [
  {
    id: '1',
    studentId: '7',
    studentName: 'Isabella Martinez',
    type: 'attendance',
    severity: 'critical',
    message: 'Absent for 4 consecutive days without notification',
    timestamp: '10 minutes ago',
    acknowledged: false,
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Emma Johnson',
    type: 'grade',
    severity: 'critical',
    message: 'Mathematics grade dropped below 60% threshold',
    timestamp: '2 hours ago',
    acknowledged: false,
  },
  {
    id: '3',
    studentId: '2',
    studentName: 'Michael Chen',
    type: 'engagement',
    severity: 'warning',
    message: 'LMS activity decreased by 40% over past 2 weeks',
    timestamp: '5 hours ago',
    acknowledged: false,
  },
  {
    id: '4',
    studentId: '5',
    studentName: 'Olivia Brown',
    type: 'grade',
    severity: 'warning',
    message: 'GPA trending downward for 3 consecutive grading periods',
    timestamp: '1 day ago',
    acknowledged: true,
  },
  {
    id: '5',
    studentId: '1',
    studentName: 'Emma Johnson',
    type: 'behavior',
    severity: 'warning',
    message: 'Multiple late arrivals flagged by automated system',
    timestamp: '2 days ago',
    acknowledged: true,
  },
]

export const interventions: Intervention[] = [
  {
    id: '1',
    name: 'One-on-One Tutoring',
    description: 'Personalized academic support sessions with certified tutors focusing on struggling subjects.',
    targetGroup: 'Students with grades below 70%',
    effectiveness: 78,
    duration: '4-8 weeks',
    resources: ['Certified tutors', 'Learning materials', 'Assessment tools'],
  },
  {
    id: '2',
    name: 'Peer Mentoring Program',
    description: 'Pairing at-risk students with high-performing peers for academic and social support.',
    targetGroup: 'Medium to high risk students',
    effectiveness: 65,
    duration: 'Semester-long',
    resources: ['Trained peer mentors', 'Meeting spaces', 'Progress tracking'],
  },
  {
    id: '3',
    name: 'Attendance Intervention',
    description: 'Targeted outreach and support for students with chronic absenteeism patterns.',
    targetGroup: 'Attendance below 80%',
    effectiveness: 72,
    duration: '6-12 weeks',
    resources: ['Counselors', 'Family liaisons', 'Transportation support'],
  },
  {
    id: '4',
    name: 'Study Skills Workshop',
    description: 'Group sessions teaching effective study strategies, time management, and test preparation.',
    targetGroup: 'Students with declining GPAs',
    effectiveness: 58,
    duration: '4 weeks',
    resources: ['Workshop facilitators', 'Study guides', 'Practice materials'],
  },
  {
    id: '5',
    name: 'Parent/Guardian Engagement',
    description: 'Regular communication and involvement programs to strengthen home-school connection.',
    targetGroup: 'Critical risk students',
    effectiveness: 70,
    duration: 'Ongoing',
    resources: ['Communication platform', 'Translation services', 'Meeting coordinators'],
  },
  {
    id: '6',
    name: 'Social-Emotional Learning',
    description: 'Programs addressing mental health, stress management, and emotional regulation.',
    targetGroup: 'Students showing behavioral indicators',
    effectiveness: 68,
    duration: '8-12 weeks',
    resources: ['School counselors', 'SEL curriculum', 'Safe spaces'],
  },
]

export const performanceData = [
  { month: 'Sep', avgGPA: 2.85, attendance: 92, engagement: 78, atRisk: 12 },
  { month: 'Oct', avgGPA: 2.78, attendance: 90, engagement: 75, atRisk: 15 },
  { month: 'Nov', avgGPA: 2.72, attendance: 88, engagement: 72, atRisk: 18 },
  { month: 'Dec', avgGPA: 2.68, attendance: 85, engagement: 68, atRisk: 22 },
  { month: 'Jan', avgGPA: 2.75, attendance: 87, engagement: 70, atRisk: 20 },
  { month: 'Feb', avgGPA: 2.82, attendance: 89, engagement: 74, atRisk: 17 },
  { month: 'Mar', avgGPA: 2.88, attendance: 91, engagement: 76, atRisk: 14 },
]

export const riskDistribution = [
  { name: 'Low Risk', value: 45, fill: 'var(--chart-2)' },
  { name: 'Medium Risk', value: 28, fill: 'var(--chart-3)' },
  { name: 'High Risk', value: 18, fill: 'var(--chart-1)' },
  { name: 'Critical', value: 9, fill: 'var(--chart-4)' },
]

export const engagementBySubject = [
  { subject: 'Mathematics', engagement: 68, completion: 72 },
  { subject: 'English', engagement: 75, completion: 80 },
  { subject: 'Science', engagement: 71, completion: 75 },
  { subject: 'History', engagement: 78, completion: 82 },
  { subject: 'Arts', engagement: 85, completion: 88 },
  { subject: 'PE', engagement: 92, completion: 95 },
]

export const dataFlowNodes = [
  { id: 'lms', name: 'Learning Management System', type: 'source' },
  { id: 'sis', name: 'Student Information System', type: 'source' },
  { id: 'attendance', name: 'Attendance System', type: 'source' },
  { id: 'assessments', name: 'Assessment Platform', type: 'source' },
  { id: 'ingestion', name: 'Data Ingestion Layer', type: 'process' },
  { id: 'warehouse', name: 'Data Warehouse', type: 'storage' },
  { id: 'ml', name: 'ML Prediction Engine', type: 'process' },
  { id: 'api', name: 'API Gateway', type: 'process' },
  { id: 'dashboard', name: 'Analytics Dashboard', type: 'output' },
  { id: 'alerts', name: 'Alert System', type: 'output' },
  { id: 'reports', name: 'Reporting Engine', type: 'output' },
]

export const systemMetrics = {
  totalStudents: 2847,
  activeAlerts: 23,
  predictionsToday: 1456,
  modelAccuracy: 94.2,
  dataSourcesConnected: 8,
  interventionsActive: 156,
}
