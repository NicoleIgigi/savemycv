'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, Target, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [bioSections, setBioSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchBioSections()
  }, [])

  const fetchBioSections = async () => {
    try {
      const { data, error } = await supabase
        .from('bio_sections')
        .select('*')
        .order('order_position', { ascending: true })

      if (error) throw error
      setBioSections(data || [])
    } catch (error) {
      console.error('Error fetching bio sections:', error)
      setBioSections([])
    } finally {
      setLoading(false)
    }
  }

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

  const skills = [
    { name: 'Machine Learning', level: 95 },
    { name: 'Deep Learning', level: 90 },
    { name: 'Python', level: 98 },
    { name: 'Data Analytics', level: 94 },
    { name: 'Research', level: 92 },
    { name: 'Django', level: 88 },
    { name: 'Neural Networks', level: 87 },
    { name: 'Computer Vision', level: 85 },
    { name: 'Natural Language Processing', level: 89 },
    { name: 'Statistical Analysis', level: 91 },
    { name: 'Data Visualization', level: 86 },
    { name: 'Project Management', level: 93 },
  ]

  const achievements = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Mastercard Foundation Scholar',
      description: 'Carnegie Mellon University Africa (3.75 GPA)',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Best Trainer Award',
      description: 'SOLVIT AFRICA Cohort 5 (2023)',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Research Impact',
      description: 'Contributing to healthcare AI in Africa',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Community Leader',
      description: 'Trained 70+ students in programming',
    },
  ]

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800">
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
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex justify-center md:justify-start mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-500 shadow-lg">
                  <img 
                    src="/images/nicole profile picture.jpg" 
                    alt="Nicole Igiraneza Ishimwe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm a passionate Machine Learning Engineer and Data Scientist currently pursuing 
                  my Master's degree in Information Technology at Carnegie Mellon University Africa 
                  as a Mastercard Foundation Scholar.
                </p>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  My journey spans from training the next generation of programmers to conducting 
                  cutting-edge research in healthcare AI. I currently work as a Graduate Research 
                  Assistant on the VigiMobile project, developing ML solutions for Adverse Effects 
                  Following Immunization (AEFI) reporting in Rwanda's healthcare system.
                </p>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  At Zipline, I contribute to safety-critical systems as a Perception Annotator, 
                  ensuring the reliability of autonomous delivery drones that serve communities 
                  across Africa.
                </p>
              </div>

              {/* Education Highlights */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      M.S. Information Technology - Carnegie Mellon University Africa
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      B.S. Information Technology - Adventist University of Central Africa
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills & Achievements */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-gray-600 to-gray-800 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Achievements
                </h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 