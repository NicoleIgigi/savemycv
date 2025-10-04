import Link from 'next/link'
import { Home } from 'lucide-react'
import { getBasePath } from '@/lib/utils'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center px-6">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-6">
          <Link
            href={`${getBasePath()}/`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 text-white rounded-lg"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

