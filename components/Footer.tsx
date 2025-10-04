'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowUp } from 'lucide-react'
import { getImagePath } from '@/lib/utils'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigationLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]

  const projectLinks = [
    { name: 'KinyarMedASR', href: '#projects' },
    { name: 'VigiMobile', href: '#projects' },
    { name: 'Security Analysis', href: '#projects' },
    { name: 'GIS Disaster Analysis', href: '#projects' },
    { name: 'Titanic Analysis', href: '#projects' },
  ]

  const resourceLinks = [
    { name: 'Certificates', href: '#certificates' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'GitHub Stats', href: '#github' },
    { name: 'Blog', href: '#blog' },
    { name: 'Languages', href: '#languages' },
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nicole-igiraneza-ishimwe/',
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/NicoleIgigi',
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: 'Email',
      url: 'mailto:nii@alumni.cmu.edu',
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container-custom pl-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-600 mr-4">
                  <img 
                    src={getImagePath('images/nicole profile picture.jpg')} 
                    alt="Nicole Igiraneza" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nicole Igiraneza Ishimwe</h3>
                  <p className="text-gray-400">ML/AI Engineer & Graduate Research Assistant</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Passionate about leveraging Machine Learning and AI to solve real-world problems. 
                Currently conducting research at Carnegie Mellon University Africa and contributing 
                to safety-critical systems at Zipline.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Kigali, Rwanda</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+250785262657" className="hover:text-white transition-colors">
                    +250 785 262 657
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:nii@alumni.cmu.edu" className="hover:text-white transition-colors">
                    nii@alumni.cmu.edu
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href.slice(1))}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Featured Projects</h4>
              <ul className="space-y-2">
                {projectLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href.slice(1))}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources Section */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <h4 className="text-lg font-semibold mb-4">Resources & More</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {resourceLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href.slice(1))}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Nicole Igiraneza Ishimwe. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with Next.js, React, and Tailwind CSS
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-gray-400 text-sm">
                <ExternalLink className="h-4 w-4 inline mr-1" />
                <a 
                  href="https://www.cmu.edu/africa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Carnegie Mellon University Africa
                </a>
              </div>
              
              <motion.button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">
              Designed with ❤️ in Kigali, Rwanda.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 