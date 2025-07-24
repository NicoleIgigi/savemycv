'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Calendar, ExternalLink, X, ZoomIn } from 'lucide-react'
import { useState } from 'react'

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)

  const certificates = [
    {
      title: 'Business Analytics Professional Certificate',
      issuer: 'University of Pennsylvania',
      date: 'March 2024',
      logo: '/images/university_of_pennsylvania_logo.jpg',
      description: 'Comprehensive business analytics program covering data-driven decision making, statistical analysis, and business intelligence.',
      credential: 'Coursera Certificate',
      skills: ['Business Analytics', 'Data Analysis', 'Statistical Modeling', 'Business Intelligence'],
      link: 'https://coursera.org/share/8f9609d4114c4cb4d179e5aa03a90e96',
      certificateImage: '/images/certificates/business analytics certificate.png',
    },
    {
      title: 'Google Business Intelligence Professional Certificate',
      issuer: 'Google',
      date: 'February 2024',
      logo: '/images/google_logo.jpg',
      description: 'Advanced business intelligence certification covering data visualization, reporting, and strategic analytics.',
      credential: 'Google Certificate',
      skills: ['Business Intelligence', 'Data Visualization', 'Reporting', 'Strategic Analytics'],
      link: 'https://coursera.org/share/f4940e4ccf8e11978df0775ec306875a',
      certificateImage: '/images/certificates/Google business intelligence certificate.png',
    },
    {
      title: 'Strategic Leadership and Management Specialization',
      issuer: 'University of Illinois Urbana-Champaign',
      date: 'January 2024',
      logo: '/images/illinois logo.jpg',
      description: 'Comprehensive leadership program focusing on strategic thinking, organizational management, and team leadership.',
      credential: 'Coursera Specialization',
      skills: ['Strategic Leadership', 'Management', 'Team Leadership', 'Organizational Strategy'],
      link: 'https://coursera.org/share/86383c61f1e6b7fa3298d76c5c6033f0',
      certificateImage: '/images/certificates/Strategic Leadership and Management Specialization certificate.png',
    },
    {
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google',
      date: 'December 2023',
      logo: '/images/google_logo.jpg',
      description: 'Comprehensive data analytics program covering data collection, analysis, visualization, and interpretation.',
      credential: 'Google Certificate',
      skills: ['Data Analytics', 'Data Visualization', 'Statistical Analysis', 'Python', 'R', 'SQL'],
      link: 'https://coursera.org/share/bfc8a010e210c07f7e41bf69b7dc840a',
      certificateImage: '/images/certificates/Google data analytics proffessional certificate.png',
    },
    {
      title: 'Enhancing Capacities of Youth-Led Organizations',
      issuer: 'ITCILO',
      date: 'June 2022',
      logo: '/images/itcilo logo.jpg',
      description: 'Digital Employment Services for Youth in Africa - Leadership and capacity building.',
      credential: 'ITCILO-789012',
      skills: ['Youth Leadership', 'Digital Services', 'Capacity Building'],
    },
    {
      title: 'Python/Django Developer',
      issuer: 'SOLVIT AFRICA',
      date: 'May 2022',
      logo: '/images/solvit africa logo.jpg',
      description: 'Professional certification in Python and Django web development.',
      credential: 'SOLVIT-345678',
      skills: ['Python', 'Django', 'Web Development'],
    },
    {
      title: 'Entrepreneurship Training Certificate',
      issuer: 'kLab Rwanda',
      date: 'January 2022',
      logo: '/images/klab logo.jpg',
      description: 'Comprehensive entrepreneurship training program for tech startups.',
      credential: 'KLAB-456789',
      skills: ['Entrepreneurship', 'Startup Development', 'Business Planning'],
    },
    {
      title: 'Entrepreneurship Certificate',
      issuer: 'Rwanda ICT Chamber',
      date: 'December 2021',
      logo: '/images/ict chamber logo.jpg',
      description: 'ICT entrepreneurship and business development certification.',
      credential: 'RICTC-567890',
      skills: ['ICT Entrepreneurship', 'Business Development', 'Innovation'],
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
    <section id="certificates" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom pl-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-dark-900 dark:text-white mb-4">
              Professional Certificates
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full"></div>
            <p className="text-lg text-dark-600 dark:text-dark-300 mt-4 max-w-2xl mx-auto">
              Continuous learning through professional certifications and specialized training programs
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700 group"
              >
                {/* Certificate Image */}
                {cert.certificateImage && (
                  <div 
                    className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-800 dark:to-dark-700 flex items-center justify-center overflow-hidden cursor-pointer relative group"
                    onClick={() => setSelectedCertificate(cert.certificateImage)}
                  >
                    <img 
                      src={cert.certificateImage} 
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-certificate.png'
                      }}
                    />
                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-dark-700 p-2 flex items-center justify-center">
                        <img 
                          src={cert.logo} 
                          alt={cert.issuer}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-cert.png'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-dark-900 dark:text-white text-sm leading-tight">
                          {cert.title}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <Award className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-dark-600 dark:text-dark-300">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                    </div>

                    <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Credential ID and Actions */}
                    <div className="pt-3 border-t border-gray-200 dark:border-dark-600">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-dark-500 dark:text-dark-400">
                          Credential ID: {cert.credential}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors px-2 py-1 bg-primary-50 dark:bg-primary-900 rounded-md"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>View Certificate</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-dark-600 dark:text-dark-300 mb-4">
              View more certificates and credentials on my professional profiles
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/nicole-igiraneza-ishimwe/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200 z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Certificate Image */}
            <img 
              src={selectedCertificate} 
              alt="Full certificate view"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Certificates 