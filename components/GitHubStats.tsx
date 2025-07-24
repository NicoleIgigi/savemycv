'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitBranch, Users, Calendar, Code, Activity } from 'lucide-react'

const GitHubStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      icon: <Github className="h-6 w-6" />,
      label: 'Public Repositories',
      value: '15+',
      description: 'Open source projects and research code',
    },
    {
      icon: <Star className="h-6 w-6" />,
      label: 'Total Stars',
      value: '45+',
      description: 'Stars received across repositories',
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      label: 'Contributions',
      value: '200+',
      description: 'Commits across all repositories',
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: 'Followers',
      value: '30+',
      description: 'GitHub community connections',
    },
  ]

  const languages = [
    { name: 'Python', percentage: 65, color: 'bg-gray-700' },
    { name: 'JavaScript', percentage: 20, color: 'bg-gray-600' },
    { name: 'R', percentage: 8, color: 'bg-gray-500' },
    { name: 'Java', percentage: 4, color: 'bg-gray-400' },
    { name: 'Other', percentage: 3, color: 'bg-gray-300' },
  ]

  const repositories = [
    {
      name: 'KinyarMedASR',
      description: 'Kinyarwanda Medical Speech Recognition system with transformer-based spell correction',
      language: 'Python',
      stars: 15,
      forks: 5,
      updated: '2 days ago',
      topics: ['nlp', 'speech-recognition', 'kinyarwanda', 'healthcare']
    },
    {
      name: 'VigiMobile-Analytics',
      description: 'ML algorithms for AEFI reporting and healthcare data analysis',
      language: 'Python',
      stars: 12,
      forks: 3,
      updated: '1 week ago',
      topics: ['machine-learning', 'healthcare', 'ensemble-methods']
    },
    {
      name: 'Security-Sentiment-Analysis',
      description: 'NLP analysis of security data from social media platforms',
      language: 'Python',
      stars: 8,
      forks: 2,
      updated: '3 weeks ago',
      topics: ['nlp', 'sentiment-analysis', 'security', 'geospatial']
    },
    {
      name: 'Titanic-ML-Analysis',
      description: 'Comprehensive machine learning analysis of Titanic survival data',
      language: 'Python',
      stars: 10,
      forks: 7,
      updated: '1 month ago',
      topics: ['machine-learning', 'data-science', 'kaggle']
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <section id="github" className="section-padding bg-white dark:bg-gray-900">
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
              GitHub Activity
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
              My coding journey and open source contributions
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-gray-600 dark:text-gray-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Language Usage */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Code className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                Most Used Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {lang.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                {languages.map((lang, index) => (
                  <motion.div
                    key={index}
                    className={lang.color}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${lang.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Contribution Activity */}
            <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                Contribution Activity
              </h3>
              
              {/* Contribution Grid Placeholder */}
              <div className="grid grid-cols-12 gap-1 mb-4">
                {Array.from({ length: 84 }, (_, i) => {
                  const intensity = Math.floor(Math.random() * 4)
                  const bgColor = intensity === 0 ? 'bg-gray-200 dark:bg-gray-700' :
                                  intensity === 1 ? 'bg-gray-400 dark:bg-gray-600' :
                                  intensity === 2 ? 'bg-gray-600 dark:bg-gray-500' :
                                  'bg-gray-800 dark:bg-gray-400'
                  return (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-sm ${bgColor}`}
                      title={`${intensity} contributions`}
                    />
                  )
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Less</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-500 rounded-sm"></div>
                  <div className="w-2 h-2 bg-gray-800 dark:bg-gray-400 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                <p><span className="font-semibold">180+</span> contributions in the last year</p>
                <p><span className="font-semibold">45</span> day streak (longest)</p>
              </div>
            </motion.div>
          </div>

          {/* Featured Repositories */}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Github className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              Featured Repositories
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {repositories.map((repo, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
                      {repo.name}
                    </h4>
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      {repo.language}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {repo.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="w-3 h-3" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{repo.updated}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {repo.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore more of my work and contributions on GitHub
            </p>
            <a
              href="https://github.com/NicoleIgigi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Github className="w-5 h-5" />
              <span>Visit My GitHub</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubStats 