'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Calendar, Users, Award, ExternalLink, Github } from 'lucide-react'

interface ProjectDetailProps {
  isOpen: boolean
  onClose: () => void
  projectIndex: number
  onNextProject: () => void
  onPrevProject: () => void
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ 
  isOpen, 
  onClose, 
  projectIndex, 
  onNextProject, 
  onPrevProject 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const projects = [
    {
      title: 'KinyarMedASR: Kinyarwanda Medical Speech Recognition',
      period: 'Sep 2024 - Dec 2024',
      institution: 'Carnegie Mellon University',
      image: '/images/kinyamedASR%20project%20image.png',
      description: 'Enhanced Automatic Speech Recognition (ASR) technology for Kinyarwanda medical contexts, addressing critical healthcare documentation challenges in Africa where there are only 1.55 health workers per 1,000 people.',
      detailedDescription: `This groundbreaking project was developed as part of the Introduction to Deep Learning (11-785) course at Carnegie Mellon University. Our team of four researchers worked to create a specialized ASR system that could accurately transcribe medical conversations in Kinyarwanda, Rwanda's native language.

The project addresses a critical healthcare challenge in Africa, where healthcare worker shortages make efficient documentation crucial. By developing an ASR system specifically for medical contexts, we aimed to reduce the burden on healthcare professionals and improve patient care documentation.

Our innovative approach included transformer-based spell correction, which significantly improved accuracy by understanding the context of medical terminology in Kinyarwanda. The system was trained on a specialized dataset that we created by recording and transcribing medical conversations.`,
      achievements: [
        'Reduced Word Error Rate from 31.36% to 24.34% through innovative transformer-based spell correction',
        'Collaborated with a team of four researchers in an interdisciplinary environment',
        'Managed data aspects including dataset storage, versioning, and formatting for ML tasks',
        'Created specialized medical dataset by recording and transcribing audio samples',
        'Contributed to addressing healthcare worker shortage in Africa',
        'Developed novel approach to medical ASR for low-resource languages'
      ],
      technologies: ['Deep Learning', 'Transformer Models', 'Speech Recognition', 'Kinyarwanda NLP', 'Python', 'PyTorch', 'Hugging Face', 'Audio Processing'],
      type: 'Research',
      status: 'Completed',
      teamSize: 4,
      myRole: 'Data Engineer & ML Researcher',
      impact: 'Potential to improve healthcare documentation efficiency in Rwanda and other African countries',
      publications: ['KinyarMedASR Research Paper - CMU Deep Learning Conference 2024'],
      links: {
        github: 'https://github.com/nicole-igiraneza/kinyarmedasr',
        paper: '/documents/papers/Medi_ASR_Final.pdf',
        demo: 'https://youtu.be/gdQxt2BnPCQ'
      }
    },
    {
      title: 'VigiMobile: AEFI Reporting System',
      period: 'Aug 2024 - Present',
      institution: 'Carnegie Mellon University',
      image: '/images/vigimobile%20project%20image.png',
      description: 'Conducting research on Adverse Effects Following Immunization (AEFI) reporting using supervised learning algorithms and ensemble methods in collaboration with Rwanda Food and Drugs Authority.',
      detailedDescription: `VigiMobile is an ongoing research project that aims to revolutionize how adverse effects following immunization are reported and analyzed in Rwanda. Working under the supervision of Dr. Christine Niyizamwiyitira, this project represents a significant step forward in healthcare monitoring and vaccine safety.

The project involves close collaboration with the Rwanda Food and Drugs Authority (Rwanda FDA) and various healthcare providers across the country. We are developing machine learning models that can predict and classify AEFI events, helping healthcare professionals make more informed decisions about vaccination safety.

Our approach combines supervised learning algorithms with ensemble methods to create a robust system that can handle the complexity and variability of medical data. The system is designed to be user-friendly for healthcare workers while providing sophisticated analytics for health authorities.`,
      achievements: [
        'Implementing supervised learning algorithms for AEFI prediction in Rwanda\'s healthcare system',
        'Collaborating with Rwanda Food and Drugs Authority (Rwanda FDA) and healthcare providers',
        'Collecting, preprocessing, and analyzing healthcare data from multiple sources',
        'Preparing comprehensive research documentation and presentation materials',
        'Contributing to improved healthcare monitoring and safety systems',
        'Developing mobile-first reporting interface for healthcare workers'
      ],
      technologies: ['Machine Learning', 'Ensemble Methods', 'Healthcare Analytics', 'Python', 'Data Science', 'Mobile Development', 'API Development', 'Statistical Analysis'],
      type: 'Research',
      status: 'Ongoing',
      teamSize: 3,
      myRole: 'Lead ML Engineer & Data Scientist',
      impact: 'Improving vaccine safety monitoring across Rwanda\'s healthcare system',
      publications: ['VigiMobile: ML for AEFI Reporting - In Progress'],
      links: {
        github: 'https://github.com/nicole-igiraneza/vigimobile',
        paper: '/documents/papers/ENHANCING%20REPORTING%20AND%20PREDICTION%20OF%20ADVERSE%20EFFECTS%20FOLLOWING%20MATERNAL%20AND%20CHILD%20BCG%20IMMUNIZATION%20IN%20RWANDA%20Research%20poster.pdf',
        documentation: '/docs/vigimobile-docs.pdf'
      }
    },
    {
      title: 'Insecure Hotspots Analysis in Rwanda using Twitter Data',
      period: 'Jan 2024 - May 2024',
      institution: 'Carnegie Mellon University',
      image: '/images/insecure%20hotsposta%20analysis%20project%20image.png',
      description: 'Leading research initiative analyzing security data from Twitter using natural language processing and geospatial analysis to identify insecure areas in Rwanda.',
      detailedDescription: `This research project focused on leveraging social media data to understand and map security concerns across Rwanda. Using advanced natural language processing techniques and geospatial analysis, we developed a comprehensive system for identifying and analyzing security hotspots.

The project involved collecting and processing thousands of tweets related to security concerns in Rwanda, applying sentiment analysis to understand public perception of safety in different regions. We created sophisticated visualization tools that could map security sentiment across different provinces and districts.

Our methodology combined traditional NLP techniques with modern deep learning approaches to extract meaningful insights from social media data. The research has implications for urban planning, security resource allocation, and public safety initiatives.`,
      achievements: [
        'Designed comprehensive research methodology combining sentiment analysis with location data',
        'Collected and preprocessed Twitter data using Tweepy library and Twitter API',
        'Created visualization tools mapping security sentiment across different regions of Rwanda',
        'Produced actionable insights contributing to improved security measures',
        'Expanding methodology for application in multiple countries across Africa',
        'Developed real-time monitoring dashboard for security sentiment'
      ],
      technologies: ['Natural Language Processing', 'Geospatial Analysis', 'Twitter API', 'Python', 'Data Visualization', 'Sentiment Analysis', 'Machine Learning', 'Geographic Information Systems'],
      type: 'Research',
      status: 'Completed',
      teamSize: 2,
      myRole: 'Lead Researcher & Data Scientist',
      impact: 'Providing data-driven insights for security resource allocation in Rwanda',
      publications: ['Security Hotspots Analysis Research Paper - CMU 2024'],
      links: {
        github: 'https://github.com/nicole-igiraneza/rwanda-security-analysis',
        paper: '/documents/papers/Uncovering_Insecure_Hotspots_In_Rwanda_Through_Twitter_Analytics.pdf',
        visualization: 'https://viz.security-analysis.com'
      }
    },
    {
      title: 'Titanic Dataset Analysis and Survival Predictions',
      period: 'Sep 2023 - Nov 2023',
      institution: 'Personal Project',
      image: '/images/titanic%20dataset%20project%20image.png',
      description: 'Comprehensive machine learning project analyzing the Titanic dataset with multiple predictive models and advanced optimization techniques, achieving top 10% ranking on Kaggle.',
      detailedDescription: `This project represents a comprehensive exploration of machine learning techniques applied to the famous Titanic dataset. What started as a learning exercise evolved into a top-performing solution that ranked in the top 10% of Kaggle submissions.

The project involved extensive data cleaning and feature engineering, where I discovered hidden patterns in the data that significantly improved model performance. I implemented and compared multiple machine learning algorithms, from traditional approaches like logistic regression to advanced ensemble methods.

The success of this project came from meticulous attention to data preprocessing, creative feature engineering, and systematic hyperparameter optimization. I created a comprehensive pipeline that could be easily reproduced and extended to other classification problems.`,
      achievements: [
        'Conducted comprehensive data cleaning, feature engineering, and exploratory analysis',
        'Developed and compared multiple ML models (Logistic Regression, Decision Trees, Random Forests, SVM)',
        'Optimized model hyperparameters using grid search and cross-validation',
        'Achieved top 10% ranking on the Kaggle leaderboard',
        'Created visualization dashboard to communicate findings and model performance',
        'Implemented automated model selection and ensemble techniques'
      ],
      technologies: ['Machine Learning', 'Python', 'Scikit-learn', 'Pandas', 'Data Visualization', 'Jupyter Notebooks', 'Hyperparameter Optimization', 'Ensemble Methods'],
      type: 'Academic',
      status: 'Completed',
      teamSize: 1,
      myRole: 'Solo Developer & Data Scientist',
      impact: 'Demonstrated advanced ML skills and achieved competitive performance on Kaggle',
      publications: ['Titanic Survival Prediction - Kaggle Competition Report'],
      links: {
        github: 'https://github.com/nicole-igiraneza/titanic-analysis',
        kaggle: 'https://kaggle.com/nicole-igiraneza/titanic-survival-prediction',
        notebook: 'https://kaggle.com/code/nicole-igiraneza/titanic-comprehensive-analysis'
      }
    },
    {
      title: 'Geospatial Analysis of Disaster Patterns in Africa: Comparative Study of Sub-Saharan and Northern Regions (2000-2025)',
      period: 'Jan 2025 - Apr 2025',
      institution: 'Carnegie Mellon University',
      image: '/images/gis%20project%20image.png',
      description: 'Comprehensive geospatial analysis comparing disaster patterns between Sub-Saharan and Northern Africa using interactive dashboards and StoryMap visualization.',
      detailedDescription: `This project developed an interactive dashboard and accompanying StoryMap to visualize and compare disaster trends across Sub-Saharan and Northern Africa from 2000 to 2025. Working as part of a three-member team in the Geospatial Health Analytics course, we analyzed 4,174 disaster records from the EM-DAT International Disaster Database.

The spatial and temporal dynamics of disasters are often difficult to interpret from raw datasets alone. Our project addressed this challenge by creating visualizations that clearly illustrate regional differences in disaster patterns and their human impacts. This analysis provides valuable insights for governments, humanitarian organizations, and international agencies to better plan and prioritize their efforts in disaster response and mitigation.

Our analysis revealed that Sub-Saharan Africa has experienced approximately 4.5 times more disaster-related deaths than Northern Africa during the study period, with transport-related disasters (39.17%) being the dominant type in Sub-Saharan Africa. We created two complementary dashboards focusing on human impact comparisons and disaster trends, integrated with an ArcGIS StoryMap for narrative-driven exploration.`,
      achievements: [
        'Analyzed 4,174 disaster records across Africa spanning 25 years (2000-2025)',
        'Revealed Sub-Saharan Africa experienced 4.5x more disaster-related deaths (196,400 vs 43,600)',
        'Created interactive ArcGIS dashboards with temporal and regional filtering capabilities',
        'Developed comprehensive StoryMap for narrative-driven data exploration',
        'Identified transport disasters (39.17%) as the dominant disaster type in Sub-Saharan Africa',
        'Revealed that five countries account for nearly 50% of all disaster-related deaths',
        'Implemented advanced GIS techniques including choropleth mapping and time-enabled visualization',
        'Provided actionable insights for disaster management professionals and policymakers'
      ],
      technologies: ['ArcGIS Pro', 'ArcGIS Online', 'Geospatial Analysis', 'Data Visualization', 'StoryMap', 'Statistical Analysis', 'Choropleth Mapping', 'Time-enabled Mapping'],
      type: 'Research',
      status: 'Completed',
      teamSize: 3,
      myRole: 'GIS Analyst & Data Visualization Specialist',
      impact: 'Providing geospatial insights for disaster risk management and resource allocation across Africa',
      publications: ['Geospatial Analysis of Disaster Patterns in Africa - Final Report 2025'],
      links: {
        demo: 'https://experience.arcgis.com/experience/cd4cf819a07d4450a8ad07d226d1f7a1',
        visualization: 'https://experience.arcgis.com/experience/cd4cf819a07d4450a8ad07d226d1f7a1/page/Story-Map'
      }
    }
  ]

  const currentProject = projects[projectIndex]

  // Reset image loading state when project changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [projectIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrevProject()
    if (e.key === 'ArrowRight') onNextProject()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-dark-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onPrevProject}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                title="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-dark-900 dark:text-white">
                {currentProject.title}
              </h1>
              <button
                onClick={onNextProject}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                title="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Project Image */}
            <div className="mb-6 relative">
              {!imageLoaded && !imageError && (
                <div className="w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              )}
              {imageError && (
                <div className="w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Failed to load image</div>
                  </div>
                </div>
              )}
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className={`w-full h-80 md:h-96 object-contain bg-gray-50 dark:bg-gray-800 rounded-lg transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true)
                  setImageLoaded(false)
                }}
                style={{ display: imageError ? 'none' : 'block' }}
              />
            </div>

            {/* Project Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">Project Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span className="text-dark-600 dark:text-dark-300">{currentProject.period}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary-600" />
                    <span className="text-dark-600 dark:text-dark-300">{currentProject.teamSize} member{currentProject.teamSize > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-primary-600" />
                    <span className="text-dark-600 dark:text-dark-300">{currentProject.myRole}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">Status & Impact</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProject.status === 'Ongoing'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {currentProject.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProject.type === 'Research' 
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                    }`}>
                      {currentProject.type}
                    </span>
                  </div>
                  <p className="text-dark-600 dark:text-dark-300 text-sm">
                    {currentProject.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">Description</h2>
              <div className="text-dark-600 dark:text-dark-300 leading-relaxed whitespace-pre-line">
                {currentProject.detailedDescription}
              </div>
            </div>

            {/* Key Achievements */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">Key Achievements</h2>
              <ul className="list-disc list-inside space-y-2 text-dark-600 dark:text-dark-300">
                {currentProject.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">Project Links</h2>
              <div className="flex flex-wrap gap-4">
                {currentProject.links.github && (
                  <a
                    href={currentProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {currentProject.links.demo && (
                  <a
                    href={currentProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {currentProject.links.paper && (
                  <a
                    href={currentProject.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Research Paper</span>
                  </a>
                )}
                {currentProject.links.documentation && (
                  <a
                    href={currentProject.links.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Documentation</span>
                  </a>
                )}
                {currentProject.links.visualization && (
                  <a
                    href={currentProject.links.visualization}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visualization</span>
                  </a>
                )}
                {currentProject.links.kaggle && (
                  <a
                    href={currentProject.links.kaggle}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Kaggle</span>
                  </a>
                )}
                {currentProject.links.notebook && (
                  <a
                    href={currentProject.links.notebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Notebook</span>
                  </a>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={onPrevProject}
                className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Project</span>
              </button>
              
              <span className="text-dark-600 dark:text-dark-300">
                {projectIndex + 1} of {projects.length}
              </span>
              
              <button
                onClick={onNextProject}
                className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-colors"
              >
                <span>Next Project</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectDetail 