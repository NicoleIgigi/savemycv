'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone } from 'lucide-react'

export default function StickyCTA() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isMobile) return null

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-md flex gap-3">
        <button
          onClick={scrollToContact}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-gray-600 text-white rounded-full shadow-lg"
        >
          <Mail className="h-5 w-5" /> Hire me / Contact
        </button>
        <a
          href="tel:+250785262657"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full shadow-md"
          aria-label="Call"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}

