// Utility function to get correct image/asset paths across environments
// Uses NEXT_PUBLIC_BASE_PATH when provided (e.g., '/My-Portfolio' on GitHub Pages)
// and empty on Vercel/custom domains
export const getImagePath = (imagePath) => {
  const configuredBase = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const basePath = configuredBase.replace(/\/$/, '') // remove trailing slash
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`
}

// Helper to get base path for other assets/links
export const getBasePath = () => {
  const configuredBase = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return configuredBase.replace(/\/$/, '')
}