'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Globe, Check } from 'lucide-react'

const Languages = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const languages = [
    {
      name: 'Kinyarwanda',
      level: 'Native',
      proficiency: 100,
      description: 'Mother tongue - Used in KinyarMedASR research project',
      flag: '🇷🇼'
    },
    {
      name: 'English',
      level: 'Fluent',
      proficiency: 95,
      description: 'Academic and professional working language',
      flag: '🇺🇸'
    },
    {
      name: 'French',
      level: 'Conversational',
      proficiency: 75,
      description: 'Secondary language for regional communication',
      flag: '🇫🇷'
    },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="languages" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom pl-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-gray-900 dark:text-white mb-4">
              Languages
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
              Multilingual capabilities for global communication
            </p>
          </motion.div>

          {/* Languages Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                {/* Flag */}
                <div className="text-4xl mb-4">{language.flag}</div>
                
                {/* Language Name */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language.name}
                </h3>
                
                {/* Proficiency Level */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {language.level}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {language.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-gray-600 to-gray-800 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${language.proficiency}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {language.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Global Communication
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Multilingual capabilities enable effective collaboration in diverse, international environments 
                and contribute to research accessibility across different communities.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Languages 