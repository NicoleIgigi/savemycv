'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, ExternalLink, Github } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    image: '',
    demo_url: '',
    github_url: '',
    featured: false
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        tech_stack: formData.tech_stack.split(',').map(t => t.trim())
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }

      setShowForm(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        tech_stack: '',
        image: '',
        demo_url: '',
        github_url: '',
        featured: false
      });
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      tech_stack: Array.isArray(project.tech_stack) 
        ? project.tech_stack.join(', ') 
        : project.tech_stack
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({...formData, tech_stack: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="React, Node.js, MongoDB"
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
                className="w-full p-2 border border-gray-300 rounded-md h-24"
                required
              />
            </div>

            <div>
              <ImageUpload
                currentImage={formData.image}
                onImageUpload={(url) => setFormData({...formData, image: url})}
                label="Project Image"
                folder="projects"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({...formData, demo_url: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://myproject.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://github.com/user/repo"
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
                Featured Project
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingProject ? 'Update' : 'Create'} Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                  setFormData({
                    title: '',
                    description: '',
                    tech_stack: '',
                    image: '',
                    demo_url: '',
                    github_url: '',
                    featured: false
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
          <h3 className="text-lg font-medium">All Projects ({projects.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div key={project.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  
                  {project.tech_stack && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(Array.isArray(project.tech_stack) ? project.tech_stack : [project.tech_stack]).map((tech, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {project.image && (
                <div className="mt-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
          {projects.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No projects found. Create your first project!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 