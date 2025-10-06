'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Quote, Star } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_position: '',
    client_company: '',
    testimonial_text: '',
    rating: 5,
    featured: false,
    client_image: ''
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingTestimonial(null);
      setFormData({
        client_name: '',
        client_position: '',
        client_company: '',
        testimonial_text: '',
        rating: 5,
        featured: false,
        client_image: ''
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial: ' + error.message);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Error deleting testimonial: ' + error.message);
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.client_position}
                  onChange={(e) => setFormData({...formData, client_position: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="CEO, CTO, Product Manager, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.client_company}
                  onChange={(e) => setFormData({...formData, client_company: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>

            <div>
              <ImageUpload
                currentImage={formData.client_image}
                onImageUpload={(url) => setFormData({...formData, client_image: url})}
                label="Client Photo (Optional)"
                folder="testimonials"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Testimonial Text
              </label>
              <textarea
                value={formData.testimonial_text}
                onChange={(e) => setFormData({...formData, testimonial_text: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Write the testimonial here..."
                required
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="mr-2"
                />
                Featured Testimonial
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingTestimonial ? 'Update' : 'Add'} Testimonial
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTestimonial(null);
                  setFormData({
                    client_name: '',
                    client_position: '',
                    client_company: '',
                    testimonial_text: '',
                    rating: 5,
                    featured: false,
                    client_image: ''
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
          <h3 className="text-lg font-medium">All Testimonials ({testimonials.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full overflow-hidden">
                    {testimonial.client_image ? (
                      <img
                        src={testimonial.client_image}
                        alt={testimonial.client_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Quote className="h-6 w-6 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{testimonial.client_name}</h3>
                      {testimonial.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {testimonial.client_position && (
                        <span className="text-gray-600 text-sm">{testimonial.client_position}</span>
                      )}
                      {testimonial.client_company && (
                        <span className="text-gray-600 text-sm">
                          {testimonial.client_position ? ' at ' : ''}{testimonial.client_company}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-gray-700 italic border-l-4 border-indigo-200 pl-4">
                      "{testimonial.testimonial_text}"
                    </blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No testimonials found. Add your first testimonial!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 