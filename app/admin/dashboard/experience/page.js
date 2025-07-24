'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Calendar, Building, Briefcase } from 'lucide-react';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    description: '',
    achievements: '',
    technologies: '',
    start_date: '',
    end_date: '',
    is_current: false,
    employment_type: 'full-time'
  });

  const supabase = createClientComponentClient();

  const employmentTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('type', 'experience')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        institution: formData.company,
        degree: formData.position,
        field_of_study: formData.location,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.is_current ? null : formData.end_date,
        is_current: formData.is_current,
        type: 'experience',
        // Store additional experience fields in a JSON field or separate fields
        achievements: formData.achievements,
        technologies: formData.technologies,
        employment_type: formData.employment_type
      };

      if (editingExperience) {
        const { error } = await supabase
          .from('education')
          .update(experienceData)
          .eq('id', editingExperience.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('education')
          .insert([experienceData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingExperience(null);
      setFormData({
        company: '',
        position: '',
        location: '',
        description: '',
        achievements: '',
        technologies: '',
        start_date: '',
        end_date: '',
        is_current: false,
        employment_type: 'full-time'
      });
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience: ' + error.message);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.institution || '',
      position: experience.degree || '',
      location: experience.field_of_study || '',
      description: experience.description || '',
      achievements: experience.achievements || '',
      technologies: experience.technologies || '',
      start_date: experience.start_date ? experience.start_date.split('T')[0] : '',
      end_date: experience.end_date ? experience.end_date.split('T')[0] : '',
      is_current: experience.is_current || false,
      employment_type: experience.employment_type || 'full-time'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        const { error } = await supabase
          .from('education')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Error deleting experience: ' + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} months`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading work experience...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Work Experience</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingExperience ? 'Edit Experience' : 'Add Work Experience'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Job Title"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => setFormData({...formData, employment_type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {employmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-24"
                placeholder="Brief description of your role and responsibilities..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Achievements
              </label>
              <textarea
                value={formData.achievements}
                onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Major accomplishments, awards, promotions, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies/Skills Used
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="React, Python, AWS, etc. (comma-separated)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={formData.is_current}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_current}
                  onChange={(e) => setFormData({...formData, is_current: e.target.checked})}
                  className="mr-2"
                />
                Currently working here
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingExperience ? 'Update' : 'Add'} Experience
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingExperience(null);
                  setFormData({
                    company: '',
                    position: '',
                    location: '',
                    description: '',
                    achievements: '',
                    technologies: '',
                    start_date: '',
                    end_date: '',
                    is_current: false,
                    employment_type: 'full-time'
                  });
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
          <h3 className="text-lg font-medium">Work Experience ({experiences.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {experiences.map((experience) => (
            <div key={experience.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{experience.degree}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        experience.employment_type === 'full-time' ? 'bg-green-100 text-green-800' :
                        experience.employment_type === 'part-time' ? 'bg-blue-100 text-blue-800' :
                        experience.employment_type === 'contract' ? 'bg-purple-100 text-purple-800' :
                        experience.employment_type === 'freelance' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {experience.employment_type}
                      </span>
                      {experience.is_current && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {experience.institution}
                    </p>
                    
                    {experience.field_of_study && (
                      <p className="text-gray-600 text-sm">{experience.field_of_study}</p>
                    )}
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : formatDate(experience.end_date)}
                      </span>
                      <span className="ml-2">
                        ({calculateDuration(experience.start_date, experience.end_date, experience.is_current)})
                      </span>
                    </div>
                    
                    {experience.description && (
                      <p className="text-gray-600 mt-2 text-sm">{experience.description}</p>
                    )}
                    
                    {experience.achievements && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Key Achievements:</p>
                        <p className="text-gray-600 text-sm">{experience.achievements}</p>
                      </div>
                    )}
                    
                    {experience.technologies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {experience.technologies.split(',').map((tech, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No work experience found. Add your first experience!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 