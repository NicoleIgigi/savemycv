'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Award, ExternalLink, Calendar } from 'lucide-react';
import ImageUpload from '../../../../components/ImageUpload';

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    description: '',
    image_url: '',
    credential_url: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    skills: '',
    featured: false
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('type', 'certification')
        .order('date_completed', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const certificateData = {
        type: 'certification',
        title: formData.title,
        institution: formData.issuer,
        description: formData.description,
        image_url: formData.image_url,
        url: formData.credential_url,
        date_completed: formData.issue_date,
        field_of_study: formData.skills,
        featured: formData.featured,
        // Store credential ID and expiry date in a JSON field if needed
        metadata: {
          credential_id: formData.credential_id,
          expiry_date: formData.expiry_date
        }
      };

      if (editingCertificate) {
        const { error } = await supabase
          .from('education')
          .update(certificateData)
          .eq('id', editingCertificate.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('education')
          .insert([certificateData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingCertificate(null);
      resetForm();
      fetchCertificates();
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate: ' + error.message);
    }
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setFormData({
      title: certificate.title || '',
      issuer: certificate.institution || '',
      description: certificate.description || '',
      image_url: certificate.image_url || '',
      credential_url: certificate.url || '',
      issue_date: certificate.date_completed ? certificate.date_completed.split('T')[0] : '',
      expiry_date: certificate.metadata?.expiry_date || '',
      credential_id: certificate.metadata?.credential_id || '',
      skills: certificate.field_of_study || '',
      featured: certificate.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        const { error } = await supabase
          .from('education')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Error deleting certificate: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      description: '',
      image_url: '',
      credential_url: '',
      issue_date: '',
      expiry_date: '',
      credential_id: '',
      skills: '',
      featured: false
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Professional Certificates</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Certificate
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingCertificate ? 'Edit Certificate' : 'Add Professional Certificate'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Google Data Analytics Professional Certificate"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({...formData, issuer: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Google, Coursera, etc."
                  required
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
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Brief description of the certificate and skills gained..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills/Topics Covered
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Data Analysis, Python, SQL, Tableau, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Image
              </label>
              <ImageUpload
                currentImage={formData.image_url}
                onImageUpload={(url) => setFormData({...formData, image_url: url})}
                folder="certificates"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date *
                </label>
                <input
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({...formData, issue_date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date (if applicable)
                </label>
                <input
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={formData.credential_id}
                  onChange={(e) => setFormData({...formData, credential_id: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Certificate ID or verification code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential URL
                </label>
                <input
                  type="url"
                  value={formData.credential_url}
                  onChange={(e) => setFormData({...formData, credential_url: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://coursera.org/verify/..."
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="mr-2"
                />
                Featured Certificate
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingCertificate ? 'Update' : 'Add'} Certificate
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCertificate(null);
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
          <h3 className="text-lg font-medium">All Certificates ({certificates.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {certificate.image_url ? (
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-lg">
                      <Award className="h-8 w-8 text-indigo-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{certificate.title}</h3>
                      {certificate.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium">{certificate.institution}</p>
                    {certificate.field_of_study && (
                      <p className="text-gray-600 text-sm">{certificate.field_of_study}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Issued: {new Date(certificate.date_completed).toLocaleDateString()}</span>
                    </div>
                    {certificate.description && (
                      <p className="text-gray-600 mt-2 text-sm">{certificate.description}</p>
                    )}
                    {certificate.url && (
                      <a
                        href={certificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm mt-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(certificate.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {certificates.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No certificates found. Add your first professional certificate!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 