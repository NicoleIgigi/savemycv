'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Plus, Trash2, Edit3, GraduationCap, Award, BookOpen, Loader } from 'lucide-react'

export default function EducationPage() {
  const [educationItems, setEducationItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newItem, setNewItem] = useState({
    type: 'education',
    title: '',
    institution: '',
    description: '',
    image_url: '',
    url: '',
    date_completed: '',
    featured: false
  })

  const educationTypes = [
    { value: 'education', label: 'Education', icon: GraduationCap },
    { value: 'certification', label: 'Certification', icon: Award },
    { value: 'course', label: 'Course', icon: BookOpen }
  ]

  useEffect(() => {
    fetchEducationItems()
  }, [])

  const fetchEducationItems = async () => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('date_completed', { ascending: false })

      if (error) throw error
      setEducationItems(data || [])
    } catch (error) {
      console.error('Error fetching education items:', error)
      setEducationItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleSaveItem = async (item) => {
    setSaving(true)
    try {
      if (item.id) {
        // Update existing item
        const { error } = await supabase
          .from('education')
          .update({
            type: item.type,
            title: item.title,
            institution: item.institution,
            description: item.description,
            image_url: item.image_url,
            url: item.url,
            date_completed: item.date_completed || null,
            featured: item.featured
          })
          .eq('id', item.id)

        if (error) throw error
      } else {
        // Create new item
        const { error } = await supabase
          .from('education')
          .insert([{
            type: item.type,
            title: item.title,
            institution: item.institution,
            description: item.description,
            image_url: item.image_url,
            url: item.url,
            date_completed: item.date_completed || null,
            featured: item.featured
          }])

        if (error) throw error
        setNewItem({
          type: 'education',
          title: '',
          institution: '',
          description: '',
          image_url: '',
          url: '',
          date_completed: '',
          featured: false
        })
      }

      await fetchEducationItems()
      setEditingItem(null)
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Error saving item: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchEducationItems()
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Error deleting item: ' + error.message)
    }
  }

  const getTypeIcon = (type) => {
    const typeConfig = educationTypes.find(t => t.value === type)
    const IconComponent = typeConfig?.icon || GraduationCap
    return <IconComponent className="h-5 w-5" />
  }

  const getTypeLabel = (type) => {
    const typeConfig = educationTypes.find(t => t.value === type)
    return typeConfig?.label || 'Education'
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
          <h1 className="text-2xl font-bold text-gray-900">Education & Certifications</h1>
          <button
            onClick={() => setEditingItem('new')}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* New Item Form */}
        {editingItem === 'new' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Education Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {educationTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title/Degree
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Master of Science in Information Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution/Issuer
                </label>
                <input
                  type="text"
                  value={newItem.institution}
                  onChange={(e) => setNewItem({...newItem, institution: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Carnegie Mellon University Africa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief description or key achievements"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Completed
                  </label>
                  <input
                    type="date"
                    value={newItem.date_completed}
                    onChange={(e) => setNewItem({...newItem, date_completed: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate/Credential URL
                  </label>
                  <input
                    type="url"
                    value={newItem.url}
                    onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Logo URL
                </label>
                <input
                  type="url"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({...newItem, image_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newItem.featured}
                  onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured (show prominently)
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleSaveItem(newItem)}
                  disabled={saving}
                  className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save Item'}</span>
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Items */}
        <div className="space-y-4">
          {educationItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-primary-100 text-primary-600 rounded-lg">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.featured && (
                        <span className="px-2 py-1 text-xs bg-accent-100 text-accent-700 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{item.institution}</p>
                    <p className="text-sm text-gray-500">
                      {getTypeLabel(item.type)}
                      {item.date_completed && (
                        <span> • {new Date(item.date_completed).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item.id)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {editingItem === item.id ? (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={item.type}
                        onChange={(e) => {
                          const updated = educationItems.map(i => 
                            i.id === item.id ? {...i, type: e.target.value} : i
                          )
                          setEducationItems(updated)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {educationTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Completed
                      </label>
                      <input
                        type="date"
                        value={item.date_completed || ''}
                        onChange={(e) => {
                          const updated = educationItems.map(i => 
                            i.id === item.id ? {...i, date_completed: e.target.value} : i
                          )
                          setEducationItems(updated)
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title/Degree
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = educationItems.map(i => 
                          i.id === item.id ? {...i, title: e.target.value} : i
                        )
                        setEducationItems(updated)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution/Issuer
                    </label>
                    <input
                      type="text"
                      value={item.institution || ''}
                      onChange={(e) => {
                        const updated = educationItems.map(i => 
                          i.id === item.id ? {...i, institution: e.target.value} : i
                        )
                        setEducationItems(updated)
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => {
                        const updated = educationItems.map(i => 
                          i.id === item.id ? {...i, description: e.target.value} : i
                        )
                        setEducationItems(updated)
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`featured-${item.id}`}
                      checked={item.featured || false}
                      onChange={(e) => {
                        const updated = educationItems.map(i => 
                          i.id === item.id ? {...i, featured: e.target.checked} : i
                        )
                        setEducationItems(updated)
                      }}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`featured-${item.id}`} className="text-sm font-medium text-gray-700">
                      Featured
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSaveItem(item)}
                      disabled={saving}
                      className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {item.description && (
                    <p className="text-gray-700 mb-3">{item.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                      >
                        <span>View Certificate</span>
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {item.image_url && (
                      <span>Has logo</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {educationItems.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No education items found</p>
            <button
              onClick={() => setEditingItem('new')}
              className="text-primary-600 hover:text-primary-700"
            >
              Add your first education item
            </button>
          </div>
        )}
      </div>
    </div>
  )
}