// Utility function to get correct image paths for GitHub Pages deployment
export const getImagePath = (imagePath) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/My-Portfolio' : ''
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  
  return `${basePath}/${cleanPath}`
}

// Helper to get base path for other assets
export const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/My-Portfolio' : ''
} 