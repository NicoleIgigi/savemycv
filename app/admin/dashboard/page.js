'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { 
  FileText, 
  Briefcase, 
  User, 
  Mail,
  GraduationCap,
  Star,
  Plus,
  Eye,
  Edit,
  TrendingUp
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogPosts: { total: 0, published: 0 },
    projects: { total: 0, published: 0 },
    testimonials: { total: 0, published: 0 },
    education: { total: 0, published: 0 }
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [blogPosts, projects, testimonials, education] = await Promise.all([
        supabase.from('blog_posts').select('id, published'),
        supabase.from('projects').select('id, published'),
        supabase.from('testimonials').select('id, published'),
        supabase.from('education').select('id, published')
      ])

      setStats({
        blogPosts: {
          total: blogPosts.data?.length || 0,
          published: blogPosts.data?.filter(item => item.published).length || 0
        },
        projects: {
          total: projects.data?.length || 0,
          published: projects.data?.filter(item => item.published).length || 0
        },
        testimonials: {
          total: testimonials.data?.length || 0,
          published: testimonials.data?.filter(item => item.published).length || 0
        },
        education: {
          total: education.data?.length || 0,
          published: education.data?.filter(item => item.published).length || 0
        }
      })

      // Fetch recent activity (last 5 items across all tables)
      const [recentBlogPosts, recentProjects] = await Promise.all([
        supabase
          .from('blog_posts')
          .select('id, title, created_at, updated_at')
          .order('updated_at', { ascending: false })
          .limit(3),
        supabase
          .from('projects')
          .select('id, title, created_at, updated_at')
          .order('updated_at', { ascending: false })
          .limit(2)
      ])

      const activity = [
        ...(recentBlogPosts.data || []).map(item => ({ ...item, type: 'blog' })),
        ...(recentProjects.data || []).map(item => ({ ...item, type: 'project' }))
      ].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 5)

      setRecentActivity(activity)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      name: 'New Blog Post',
      href: '/admin/dashboard/blog/new',
      icon: FileText,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Add Project',
      href: '/admin/dashboard/projects/new',
      icon: Briefcase,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Edit Bio',
      href: '/admin/dashboard/bio',
      icon: User,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'View Portfolio',
      href: '/',
      icon: Eye,
      color: 'bg-gray-500 hover:bg-gray-600',
      external: true
    }
  ]

  const statCards = [
    {
      name: 'Blog Posts',
      icon: FileText,
      total: stats.blogPosts.total,
      published: stats.blogPosts.published,
      href: '/admin/dashboard/blog',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      name: 'Projects',
      icon: Briefcase,
      total: stats.projects.total,
      published: stats.projects.published,
      href: '/admin/dashboard/projects',
      color: 'text-green-600 bg-green-100'
    },
    {
      name: 'Testimonials',
      icon: Star,
      total: stats.testimonials.total,
      published: stats.testimonials.published,
      href: '/admin/dashboard/testimonials',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      name: 'Education',
      icon: GraduationCap,
      total: stats.education.total,
      published: stats.education.published,
      href: '/admin/dashboard/education',
      color: 'text-purple-600 bg-purple-100'
    }
  ]

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-600 font-medium">All systems operational</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.total}</p>
                    <p className="text-sm text-gray-500">
                      {stat.published} published
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              const LinkComponent = action.external ? 'a' : Link
              const linkProps = action.external ? 
                { href: action.href, target: '_blank', rel: 'noopener noreferrer' } : 
                { href: action.href }

              return (
                <LinkComponent
                  key={action.name}
                  {...linkProps}
                  className={`${action.color} text-white p-4 rounded-lg text-center transition-colors`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">{action.name}</p>
                </LinkComponent>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {item.type === 'blog' ? (
                      <FileText className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Briefcase className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.type === 'blog' ? 'Blog post' : 'Project'} • {' '}
                      {new Date(item.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/dashboard/${item.type === 'blog' ? 'blog' : 'projects'}/${item.id}/edit`}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No recent activity</p>
              <p className="text-sm text-gray-400 mt-1">
                Start by creating your first blog post or project
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 