'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Plus, Trash2, Edit3, Loader } from 'lucide-react'

export default function BioPage() {
  const [bioSections, setBioSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [newSection, setNewSection] = useState({
    section_name: '',
    title: '',
    content: '',
    image_url: '',
    data: {}
  })

  useEffect(() => {
    fetchBioSections()
  }, [])

  const fetchBioSections = async () => {
    try {
      const { data, error } = await supabase
        .from('bio_sections')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBioSections(data || [])
    } catch (error) {
      console.error('Error fetching bio sections:', error)
      setBioSections([])
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSection = async (section) => {
    setSaving(true)
    try {
      if (section.id) {
        // Update existing section
        const { error } = await supabase
          .from('bio_sections')
          .update({
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            data: section.data
          })
          .eq('id', section.id)

        if (error) throw error
      } else {
        // Create new section
        const { error } = await supabase
          .from('bio_sections')
          .insert([{
            section_name: section.section_name,
            title: section.title,
            content: section.content,
            image_url: section.image_url,
            data: section.data
          }])

        if (error) throw error
        setNewSection({
          section_name: '',
          title: '',
          content: '',
          image_url: '',
          data: {}
        })
      }

      await fetchBioSections()
      setEditingSection(null)
    } catch (error) {
      console.error('Error saving section:', error)
      alert('Error saving section: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSection = async (id) => {
    if (!confirm('Are you sure you want to delete this section?')) return

    try {
      const { error } = await supabase
        .from('bio_sections')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchBioSections()
    } catch (error) {
      console.error('Error deleting section:', error)
      alert('Error deleting section: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bio & About Sections</h1>
          <button
            onClick={() => setEditingSection('new')}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Section</span>
          </button>
        </div>

        {/* New Section Form */}
        {editingSection === 'new' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Bio Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name
                </label>
                <input
                  type="text"
                  value={newSection.section_name}
                  onChange={(e) => setNewSection({...newSection, section_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., hero, about, skills"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={newSection.content}
                  onChange={(e) => setNewSection({...newSection, content: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newSection.image_url}
                  onChange={(e) => setNewSection({...newSection, image_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleSaveSection(newSection)}
                  disabled={saving}
                  className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save Section'}</span>
                </button>
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Sections */}
        <div className="space-y-4">
          {bioSections.map((section) => (
            <div key={section.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{section.title || section.section_name}</h3>
                  <p className="text-sm text-gray-500">Section: {section.section_name}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingSection(section.id)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {editingSection === section.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={(e) => {
                        const updated = bioSections.map(s => 
                          s.id === section.id ? {...s, title: e.target.value} : s
                        )
                        setBioSections(updated)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={section.content || ''}
                      onChange={(e) => {
                        const updated = bioSections.map(s => 
                          s.id === section.id ? {...s, content: e.target.value} : s
                        )
                        setBioSections(updated)
                      }}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSaveSection(section)}
                      disabled={saving}
                      className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      onClick={() => setEditingSection(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {section.content && (
                    <p className="text-gray-700 mb-2">{section.content}</p>
                  )}
                  {section.image_url && (
                    <img 
                      src={section.image_url} 
                      alt={section.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {bioSections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No bio sections found</p>
            <button
              onClick={() => setEditingSection('new')}
              className="text-primary-600 hover:text-primary-700"
            >
              Add your first bio section
            </button>
          </div>
        )}
      </div>
    </div>
  )
}