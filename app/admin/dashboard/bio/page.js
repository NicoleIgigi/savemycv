'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function BioManager() {
  const [bioSections, setBioSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    section_name: '',
    content: '',
    order_position: 1
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchBioSections();
  }, []);

  const fetchBioSections = async () => {
    try {
      const { data, error } = await supabase
        .from('bio_sections')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setBioSections(data || []);
    } catch (error) {
      console.error('Error fetching bio sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSection) {
        const { error } = await supabase
          .from('bio_sections')
          .update(formData)
          .eq('id', editingSection.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bio_sections')
          .insert([formData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingSection(null);
      setFormData({
        section_name: '',
        content: '',
        order_position: 1
      });
      fetchBioSections();
    } catch (error) {
      console.error('Error saving bio section:', error);
      alert('Error saving bio section: ' + error.message);
    }
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData(section);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this bio section?')) {
      try {
        const { error } = await supabase
          .from('bio_sections')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchBioSections();
      } catch (error) {
        console.error('Error deleting bio section:', error);
        alert('Error deleting bio section: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading bio sections...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bio / About</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Section
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingSection ? 'Edit Section' : 'New Section'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Name
                </label>
                <input
                  type="text"
                  value={formData.section_name}
                  onChange={(e) => setFormData({...formData, section_name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="About Me, Skills, Experience, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order_position}
                  onChange={(e) => setFormData({...formData, order_position: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-40"
                placeholder="Write your bio content here..."
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingSection ? 'Update' : 'Create'} Section
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingSection(null);
                  setFormData({
                    section_name: '',
                    content: '',
                    order_position: 1
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
          <h3 className="text-lg font-medium">Bio Sections ({bioSections.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {bioSections.map((section) => (
            <div key={section.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                      #{section.order_position}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">{section.section_name}</h3>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(section)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {bioSections.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No bio sections found. Create your first section!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 