'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, ExternalLink, Trophy } from 'lucide-react'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const education = [
    {
      degree: 'Master of Science in Information Technology',
      institution: 'Carnegie Mellon University Africa',
      college: 'CMU-Africa, College of Engineering',
      period: '2023 - 2025',
      logo: '/images/carnegie_mellon_university_logo.jpg',
      status: 'current',
      gpa: '3.75',
      achievements: [
        'Mastercard Foundation Scholar',
        'Graduate Research Assistant',
        'VigiMobile Project Research Team',
        'KinyarMedASR Research Project'
      ]
    },
    {
      degree: 'Bachelor\'s Degree in Information Technology',
      institution: 'Adventist University of Central Africa',
      college: 'College of Science and Technology',
      period: '2018 - 2023',
      logo: '/images/adventist_university_of_central_africa_logo.jpg',
      status: 'completed',
      gpa: '3.8',
      achievements: [
        'Graduated with High Distinction',
        'Active in programming competitions',
        'Technology student leader',
        'Academic excellence recognition'
      ]
    }
  ]

  const achievements = [
    {
      title: 'Best Trainer Award',
      description: 'Received the Best Trainer Award from SOLVIT AFRICA Cohort 5 in 2023 for excellence in training and mentoring programming students.',
      logo: '/images/solvit africa logo.jpg',
      category: 'Training Excellence',
      year: '2023'
    },
    {
      title: 'Mastercard Foundation Scholar',
      description: 'Selected as a Mastercard Foundation Scholar for Master\'s degree at Carnegie Mellon University Africa, recognizing academic excellence and leadership potential.',
      logo: '/images/mastercard logo.jpg',
      category: 'Scholarship',
      year: '2023'
    },
    {
      title: 'Research Publications',
      description: 'Contributing to cutting-edge research in healthcare AI, speech recognition, and machine learning applications in African contexts.',
      logo: '/images/carnegie_mellon_university_logo.jpg',
      category: 'Research',
      year: '2024'
    }
  ]

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
    <section id="education" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom pl-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-gray-900 dark:text-white mb-4">
              Education & Achievements
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-gray-600" />
                Education
              </h3>
              
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full border-2 ${
                      edu.status === 'current' 
                        ? 'bg-gray-600 border-gray-600 animate-pulse' 
                        : 'bg-white dark:bg-gray-900 border-gray-400'
                    }`}></div>

                    {/* Education Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 p-2 flex items-center justify-center flex-shrink-0">
                          <img 
                            src={edu.logo} 
                            alt={edu.institution}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = '/images/default-university.png'
                            }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-600 dark:text-gray-400 text-lg">
                              {edu.degree}
                            </h4>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{edu.period}</span>
                          </div>
                          
                          <p className="text-gray-900 dark:text-white font-medium mb-1">{edu.institution}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{edu.college}</p>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              GPA: {edu.gpa}
                            </span>
                            {edu.status === 'current' && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                                Current
                              </span>
                            )}
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Achievements:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {edu.achievements.map((achievement, achIndex) => (
                                <li key={achIndex}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-gray-600" />
                A Few of the Achievements
              </h3>
              
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 p-2 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={achievement.logo} 
                          alt={achievement.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-award.png'
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-600 dark:text-gray-400">
                            {achievement.title}
                          </h4>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{achievement.year}</span>
                        </div>
                        
                        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium mb-3">
                          {achievement.category}
                        </span>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Self Learning */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Self Learning - Programming
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                2014 - Present
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Stackoverflow and GitHub
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education 