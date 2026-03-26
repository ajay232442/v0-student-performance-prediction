import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { RiskDistribution } from '@/components/dashboard/risk-distribution'
import { AlertsPanel } from '@/components/dashboard/alerts-panel'
import { AtRiskTable } from '@/components/dashboard/at-risk-table'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title="Analytics Overview"
          description="Real-time student performance predictions and insights"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Stats Overview */}
            <StatsCards />

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <PerformanceChart />
              <RiskDistribution />
            </div>

            {/* Alerts and At-Risk Students */}
            <div className="grid gap-6 lg:grid-cols-3">
              <AtRiskTable />
              <AlertsPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
