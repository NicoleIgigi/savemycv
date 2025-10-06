import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://nicole-igiraneza-ishimwe.vercel.app'),
  title: {
    default: 'Nicole Igiraneza Ishimwe - ML/AI Engineer & Data Scientist',
    template: '%s | Nicole Igiraneza Ishimwe'
  },
  description: 'Graduate Research Assistant at CMU-Africa | Perception Annotator at Zipline | Mastercard Foundation Scholar | Specializing in Machine Learning, AI, and Data Analytics for healthcare and social impact across Africa.',
  keywords: [
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science',
    'Research',
    'Rwanda',
    'Carnegie Mellon University',
    'Zipline',
    'Healthcare AI',
    'NLP',
    'Speech Recognition',
    'Kinyarwanda',
    'AEFI',
    'Geospatial Analysis',
    'Computer Vision',
    'Deep Learning',
    'Python',
    'GIS',
    'ArcGIS',
    'Pharmacovigilance',
    'Medical ASR',
    'Mastercard Foundation Scholar',
    'Graduate Research Assistant',
    'Perception Annotator',
    'African AI Research',
    'Healthcare Technology',
    'Data Analytics',
    'Statistical Analysis',
    'Neural Networks',
    'Ensemble Methods'
  ],
  authors: [{ name: 'Nicole Igiraneza Ishimwe', url: 'https://www.linkedin.com/in/nicole-igiraneza-ishimwe/' }],
  creator: 'Nicole Igiraneza Ishimwe',
  publisher: 'Nicole Igiraneza Ishimwe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Nicole Igiraneza Ishimwe - ML/AI Engineer & Data Scientist',
    description: 'Graduate Research Assistant at CMU-Africa | Perception Annotator at Zipline | Mastercard Foundation Scholar specializing in ML/AI for healthcare and social impact.',
    url: 'https://nicole-igiraneza-ishimwe.vercel.app',
    siteName: 'Nicole Igiraneza Ishimwe Portfolio',
    images: [
      {
        url: '/images/nicole profile picture.jpg',
        width: 800,
        height: 600,
        alt: 'Nicole Igiraneza Ishimwe - ML/AI Engineer & Data Scientist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicole Igiraneza Ishimwe - ML/AI Engineer & Data Scientist',
    description: 'Graduate Research Assistant at CMU-Africa | Perception Annotator at Zipline | Mastercard Foundation Scholar',
    images: ['/images/nicole profile picture.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
  },
  category: 'technology',
  classification: 'Personal Portfolio',
  alternates: {
    canonical: 'https://nicole-igiraneza-ishimwe.vercel.app',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nicole Igiraneza Ishimwe',
    jobTitle: ['ML/AI Engineer', 'Graduate Research Assistant', 'Perception Annotator'],
    description: 'Graduate Research Assistant at Carnegie Mellon University Africa and Perception Annotator at Zipline, specializing in Machine Learning and AI for healthcare and social impact.',
    url: 'https://nicole-igiraneza-ishimwe.vercel.app',
    image: 'https://nicole-igiraneza-ishimwe.vercel.app/images/nicole profile picture.jpg',
    email: 'nii@alumni.cmu.edu',
    telephone: '+250785262657',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kigali',
      addressCountry: 'Rwanda'
    },
    affiliation: [
      {
        '@type': 'Organization',
        name: 'Carnegie Mellon University Africa',
        url: 'https://www.cmu.edu/africa/'
      },
      {
        '@type': 'Organization',
        name: 'Zipline',
        url: 'https://www.zipline.com/'
      }
    ],
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'Carnegie Mellon University Africa',
        url: 'https://www.cmu.edu/africa/'
      },
      {
        '@type': 'Organization',
        name: 'Adventist University of Central Africa',
        url: 'https://www.auca.ac.rw/'
      }
    ],
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'Data Science',
      'Natural Language Processing',
      'Computer Vision',
      'Deep Learning',
      'Python Programming',
      'Healthcare AI',
      'Speech Recognition',
      'Geospatial Analysis',
      'Research',
      'Statistical Analysis'
    ],
    sameAs: [
      'https://www.linkedin.com/in/nicole-igiraneza-ishimwe/',
      'https://github.com/NicoleIgigi'
    ],
    nationality: 'Rwanda',
    gender: 'Female',
    birthPlace: {
      '@type': 'Place',
      name: 'Rwanda'
    },
    educationalCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Master of Science in Information Technology',
        educationalLevel: 'Graduate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Carnegie Mellon University Africa'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bachelor\'s Degree in Information Technology',
        educationalLevel: 'Undergraduate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Adventist University of Central Africa'
        }
      }
    ],
    award: [
      'Mastercard Foundation Scholar',
      'Best Trainer Award - SOLVIT AFRICA'
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Graduate Research Assistant',
        occupationLocation: {
          '@type': 'Place',
          name: 'Carnegie Mellon University Africa'
        }
      },
      {
        '@type': 'Occupation',
        name: 'Perception Annotator',
        occupationLocation: {
          '@type': 'Place',
          name: 'Zipline'
        }
      }
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 