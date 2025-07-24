'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: 'Lillian Ingabire',
      role: 'Program Manager',
      company: 'SOLVIT AFRICA',
      image: '/images/lillian ingabire pic.jpg',
      testimonial: 'Nicole has been an exceptional trainer and mentor in our program. Her dedication to teaching Python and Django is unmatched, and she has consistently delivered outstanding results. She received our Best Trainer Award for her exceptional ability to simplify complex concepts and provide personalized support to every participant. Her technical expertise combined with her natural teaching ability makes her invaluable to our team.',
      rating: 5,
    },
    {
      name: 'Umutoni Huda',
      role: 'Software Developer',
      company: 'SOLVIT AFRICA Graduate',
      image: '/images/huda umutoni.jpg',
      testimonial: 'Nicole was my trainer during the Python Django program at SOLVIT AFRICA. Her teaching approach is incredibly patient and thorough. She always made sure everyone understood the concepts before moving forward and provided excellent practical examples. Thanks to her guidance, I successfully transitioned into a career in software development. She truly cares about her students\' success and goes above and beyond to help them achieve their goals.',
      rating: 5,
    },
    {
      name: 'Uwamahoro Joyeuse',
      role: 'Research Colleague',
      company: 'Carnegie Mellon University Africa',
      image: '/images/joyeuse uwamahoro.jpg',
      testimonial: 'Working with Nicole on our research projects has been a remarkable experience. Her analytical skills and deep understanding of machine learning algorithms are impressive. She brings innovative approaches to problem-solving and has been instrumental in the success of our VigiMobile project. Her collaborative spirit and attention to detail make her an excellent research partner. Nicole consistently delivers high-quality work and contributes valuable insights to our team.',
      rating: 5,
    },
    {
      name: 'Dr. Christine Niyizamwiyitira',
      role: 'Professor & Research Supervisor',
      company: 'Carnegie Mellon University Africa',
      image: '/images/christine niyizamwiyitira.jpg',
      testimonial: 'Nicole is an outstanding graduate research assistant who demonstrates exceptional academic excellence and research capabilities. Her work on the VigiMobile project for AEFI reporting has been exemplary, showing strong analytical skills and innovative thinking. She approaches research with dedication and professionalism, consistently producing high-quality results. Her ability to work collaboratively with healthcare partners and translate complex technical concepts into practical solutions is remarkable. Nicole is a valuable asset to our research team.',
      rating: 5,
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
    <section id="testimonials" className="section-padding bg-gray-50 dark:bg-gray-800">
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
              What People Say
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Testimonials from colleagues, students, and supervisors I've worked with
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-gray-200 dark:text-gray-700">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                  "{testimonial.testimonial}"
                </p>

                {/* Person Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-avatar.png'
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Want to work with me or learn more about my experience?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials 