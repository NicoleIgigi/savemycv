'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Edit, Trash2, Plus, Github, Star, GitFork, Activity } from 'lucide-react';

export default function GitHubStatsManager() {
  const [githubData, setGithubData] = useState({
    username: '',
    profile_url: '',
    bio: '',
    public_repos: 0,
    followers: 0,
    following: 0,
    total_stars: 0,
    total_commits: 0,
    streak_days: 0,
    featured_repos: []
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRepoForm, setShowRepoForm] = useState(false);
  const [editingRepo, setEditingRepo] = useState(null);
  const [repoFormData, setRepoFormData] = useState({
    name: '',
    description: '',
    language: '',
    stars: 0,
    forks: 0,
    url: '',
    topics: ''
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('social_links')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      const githubInfo = data?.social_links?.github_stats || {
        username: '',
        profile_url: '',
        bio: '',
        public_repos: 0,
        followers: 0,
        following: 0,
        total_stars: 0,
        total_commits: 0,
        streak_days: 0,
        featured_repos: []
      };
      
      setGithubData(githubInfo);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get existing data
      const { data: existing, error: fetchError } = await supabase
        .from('contact_info')
        .select('social_links')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      const currentSocialLinks = existing?.social_links || {};

      // Update the contact_info table
      const { error } = await supabase
        .from('contact_info')
        .upsert({
          id: existing?.id || crypto.randomUUID(),
          social_links: {
            ...currentSocialLinks,
            github_stats: githubData
          }
        });

      if (error) throw error;

      setShowForm(false);
      fetchGitHubData();
    } catch (error) {
      console.error('Error saving GitHub data:', error);
      alert('Error saving GitHub data: ' + error.message);
    }
  };

  const handleRepoSubmit = async (e) => {
    e.preventDefault();
    try {
      const repoData = {
        ...repoFormData,
        topics: repoFormData.topics.split(',').map(t => t.trim()).filter(t => t),
        id: editingRepo?.id || Date.now().toString()
      };

      let updatedRepos;
      if (editingRepo) {
        updatedRepos = githubData.featured_repos.map(repo =>
          repo.id === editingRepo.id ? repoData : repo
        );
      } else {
        updatedRepos = [...githubData.featured_repos, repoData];
      }

      const updatedGithubData = {
        ...githubData,
        featured_repos: updatedRepos
      };

      // Update in database
      const { data: existing, error: fetchError } = await supabase
        .from('contact_info')
        .select('social_links')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

      const currentSocialLinks = existing?.social_links || {};

      const { error } = await supabase
        .from('contact_info')
        .upsert({
          id: existing?.id || crypto.randomUUID(),
          social_links: {
            ...currentSocialLinks,
            github_stats: updatedGithubData
          }
        });

      if (error) throw error;

      setGithubData(updatedGithubData);
      setShowRepoForm(false);
      setEditingRepo(null);
      resetRepoForm();
    } catch (error) {
      console.error('Error saving repository:', error);
      alert('Error saving repository: ' + error.message);
    }
  };

  const handleEditRepo = (repo) => {
    setEditingRepo(repo);
    setRepoFormData({
      name: repo.name || '',
      description: repo.description || '',
      language: repo.language || '',
      stars: repo.stars || 0,
      forks: repo.forks || 0,
      url: repo.url || '',
      topics: Array.isArray(repo.topics) ? repo.topics.join(', ') : ''
    });
    setShowRepoForm(true);
  };

  const handleDeleteRepo = async (repoToDelete) => {
    if (confirm(`Are you sure you want to delete ${repoToDelete.name}?`)) {
      try {
        const updatedRepos = githubData.featured_repos.filter(repo => repo.id !== repoToDelete.id);
        const updatedGithubData = {
          ...githubData,
          featured_repos: updatedRepos
        };

        // Update in database
        const { data: existing, error: fetchError } = await supabase
          .from('contact_info')
          .select('social_links')
          .single();

        if (fetchError) throw fetchError;

        const currentSocialLinks = existing?.social_links || {};

        const { error } = await supabase
          .from('contact_info')
          .update({
            social_links: {
              ...currentSocialLinks,
              github_stats: updatedGithubData
            }
          })
          .eq('id', existing.id);

        if (error) throw error;
        setGithubData(updatedGithubData);
      } catch (error) {
        console.error('Error deleting repository:', error);
        alert('Error deleting repository: ' + error.message);
      }
    }
  };

  const resetRepoForm = () => {
    setRepoFormData({
      name: '',
      description: '',
      language: '',
      stars: 0,
      forks: 0,
      url: '',
      topics: ''
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading GitHub data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">GitHub Stats & Profile</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowRepoForm(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Repository
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Edit className="h-5 w-5" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* GitHub Profile Overview */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center gap-4 mb-4">
          <Github className="h-8 w-8 text-gray-700" />
          <div>
            <h2 className="text-xl font-semibold">
              {githubData.username || 'GitHub Username'}
            </h2>
            <p className="text-gray-600">{githubData.bio || 'No bio available'}</p>
            {githubData.profile_url && (
              <a 
                href={githubData.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                View GitHub Profile →
              </a>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{githubData.public_repos}+</div>
            <div className="text-sm text-gray-600">Public Repositories</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{githubData.total_stars}+</div>
            <div className="text-sm text-gray-600">Total Stars</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{githubData.followers}+</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{githubData.total_commits}+</div>
            <div className="text-sm text-gray-600">Contributions</div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Edit GitHub Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Username *
                </label>
                <input
                  type="text"
                  value={githubData.username}
                  onChange={(e) => setGithubData({...githubData, username: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="your-username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile URL
                </label>
                <input
                  type="url"
                  value={githubData.profile_url}
                  onChange={(e) => setGithubData({...githubData, profile_url: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://github.com/your-username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={githubData.bio}
                onChange={(e) => setGithubData({...githubData, bio: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Brief bio about your coding journey..."
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public Repos
                </label>
                <input
                  type="number"
                  value={githubData.public_repos}
                  onChange={(e) => setGithubData({...githubData, public_repos: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Stars
                </label>
                <input
                  type="number"
                  value={githubData.total_stars}
                  onChange={(e) => setGithubData({...githubData, total_stars: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Followers
                </label>
                <input
                  type="number"
                  value={githubData.followers}
                  onChange={(e) => setGithubData({...githubData, followers: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Commits
                </label>
                <input
                  type="number"
                  value={githubData.total_commits}
                  onChange={(e) => setGithubData({...githubData, total_commits: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add/Edit Repository Form */}
      {showRepoForm && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">
            {editingRepo ? 'Edit Repository' : 'Add Featured Repository'}
          </h2>
          
          <form onSubmit={handleRepoSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repository Name *
                </label>
                <input
                  type="text"
                  value={repoFormData.name}
                  onChange={(e) => setRepoFormData({...repoFormData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="awesome-project"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Language
                </label>
                <input
                  type="text"
                  value={repoFormData.language}
                  onChange={(e) => setRepoFormData({...repoFormData, language: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Python, JavaScript, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={repoFormData.description}
                onChange={(e) => setRepoFormData({...repoFormData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Brief description of the repository..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repository URL
              </label>
              <input
                type="url"
                value={repoFormData.url}
                onChange={(e) => setRepoFormData({...repoFormData, url: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="https://github.com/username/repo-name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topics/Tags
              </label>
              <input
                type="text"
                value={repoFormData.topics}
                onChange={(e) => setRepoFormData({...repoFormData, topics: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="machine-learning, web-development, python (comma-separated)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stars
                </label>
                <input
                  type="number"
                  value={repoFormData.stars}
                  onChange={(e) => setRepoFormData({...repoFormData, stars: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Forks
                </label>
                <input
                  type="number"
                  value={repoFormData.forks}
                  onChange={(e) => setRepoFormData({...repoFormData, forks: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {editingRepo ? 'Update' : 'Add'} Repository
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRepoForm(false);
                  setEditingRepo(null);
                  resetRepoForm();
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Featured Repositories */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Featured Repositories ({githubData.featured_repos.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {githubData.featured_repos.map((repo) => (
            <div key={repo.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">{repo.name}</h3>
                    {repo.language && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  
                  {repo.description && (
                    <p className="text-gray-600 mb-3">{repo.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {repo.url && (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      <Github className="h-4 w-4" />
                      View Repository
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditRepo(repo)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRepo(repo)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {githubData.featured_repos.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No featured repositories found. Add your first repository!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 