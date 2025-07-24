'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Calendar, Building } from 'lucide-react';

export default function EducationManager() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
    type: 'education'
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      setEducation(data || []);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const educationData = {
        ...formData,
        end_date: formData.is_current ? null : formData.end_date
      };

      if (editingEducation) {
        const { error } = await supabase
          .from('education')
          .update(educationData)
          .eq('id', editingEducation.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('education')
          .insert([educationData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingEducation(null);
      setFormData({
        institution: '',
        degree: '',
        field_of_study: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        type: 'education'
      });
      fetchEducation();
    } catch (error) {
      console.error('Error saving education:', error);
      alert('Error saving education: ' + error.message);
    }
  };

  const handleEdit = (educationItem) => {
    setEditingEducation(educationItem);
    setFormData({
      ...educationItem,
      start_date: educationItem.start_date ? educationItem.start_date.split('T')[0] : '',
      end_date: educationItem.end_date ? educationItem.end_date.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        const { error } = await supabase
          .from('education')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchEducation();
      } catch (error) {
        console.error('Error deleting education:', error);
        alert('Error deleting education: ' + error.message);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading education...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Education & Experience</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Entry
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingEducation ? 'Edit Entry' : 'Add Entry'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution / Company
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="University Name / Company Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="education">Education</option>
                  <option value="experience">Work Experience</option>
                  <option value="certification">Certification</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type === 'education' ? 'Degree' : 'Position / Title'}
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={
                    formData.type === 'education' 
                      ? "Bachelor's, Master's, PhD, etc." 
                      : "Software Engineer, Data Scientist, etc."
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type === 'education' ? 'Field of Study' : 'Department / Focus'}
                </label>
                <input
                  type="text"
                  value={formData.field_of_study}
                  onChange={(e) => setFormData({...formData, field_of_study: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Computer Science, Engineering, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-24"
                placeholder="Description of your studies, achievements, responsibilities, etc."
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
                Currently pursuing / working here
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingEducation ? 'Update' : 'Add'} Entry
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingEducation(null);
                  setFormData({
                    institution: '',
                    degree: '',
                    field_of_study: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    is_current: false,
                    type: 'education'
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
          <h3 className="text-lg font-medium">All Entries ({education.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {education.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg">
                    <Building className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.degree}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === 'education' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'experience' ? 'bg-green-100 text-green-800' :
                        item.type === 'certification' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.type}
                      </span>
                      {item.is_current && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium">{item.institution}</p>
                    {item.field_of_study && (
                      <p className="text-gray-600 text-sm">{item.field_of_study}</p>
                    )}
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {education.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No education or experience entries found. Add your first entry!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 