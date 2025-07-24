'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Calendar, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('type', 'experience')
        .order('start_date', { ascending: false })

      if (error) throw error

      // Transform data to match existing structure
      const transformedExperiences = data.map(exp => ({
        company: exp.institution,
        role: exp.degree,
        period: `${new Date(exp.start_date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })} - ${exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })}`,
        location: exp.field_of_study || 'Remote',
        description: exp.description,
        highlights: exp.achievements ? exp.achievements.split(',').map((h: string) => h.trim()) : [],
        current: exp.is_current,
        technologies: exp.technologies ? exp.technologies.split(',').map((t: string) => t.trim()) : [],
        employmentType: exp.employment_type || 'full-time'
      }))

      setExperiences(transformedExperiences)
    } catch (error) {
      console.error('Error fetching experiences:', error)
      // Use fallback data on error
      setExperiences(fallbackExperiences)
    } finally {
      setLoading(false)
    }
  }

  // Fallback experiences if no data from CMS
  const fallbackExperiences = [
    {
      company: 'Zipline',
      role: 'Perception Annotator (Pre-Delivery Annotations)',
      period: 'April 2025 - Present',
      location: 'On-site',
      description: 'Work with the Perception team to review and annotate data, adding critical contextual metadata for machine learning applications that support safety-critical systems including aircraft collision avoidance, ground obstacle detection, and accurate delivery systems.',
      highlights: [
        'Review sensor data labeled by external services, ensuring accuracy and completeness',
        'Use specialized internal tools to label complex data sets',
        'Identify patterns, outliers, and system problems to improve the overall labeling process',
        'Support the Perception team in delivering safety-critical systems for autonomous delivery drones',
        'Meet quality standards and weekly quotas for data delivery to keep algorithmic development on track'
      ],
      current: true,
      technologies: ['Data Annotation', 'Perception Systems', 'Quality Assurance', 'Machine Learning', 'Sensor Data Analysis'],
      employmentType: 'full-time'
    },
    {
      company: 'Carnegie Mellon University',
      role: 'Graduate Research Assistant',
      period: 'August 2024 - Present',
      location: 'Kigali City, Rwanda · Hybrid',
      description: 'Conducting research on VigiMobile project for Adverse Effects Following Immunization (AEFI) reporting under Dr. Christine Niyizamwiyitira, implementing supervised learning algorithms and ensemble methods.',
      highlights: [
        'Implementing supervised learning algorithms and ensemble methods for AEFI prediction',
        'Collaborating with Rwanda Food and Drugs Authority (Rwanda FDA) and healthcare providers',
        'Collecting, preprocessing, and analyzing healthcare data',
        'Preparing comprehensive research documentation and presentation materials',
        'Successfully predicting AEFI factors in Rwanda\'s healthcare system'
      ],
      current: false,
      technologies: ['Python', 'Machine Learning', 'Research Methods', 'Neural Networks', 'Healthcare Analytics', 'Data Analysis'],
      employmentType: 'research'
    },
    {
      company: 'Carnegie Mellon University',
      role: 'Mastercard Foundation Scholars Give back Project Lead',
      period: 'January 2024 - March 2025',
      location: 'Kigali City, Rwanda',
      description: 'Leading and coordinating scholar initiatives and community impact projects that connect CMU-Africa scholars with local Rwandan communities.',
      highlights: [
        'Managing project timelines and deliverables',
        'Facilitating collaboration between international scholars and community partners',
        'Developing strategic plans for community impact assessment',
        'Leading social impact initiatives and programs'
      ],
      current: false,
      technologies: ['Leadership', 'Strategic Planning', 'Project Management', 'Community Development', 'Social Impact Assessment'],
      employmentType: 'part-time'
    },
    {
      company: 'iGiTREE',
      role: 'Data Analyst & Machine Learning Intern',
      period: 'May 2024 - August 2024',
      location: 'Kigali City, Rwanda · Hybrid',
      description: 'Played a key role in project management and ensuring timely delivery of tasks within the company\'s mission of reconnecting families through genetic genealogy and DNA testing.',
      highlights: [
        'Managed and contributed to projects involving data analysis and machine learning',
        'Worked with existing source codes and tools to support product development',
        'Collaborated with multidisciplinary teams including cybersecurity and big data specialists',
        'Enhanced user experience through predictive modeling',
        'Engaged in workspace activities at NORRSKEN to foster collaboration'
      ],
      current: false,
      technologies: ['Data Analysis', 'Machine Learning', 'Predictive Modeling', 'iOS', 'Android', 'Web Development'],
      employmentType: 'internship'
    },
    {
      company: 'SOLVIT AFRICA',
      role: 'Junior Python - Django Trainer',
      period: 'February 2023 - March 2024',
      location: 'Rwanda · On-site',
      description: 'Led comprehensive training sessions on Python Django framework and was recognized as the Best Trainer for Cohort 5 (February to July 2023).',
      highlights: [
        'Trained 35 participants over 15-week periods',
        'Provided personalized support to 70 participants',
        'Developed and delivered practical training materials',
        'Recognized as Best Trainer for exceptional teaching methods',
        'Focused on industry applications and real-world problem-solving'
      ],
      current: false,
      technologies: ['Python', 'Django', 'Technical Training', 'Mentoring', 'Curriculum Development'],
      employmentType: 'full-time'
    },
    {
      company: 'kLab.rw',
      role: 'Future Koders Trainer',
      period: 'July 2022 - November 2023',
      location: 'Rwanda',
      description: 'Trained over 70 children in programming fundamentals, designed curriculum for coding education and provided mentorship to aspiring programmers.',
      highlights: [
        'Designed and implemented curriculum for coding education',
        'Provided mentorship and guidance to aspiring programmers',
        'Developed creative problem-solving approaches for young learners',
        'Managed classroom activities and organized coding workshops'
      ],
      current: false,
      technologies: ['C++', 'Teaching', 'Curriculum Development', 'Mathematics Education', 'Problem Solving'],
      employmentType: 'full-time'
    }
  ]

  // Use fallback experiences if loading or if CMS has no data
  const displayExperiences = loading || experiences.length === 0 ? fallbackExperiences : experiences

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom pl-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-8">
            {displayExperiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full border-2 ${
                  exp.current 
                    ? 'bg-gray-600 border-gray-600' 
                    : 'bg-white dark:bg-gray-900 border-gray-400'
                }`}></div>

                {/* Experience Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                      {exp.highlights.map((highlight: string, highlightIndex: number) => (
                        <li key={highlightIndex} className="text-sm">{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {exp.current && (
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Current Position
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 