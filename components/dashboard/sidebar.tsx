'use client'

import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Lightbulb,
  GitBranch,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BarChart3,
  Database,
  FileText,
  Code2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Risk Assessment', href: '/risk', icon: AlertTriangle, badge: 5 },
  { name: 'Interventions', href: '/interventions', icon: Lightbulb },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Data Flow', href: '/data-flow', icon: Database },
  { name: 'Architecture', href: '/architecture', icon: GitBranch },
  { name: 'Developer', href: '/developer', icon: Code2 },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">EduPredict</span>
            <span className="text-xs text-muted-foreground">AI Analytics</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        <div className="mb-2 px-2">
          {!collapsed && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Main Menu
            </span>
          )}
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-destructive" />
              )}
            </Link>
          )
        })}

        <div className="mb-2 mt-6 px-2">
          {!collapsed && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              System
            </span>
          )}
        </div>
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Alerts Preview */}
      {!collapsed && (
        <div className="mx-3 mb-4 rounded-lg bg-destructive/10 p-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Active Alerts</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            5 students need immediate attention
          </p>
          <Link
            href="/risk"
            className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
          >
            View all alerts
          </Link>
        </div>
      )}

      {/* Collapse Button */}
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
