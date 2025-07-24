'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Globe, Star } from 'lucide-react';

export default function LanguagesManager() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    proficiency: 'conversational',
    proficiency_percentage: 75,
    native: false,
    description: '',
    certificate: '',
    flag_emoji: '🌐'
  });

  const supabase = createClientComponentClient();

  const proficiencyLevels = [
    { value: 'native', label: 'Native', percentage: 100 },
    { value: 'fluent', label: 'Fluent', percentage: 95 },
    { value: 'advanced', label: 'Advanced', percentage: 85 },
    { value: 'intermediate', label: 'Intermediate', percentage: 70 },
    { value: 'conversational', label: 'Conversational', percentage: 60 },
    { value: 'beginner', label: 'Beginner', percentage: 30 }
  ];

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      // Create a simple languages table structure using contact_info with a languages JSONB field
      const { data, error } = await supabase
        .from('contact_info')
        .select('social_links')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      // Extract languages from social_links.languages if it exists
      const languagesData = data?.social_links?.languages || [];
      setLanguages(languagesData);
    } catch (error) {
      console.error('Error fetching languages:', error);
      setLanguages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the current proficiency percentage based on level
      const selectedLevel = proficiencyLevels.find(level => level.value === formData.proficiency);
      const languageData = {
        ...formData,
        proficiency_percentage: selectedLevel?.percentage || formData.proficiency_percentage,
        id: editingLanguage?.id || Date.now().toString()
      };

      // Get existing data
      const { data: existing, error: fetchError } = await supabase
        .from('contact_info')
        .select('social_links')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      const currentSocialLinks = existing?.social_links || {};
      let currentLanguages = currentSocialLinks.languages || [];

      if (editingLanguage) {
        // Update existing language
        currentLanguages = currentLanguages.map(lang => 
          lang.id === editingLanguage.id ? languageData : lang
        );
      } else {
        // Add new language
        currentLanguages.push(languageData);
      }

      // Update the contact_info table
      const { error } = await supabase
        .from('contact_info')
        .upsert({
          id: existing?.id || crypto.randomUUID(),
          social_links: {
            ...currentSocialLinks,
            languages: currentLanguages
          }
        });

      if (error) throw error;

      setShowForm(false);
      setEditingLanguage(null);
      resetForm();
      fetchLanguages();
    } catch (error) {
      console.error('Error saving language:', error);
      alert('Error saving language: ' + error.message);
    }
  };

  const handleEdit = (language) => {
    setEditingLanguage(language);
    setFormData({
      name: language.name || '',
      proficiency: language.proficiency || 'conversational',
      proficiency_percentage: language.proficiency_percentage || 75,
      native: language.native || false,
      description: language.description || '',
      certificate: language.certificate || '',
      flag_emoji: language.flag_emoji || '🌐'
    });
    setShowForm(true);
  };

  const handleDelete = async (languageToDelete) => {
    if (confirm(`Are you sure you want to delete ${languageToDelete.name}?`)) {
      try {
        // Get existing data
        const { data: existing, error: fetchError } = await supabase
          .from('contact_info')
          .select('social_links')
          .single();

        if (fetchError) throw fetchError;

        const currentSocialLinks = existing?.social_links || {};
        const currentLanguages = currentSocialLinks.languages || [];

        // Filter out the language to delete
        const updatedLanguages = currentLanguages.filter(lang => lang.id !== languageToDelete.id);

        // Update the contact_info table
        const { error } = await supabase
          .from('contact_info')
          .update({
            social_links: {
              ...currentSocialLinks,
              languages: updatedLanguages
            }
          })
          .eq('id', existing.id);

        if (error) throw error;
        fetchLanguages();
      } catch (error) {
        console.error('Error deleting language:', error);
        alert('Error deleting language: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      proficiency: 'conversational',
      proficiency_percentage: 75,
      native: false,
      description: '',
      certificate: '',
      flag_emoji: '🌐'
    });
  };

  const handleProficiencyChange = (level) => {
    const selectedLevel = proficiencyLevels.find(l => l.value === level);
    setFormData({
      ...formData,
      proficiency: level,
      proficiency_percentage: selectedLevel?.percentage || 75
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading languages...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Languages</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Language
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingLanguage ? 'Edit Language' : 'Add Language'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="English, French, Kinyarwanda, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flag Emoji
                </label>
                <input
                  type="text"
                  value={formData.flag_emoji}
                  onChange={(e) => setFormData({...formData, flag_emoji: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md text-center text-2xl"
                  placeholder="🇺🇸"
                  maxLength="4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency Level *
              </label>
              <select
                value={formData.proficiency}
                onChange={(e) => handleProficiencyChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                {proficiencyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label} ({level.percentage}%)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Proficiency Percentage
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.proficiency_percentage}
                onChange={(e) => setFormData({...formData, proficiency_percentage: parseInt(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description/Notes
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Additional context about language usage, certifications, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate/Qualification
              </label>
              <input
                type="text"
                value={formData.certificate}
                onChange={(e) => setFormData({...formData, certificate: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="TOEFL 110, DELF B2, etc."
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.native}
                  onChange={(e) => setFormData({...formData, native: e.target.checked})}
                  className="mr-2"
                />
                Native Language
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingLanguage ? 'Update' : 'Add'} Language
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingLanguage(null);
                  resetForm();
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">All Languages ({languages.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {languages.map((language) => (
            <div key={language.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    {language.flag_emoji || '🌐'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{language.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        language.proficiency === 'native' ? 'bg-green-100 text-green-800' :
                        language.proficiency === 'fluent' ? 'bg-blue-100 text-blue-800' :
                        language.proficiency === 'advanced' ? 'bg-purple-100 text-purple-800' :
                        language.proficiency === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        language.proficiency === 'conversational' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {language.proficiency}
                      </span>
                      {language.native && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Native
                        </span>
                      )}
                    </div>
                    
                    {/* Proficiency bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${language.proficiency_percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{language.proficiency_percentage}% Proficiency</span>
                    
                    {language.certificate && (
                      <p className="text-gray-600 text-sm mt-1">📜 {language.certificate}</p>
                    )}
                    {language.description && (
                      <p className="text-gray-600 mt-2 text-sm">{language.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(language)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(language)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {languages.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No languages found. Add your first language!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 