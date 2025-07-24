'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function ContactManager() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    type: 'email',
    icon: 'mail',
    display_order: 1
  });

  const supabase = createClientComponentClient();
  
  const contactTypes = [
    { value: 'email', label: 'Email', icon: 'mail' },
    { value: 'phone', label: 'Phone', icon: 'phone' },
    { value: 'location', label: 'Location', icon: 'map-pin' },
    { value: 'website', label: 'Website', icon: 'globe' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
    { value: 'github', label: 'GitHub', icon: 'github' },
    { value: 'other', label: 'Other', icon: 'info' }
  ];

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setContactInfo(data || []);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        const { error } = await supabase
          .from('contact_info')
          .update(formData)
          .eq('id', editingContact.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert([formData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingContact(null);
      setFormData({
        label: '',
        value: '',
        type: 'email',
        icon: 'mail',
        display_order: 1
      });
      fetchContactInfo();
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Error saving contact info: ' + error.message);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData(contact);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this contact info?')) {
      try {
        const { error } = await supabase
          .from('contact_info')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchContactInfo();
      } catch (error) {
        console.error('Error deleting contact info:', error);
        alert('Error deleting contact info: ' + error.message);
      }
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      mail: Mail,
      phone: Phone,
      'map-pin': MapPin,
      globe: Globe
    };
    const IconComponent = icons[iconName] || Mail;
    return <IconComponent className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading contact info...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contact Info</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Contact Info
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingContact ? 'Edit Contact Info' : 'Add Contact Info'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Email, Phone, Location, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const selectedType = contactTypes.find(type => type.value === e.target.value);
                    setFormData({
                      ...formData, 
                      type: e.target.value,
                      icon: selectedType?.icon || 'mail'
                    });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {contactTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type={formData.type === 'email' ? 'email' : formData.type === 'website' ? 'url' : 'text'}
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={
                    formData.type === 'email' ? 'your@email.com' :
                    formData.type === 'phone' ? '+1 (555) 123-4567' :
                    formData.type === 'website' ? 'https://yourwebsite.com' :
                    'Your contact value'
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingContact ? 'Update' : 'Add'} Contact Info
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingContact(null);
                  setFormData({
                    label: '',
                    value: '',
                    type: 'email',
                    icon: 'mail',
                    display_order: 1
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
          <h3 className="text-lg font-medium">Contact Information ({contactInfo.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {contactInfo.map((contact) => (
            <div key={contact.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                    {getIconComponent(contact.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{contact.label}</h3>
                    <p className="text-gray-600">
                      {contact.type === 'email' && (
                        <a href={`mailto:${contact.value}`} className="text-indigo-600 hover:text-indigo-800">
                          {contact.value}
                        </a>
                      )}
                      {contact.type === 'phone' && (
                        <a href={`tel:${contact.value}`} className="text-indigo-600 hover:text-indigo-800">
                          {contact.value}
                        </a>
                      )}
                      {(contact.type === 'website' || contact.type === 'linkedin' || contact.type === 'github') && (
                        <a 
                          href={contact.value} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          {contact.value}
                        </a>
                      )}
                      {(contact.type === 'location' || contact.type === 'other') && (
                        <span>{contact.value}</span>
                      )}
                    </p>
                    <span className="text-xs text-gray-400">Order: #{contact.display_order}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {contactInfo.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No contact information found. Add your first contact info!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 