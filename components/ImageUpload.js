'use client'

import { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import supabase from '@/lib/supabase'

export default function ImageUpload({ currentImage = '', onImageUpload, label = 'Image', folder = 'uploads' }) {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(currentImage || '')
  const [uploading, setUploading] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const handlePick = () => fileInputRef.current?.click()

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      // Create a unique path: folder/ts-filename
      const fileExt = file.name.split('.').pop()
      const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

      // Upload if supabase is properly configured; otherwise fail gracefully
      if (supabase?.storage) {
        const { error } = await supabase.storage.from('public').upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        })
        if (error) throw error
        const { data } = supabase.storage.from('public').getPublicUrl(filePath)
        const publicUrl = data?.publicUrl || ''
        setPreview(publicUrl)
        onImageUpload?.(publicUrl)
      } else {
        // Fallback: create a local preview and do nothing
        const localUrl = URL.createObjectURL(file)
        setPreview(localUrl)
      }
    } catch (err) {
      console.error('Image upload error:', err)
      alert('Failed to upload image. Please try pasting a URL instead.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleUseUrl = () => {
    const trimmed = urlValue.trim()
    if (!trimmed) return
    setPreview(trimmed)
    onImageUpload?.(trimmed)
    setUrlValue('')
  }

  const clearImage = () => {
    setPreview('')
    onImageUpload?.('')
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="preview" className="w-full h-40 object-cover rounded border" />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full shadow"
            title="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-28 border border-dashed rounded text-gray-500">
          <ImageIcon className="h-6 w-6 mr-2" /> No image selected
        </div>
      )}

      <div className="flex gap-2">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button
          type="button"
          onClick={handlePick}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        <div className="flex-1 flex gap-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="Or paste image URL"
            className="w-full p-2 border rounded"
          />
          <button type="button" onClick={handleUseUrl} className="px-3 py-2 border rounded bg-white hover:bg-gray-50">
            Use URL
          </button>
        </div>
      </div>
    </div>
  )
}


