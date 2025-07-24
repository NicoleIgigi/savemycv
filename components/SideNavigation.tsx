'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Home, User, Briefcase, FolderOpen, Award, MessageSquare, Globe, Github, BookOpen, GraduationCap, Mail, Sun, Moon } from 'lucide-react'

const SideNavigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'certificates', 'testimonials', 'languages', 'github', 'blog', 'education', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'languages', icon: Globe, label: 'Languages' },
    { id: 'github', icon: Github, label: 'GitHub' },
    { id: 'blog', icon: BookOpen, label: 'Blog' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ]

  if (!mounted) return null

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 flex flex-col items-center py-6 shadow-lg">
      {/* Logo/Profile */}
      <div className="mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500">
          <img 
            src="/images/nicole profile picture.jpg" 
            alt="Nicole Igiraneza" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative p-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-900 dark:bg-gray-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-600 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {item.label}
              </div>
            </button>
          )
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="mt-auto">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

export default SideNavigation 