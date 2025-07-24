'use client'

import { motion } from 'framer-motion'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
  text?: string
  fullScreen?: boolean
}

const Loading = ({ 
  size = 'md', 
  color = 'primary', 
  text = 'Loading...', 
  fullScreen = false 
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  const colorClasses = {
    primary: 'border-gray-900 dark:border-gray-300',
    white: 'border-white',
    gray: 'border-gray-500'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        aria-label="Loading"
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-gray-600 dark:text-gray-300 ${textSizeClasses[size]}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50"
      >
        {spinner}
      </motion.div>
    )
  }

  return spinner
}

// Skeleton loading component
export const SkeletonLoader = ({ 
  className = "h-4 w-full", 
  count = 1 
}: { 
  className?: string, 
  count?: number 
}) => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-300 dark:bg-gray-700 rounded ${className} ${
            index !== count - 1 ? 'mb-2' : ''
          }`}
        />
      ))}
    </div>
  )
}

// Card skeleton loader
export const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}

// Button loading state
export const ButtonLoading = ({ 
  text = 'Loading...', 
  className = '' 
}: { 
  text?: string, 
  className?: string 
}) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
      <span>{text}</span>
    </div>
  )
}

export default Loading 