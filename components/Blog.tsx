'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Calendar, ArrowRight, Tag, User, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [subscribeMessage, setSubscribeMessage] = useState('')
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform data to match existing structure
      const transformedPosts = data.map(post => ({
        title: post.title,
        excerpt: post.excerpt,
        date: new Date(post.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readTime: '5 min read', // You can calculate this or add to database
        category: 'AI & Technology', // You can add category field to database
        image: post.image || '/images/default-blog.png',
        tags: ['AI', 'Technology'], // You can add tags field to database
        featured: post.featured,
        link: post.link || '#'
      }))

      setArticles(transformedPosts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      // Fallback to empty array or show error message
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscribeStatus('error')
      setSubscribeMessage('Please enter a valid email address.')
      return
    }

    setIsSubscribing(true)
    setSubscribeStatus('idle')

    try {
      // Using Formspree for newsletter subscription
      const response = await fetch('https://formspree.io/f/mldejdqp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subject: 'Newsletter Subscription',
          message: `New newsletter subscription from: ${email}`,
          type: 'newsletter_subscription'
        }),
      })

      if (response.ok) {
        setSubscribeStatus('success')
        setSubscribeMessage('🎉 Thank you for subscribing! You\'ll receive updates on new articles and insights.')
        setEmail('')
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubscribeStatus('idle')
          setSubscribeMessage('')
        }, 5000)
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      setSubscribeStatus('error')
      setSubscribeMessage('Sorry, there was an error with your subscription. Please try again or contact me directly.')
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubscribing(false)
    }
  }

  // Fallback articles if no data from CMS
  const fallbackArticles = [
    {
      title: 'Voice to Vital Signs: Building Kinyarwanda Speech Recognition for African Healthcare',
      excerpt: 'Exploring how speech recognition technology can bridge the healthcare documentation gap in African countries, with insights from our Kinyarwanda medical ASR research.',
      date: 'December 15, 2024',
      readTime: '8 min read',
      category: 'Healthcare AI',
      image: '/images/Voice Vital.png',
      tags: ['AI', 'Healthcare', 'Africa', 'Speech Recognition'],
      featured: true,
      link: 'https://medium.com/@nicoleigiranezaishimwe/voice-to-vital-signs-building-kinyarwanda-speech-recognition-for-african-healthcare-ed1627b0252b'
    },
    {
      title: 'Detecting Danger Before It Spreads: ML-Powered Pharmacovigilance in Rwanda',
      excerpt: 'How supervised learning algorithms are transforming adverse event reporting in Rwanda\'s healthcare system, improving patient safety through intelligent automation.',
      date: 'November 28, 2024',
      readTime: '6 min read',
      category: 'Machine Learning',
      image: '/images/Detecting Danger.png',
      tags: ['Machine Learning', 'Pharmacovigilance', 'Healthcare', 'Rwanda'],
      featured: true,
      link: 'https://medium.com/@nicoleigiranezaishimwe/detecting-danger-before-it-spreads-ml-powered-pharmacovigilance-in-rwanda-47c4578981ce'
    },
    {
      title: 'AI in Our Own Words: Why Local Language Processing Matters',
      excerpt: 'Why developing AI systems in native languages matters for global accessibility and how our work with Kinyarwanda NLP contributes to this mission.',
      date: 'November 10, 2024',
      readTime: '5 min read',
      category: 'AI Ethics',
      image: '/images/kinyamedASR project image.png',
      tags: ['AI Ethics', 'NLP', 'Inclusivity', 'Local Languages'],
      featured: false,
      link: 'https://medium.com/@nicoleigiranezaishimwe/ai-in-our-own-words-why-local-language-processing-matters-682291166bbf'
    },
    {
      title: 'From Python Classes to ML Research: My Unexpected Path in Tech',
      excerpt: 'Reflecting on my experience training 70+ students in programming and how it shaped my approach to research and community impact.',
      date: 'October 22, 2024',
      readTime: '4 min read',
      category: 'Education',
      image: '/images/From Python Classes.png',
      tags: ['Education', 'Programming', 'Community', 'Training'],
      featured: false,
      link: 'https://medium.com/@nicoleigiranezaishimwe/from-python-classes-to-ml-research-my-unexpected-path-in-tech-9c80e30527d3'
    },
    {
      title: "Why One Model Isn't Enough: Ensemble Learning in Healthcare Prediction",
      excerpt: 'Deep dive into how combining multiple machine learning models can improve prediction accuracy in healthcare applications through ensemble methods.',
      date: 'September 30, 2024',
      readTime: '6 min read',
      category: 'Machine Learning',
      image: '/images/One Model.png',
      tags: ['Ensemble Methods', 'Healthcare', 'Prediction', 'ML'],
      featured: false,
      link: 'https://medium.com/@nicoleigiranezaishimwe/why-one-model-isnt-enough-ensemble-learning-in-healthcare-prediction-05cf91da217f'
    },
    {
      title: 'Mapping Fear: How We Used Twitter and NLP to Analyze Security in Rwanda',
      excerpt: 'How geospatial analysis and sentiment mining of social media data can contribute to improved security measures and community safety.',
      date: 'September 18, 2024',
      readTime: '7 min read',
      category: 'Data Science',
      image: '/images/Mapping Fear image.png',
      tags: ['Data Science', 'Social Good', 'Security', 'Geospatial'],
      featured: false,
      link: 'https://medium.com/@nicoleigiranezaishimwe/mapping-fear-how-we-used-twitter-and-nlp-to-analyze-security-in-rwanda-7fe8b50167a3'
    },
  ]

  // Use fallback articles if loading or if CMS has no data
  const displayArticles = loading || articles.length === 0 ? fallbackArticles : articles

  const categories = [
    { name: 'All', count: displayArticles.length },
    { name: 'Healthcare AI', count: displayArticles.filter(a => a.category === 'Healthcare AI').length },
    { name: 'Machine Learning', count: displayArticles.filter(a => a.category === 'Machine Learning').length },
    { name: 'AI Ethics', count: displayArticles.filter(a => a.category === 'AI Ethics').length },
    { name: 'Education', count: displayArticles.filter(a => a.category === 'Education').length },
    { name: 'Data Science', count: displayArticles.filter(a => a.category === 'Data Science').length },
  ]

  const featuredArticles = displayArticles.filter(article => article.featured)
  const regularArticles = displayArticles.filter(article => !article.featured)

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
    <section id="blog" className="section-padding bg-gray-50 dark:bg-gray-800">
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
              Articles & Insights
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
              Sharing knowledge and insights from my journey in AI, healthcare, and technology
            </p>
          </motion.div>

          {/* Featured Articles */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-gray-600 dark:text-gray-400" />
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                  onClick={() => article.link && window.open(article.link, '_blank')}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/images/nicole profile picture.jpg'
                      }}
                      style={{ objectPosition: 'center center' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gray-900 dark:bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <span className="text-sm font-medium mr-1">Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Regular Articles */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Articles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => article.link && window.open(article.link, '_blank')}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/images/nicole profile picture.jpg'
                      }}
                      style={{ objectPosition: 'center center' }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      {article.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <span className="text-xs font-medium mr-1">Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tags Cloud */}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              Popular Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {Array.from(new Set(articles.flatMap(article => article.tags))).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get notified about new articles and insights on AI, healthcare technology, and research
              </p>
              
              {/* Success/Error Messages */}
              {subscribeMessage && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  subscribeStatus === 'success' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                    : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                }`}>
                  {subscribeMessage}
                </div>
              )}

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-900 dark:text-white disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubscribing || !email}
                  className="px-6 py-2 bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  {isSubscribing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Subscribe to get notified when I publish new articles on AI, healthcare technology, and research insights.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog 