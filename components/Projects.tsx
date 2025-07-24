'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Calendar, Users, Award, Filter } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ProjectDetail from './ProjectDetail'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform data to match existing structure
      const transformedProjects = data.map(project => ({
        title: project.title,
        description: project.description,
        image: project.image || '/images/default-project.png',
        demoUrl: project.demo_url,
        githubUrl: project.github_url,
        technologies: Array.isArray(project.tech_stack) ? project.tech_stack : (project.tech_stack ? [project.tech_stack] : []),
        category: project.featured ? 'Featured' : 'Project',
        date: new Date(project.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        }),
        featured: project.featured,
        impact: project.description, // Using description as impact for now
        team: 'Individual Project', // You can add team field to database
        role: 'Full Stack Developer', // You can add role field to database
        duration: '3 months', // You can calculate or add duration field
        tags: Array.isArray(project.tech_stack) ? project.tech_stack : ['Technology'],
        challenges: project.description, // You can add challenges field
        solutions: project.description, // You can add solutions field
        results: 'Successfully implemented and deployed' // You can add results field
      }))

      setProjects(transformedProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const openProjectDetail = (index: number) => {
    setSelectedProject(index)
    setIsDetailOpen(true)
  }

  const closeProjectDetail = () => {
    setIsDetailOpen(false)
    setSelectedProject(null)
  }

  // Fallback projects if no data from CMS
  const fallbackProjects = [
    {
      title: 'KinyarMedASR: Kinyarwanda Medical Speech Recognition',
      period: 'Sep 2024 - Dec 2024',
      institution: 'Carnegie Mellon University',
      image: '/images/kinyamedASR project image.png',
      description: 'Enhanced Automatic Speech Recognition (ASR) technology for Kinyarwanda medical contexts, addressing critical healthcare documentation challenges in Africa.',
      highlights: [
        'Reduced Word Error Rate from 31.36% to 24.34% through innovative transformer-based spell correction',
        'Collaborated with a team of four researchers in an interdisciplinary environment',
        'Managed data aspects including dataset storage, versioning, and formatting for ML tasks',
        'Created specialized medical dataset by recording and transcribing audio samples',
        'Addressed healthcare worker shortage (1.55 health workers per 1,000 people in Africa)',
      ],
      technologies: ['Deep Learning', 'Transformer Models', 'Speech Recognition', 'Kinyarwanda NLP', 'Python'],
      type: 'Research',
      category: ['Research', 'ML/AI', 'Healthcare'],
      status: 'Completed',
      teamSize: 4,
    },
    {
      title: 'VigiMobile: AEFI Reporting System',
      period: 'Aug 2024 - Present',
      institution: 'Carnegie Mellon University',
      image: '/images/vigimobile%20project%20image.png',
      description: 'Conducting research on Adverse Effects Following Immunization (AEFI) reporting using supervised learning algorithms and ensemble methods.',
      highlights: [
        'Implementing supervised learning algorithms for AEFI prediction in Rwanda\'s healthcare system',
        'Collaborating with Rwanda Food and Drugs Authority (Rwanda FDA) and healthcare providers',
        'Collecting, preprocessing, and analyzing healthcare data',
        'Preparing comprehensive research documentation and presentation materials',
        'Contributing to improved healthcare monitoring and safety systems',
      ],
      technologies: ['Machine Learning', 'Ensemble Methods', 'Healthcare Analytics', 'Python', 'Data Science'],
      type: 'Research',
      category: ['Research', 'ML/AI', 'Healthcare'],
      status: 'Ongoing',
      teamSize: 3,
    },
    {
      title: 'Insecure Hotspots Analysis in Rwanda using Twitter Data',
      period: 'Jan 2024 - May 2024',
      institution: 'Carnegie Mellon University',
      image: '/images/insecure%20hotsposta%20analysis%20project%20image.png',
      description: 'Leading research initiative analyzing security data from Twitter using natural language processing and geospatial analysis.',
      highlights: [
        'Designed comprehensive research methodology combining sentiment analysis with location data',
        'Collected and preprocessed Twitter data using Tweepy library and Twitter API',
        'Created visualization tools mapping security sentiment across different regions of Rwanda',
        'Produced actionable insights contributing to improved security measures',
        'Expanding methodology for application in multiple countries across Africa',
      ],
      technologies: ['Natural Language Processing', 'Geospatial Analysis', 'Twitter API', 'Python', 'Data Visualization'],
      type: 'Research',
      category: ['Research', 'ML/AI'],
      status: 'Completed',
      teamSize: 2,
    },
    {
      title: 'Titanic Dataset Analysis and Survival Predictions',
      period: 'Sep 2023 - Nov 2023',
      institution: 'Personal Project',
      image: '/images/titanic%20dataset%20project%20image.png',
      description: 'Comprehensive machine learning project analyzing the Titanic dataset with multiple predictive models and advanced optimization techniques.',
      highlights: [
        'Conducted comprehensive data cleaning, feature engineering, and exploratory analysis',
        'Developed and compared multiple ML models (Logistic Regression, Decision Trees, Random Forests, SVM)',
        'Optimized model hyperparameters using grid search and cross-validation',
        'Achieved top 10% ranking on the Kaggle leaderboard',
        'Created visualization dashboard to communicate findings and model performance',
      ],
      technologies: ['Machine Learning', 'Python', 'Scikit-learn', 'Pandas', 'Data Visualization'],
      type: 'Academic',
      category: ['Academic', 'ML/AI'],
      status: 'Completed',
      teamSize: 1,
    },
    {
      title: 'Geospatial Analysis of Disaster Patterns in Africa: Comparative Study of Sub-Saharan and Northern Regions (2000-2025)',
      period: 'Jan 2025 - Apr 2025',
      institution: 'Carnegie Mellon University',
      image: '/images/gis%20project%20image.png',
      description: 'Comprehensive geospatial analysis comparing disaster patterns between Sub-Saharan and Northern Africa using interactive dashboards and StoryMap visualization.',
      highlights: [
        'Analyzed 4,174 disaster records across Africa spanning 25 years (2000-2025)',
        'Revealed Sub-Saharan Africa experienced 4.5x more disaster-related deaths than Northern Africa',
        'Created interactive ArcGIS dashboards with temporal and regional filtering capabilities',
        'Developed comprehensive StoryMap for narrative-driven data exploration',
        'Identified transport disasters (39.17%) as the dominant disaster type in Sub-Saharan Africa',
      ],
      technologies: ['ArcGIS Pro', 'ArcGIS Online', 'Geospatial Analysis', 'Data Visualization', 'StoryMap', 'Statistical Analysis'],
      type: 'Research',
      category: ['Research', 'Academic', 'GIS'],
      status: 'Completed',
      teamSize: 3,
    },
  ]

  // Use fallback projects if loading or if CMS has no data
  const displayProjects = loading || projects.length === 0 ? fallbackProjects : projects

  const filters = [
    { id: 'All', label: 'All Projects', count: displayProjects.length },
    { id: 'Featured', label: 'Featured', count: displayProjects.filter((p: any) => p.featured).length },
    { id: 'Research', label: 'Research', count: displayProjects.filter((p: any) => p.tags?.includes('Research')).length },
    { id: 'ML/AI', label: 'ML/AI', count: displayProjects.filter((p: any) => p.tags?.some((tag: any) => tag.includes('AI') || tag.includes('ML') || tag.includes('Machine'))).length },
    { id: 'Healthcare', label: 'Healthcare', count: displayProjects.filter((p: any) => p.tags?.includes('Healthcare')).length },
    { id: 'Academic', label: 'Academic', count: displayProjects.filter((p: any) => p.tags?.includes('Academic')).length },
  ]

  const nextProject = () => {
    if (selectedProject !== null) {
      setSelectedProject((selectedProject + 1) % displayProjects.length)
    }
  }

  const prevProject = () => {
    if (selectedProject !== null) {
      setSelectedProject(selectedProject === 0 ? displayProjects.length - 1 : selectedProject - 1)
    }
  }

  const filteredProjects = activeFilter === 'All' 
    ? displayProjects 
    : displayProjects.filter((project: any) => project.category.includes(activeFilter))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom pl-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Explore my research projects and academic work in Machine Learning, AI, and Data Science
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gray-900 dark:bg-gray-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">{filter.label}</span>
                <span className="text-xs bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid - 3 cards per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => openProjectDetail(index)}
              >
                {/* Project Image - Medium size */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-project.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.type === 'Research' 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {project.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Ongoing'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content - Medium size */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span className="truncate">{project.period}</span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies - Show first 4 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Team Size and Institution */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.teamSize} member{project.teamSize !== 1 ? 's' : ''}</span>
                    </span>
                    <span className="truncate ml-2">{project.institution}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Project Detail Modal */}
      {isDetailOpen && selectedProject !== null && (
        <ProjectDetail
          isOpen={isDetailOpen}
          onClose={closeProjectDetail}
          projectIndex={selectedProject}
          onNextProject={nextProject}
          onPrevProject={prevProject}
        />
      )}
    </section>
  )
}

export default Projects 