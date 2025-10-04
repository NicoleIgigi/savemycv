'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Mail, Phone, MapPin, ExternalLink, Loader } from 'lucide-react'

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    location: '',
    social_links: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    },
    resume_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasExistingRecord, setHasExistingRecord] = useState(false)
  const [recordId, setRecordId] = useState(null)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setContactInfo({
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          social_links: data.social_links || {
            linkedin: '',
            github: '',
            twitter: '',
            website: ''
          },
          resume_url: data.resume_url || ''
        })
        setHasExistingRecord(true)
        setRecordId(data.id)
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const dataToSave = {
        email: contactInfo.email,
        phone: contactInfo.phone,
        location: contactInfo.location,
        social_links: contactInfo.social_links,
        resume_url: contactInfo.resume_url
      }

      if (hasExistingRecord && recordId) {
        // Update existing record
        const { error } = await supabase
          .from('contact_info')
          .update(dataToSave)
          .eq('id', recordId)

        if (error) throw error
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('contact_info')
          .insert([dataToSave])
          .select()
          .single()

        if (error) throw error
        setHasExistingRecord(true)
        setRecordId(data.id)
      }

      alert('Contact information saved successfully!')
    } catch (error) {
      console.error('Error saving contact info:', error)
      alert('Error saving contact information: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSocialLinkChange = (platform, value) => {
    setContactInfo(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value
      }
    }))
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
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            {/* Basic Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-500" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+250 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={contactInfo.location}
                    onChange={(e) => setContactInfo({...contactInfo, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Kigali, Rwanda"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-primary-500" />
                Social Media Links
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={contactInfo.social_links.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={contactInfo.social_links.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://github.com/your-username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter Profile
                  </label>
                  <input
                    type="url"
                    value={contactInfo.social_links.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://twitter.com/your-handle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Website
                  </label>
                  <input
                    type="url"
                    value={contactInfo.social_links.website}
                    onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>
            </div>

            {/* Resume */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Resume/CV
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume URL
                </label>
                <input
                  type="url"
                  value={contactInfo.resume_url}
                  onChange={(e) => setContactInfo({...contactInfo, resume_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://your-site.com/resume.pdf"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Link to your resume PDF or online CV
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save Contact Information'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="space-y-2 text-sm">
            {contactInfo.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{contactInfo.email}</span>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{contactInfo.phone}</span>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{contactInfo.location}</span>
              </div>
            )}
          </div>
          
          {Object.values(contactInfo.social_links).some(link => link) && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Social Links:</h4>
              <div className="space-y-1 text-sm">
                {contactInfo.social_links.linkedin && (
                  <div>LinkedIn: <a href={contactInfo.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{contactInfo.social_links.linkedin}</a></div>
                )}
                {contactInfo.social_links.github && (
                  <div>GitHub: <a href={contactInfo.social_links.github} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{contactInfo.social_links.github}</a></div>
                )}
                {contactInfo.social_links.twitter && (
                  <div>Twitter: <a href={contactInfo.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{contactInfo.social_links.twitter}</a></div>
                )}
                {contactInfo.social_links.website && (
                  <div>Website: <a href={contactInfo.social_links.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{contactInfo.social_links.website}</a></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}