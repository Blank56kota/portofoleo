import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaEdit, FaTrash, FaSave, FaFolderOpen, FaCode, FaBriefcase } from 'react-icons/fa';
import { Project, Skill, Experience, projectsApi, skillsApi, experienceApi } from '../services/api';

interface AdminPanelProps {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  onUpdate: () => void;
  onClose: () => void;
}

const AdminPanel = ({ projects, skills, experience, onUpdate, onClose }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience'>('projects');
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'projects') await projectsApi.delete(id);
      if (type === 'skills') await skillsApi.delete(id);
      if (type === 'experience') await experienceApi.delete(id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting item');
    }
  };

  const handleEdit = (item: any) => {
    setEditing(item.id);
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      // Validation
      if (activeTab === 'projects') {
        if (!formData.title || !formData.description) {
          alert('Please fill in title and description');
          return;
        }
        if (editing && editing !== 'new') {
          await projectsApi.update(editing, formData);
        } else {
          await projectsApi.create(formData);
        }
      } else if (activeTab === 'skills') {
        if (!formData.name) {
          alert('Please fill in skill name');
          return;
        }
        if (editing && editing !== 'new') {
          await skillsApi.update(editing, formData);
        } else {
          await skillsApi.create(formData);
        }
      } else if (activeTab === 'experience') {
        if (!formData.title || !formData.company || !formData.description) {
          alert('Please fill in title, company, and description');
          return;
        }
        if (editing && editing !== 'new') {
          await experienceApi.update(editing, formData);
        } else {
          await experienceApi.create(formData);
        }
      }
      setEditing(null);
      setFormData({});
      onUpdate();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving item: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleNew = () => {
    setEditing('new');
    if (activeTab === 'projects') {
      setFormData({ title: '', description: '', technologies: [], category: '', githubUrl: '', liveUrl: '' });
    } else if (activeTab === 'skills') {
      setFormData({ name: '', category: 'frontend', proficiency: 50 });
    } else if (activeTab === 'experience') {
      setFormData({ title: '', company: '', duration: '', description: '', technologies: [] });
    }
  };

  const tabIcons = {
    projects: FaFolderOpen,
    skills: FaCode,
    experience: FaBriefcase,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your portfolio content</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm transition-colors"
          >
            <FaTimes className="text-gray-700" />
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6 flex gap-2">
          {(['projects', 'skills', 'experience'] as const).map((tab) => {
            const Icon = tabIcons[tab];
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setEditing(null);
                  setFormData({});
                }}
                className={`flex items-center gap-2 px-6 py-3 font-semibold capitalize rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-yellow-accent text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon />
                <span>{tab}</span>
                {tab === 'projects' && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">{projects.length}</span>}
                {tab === 'skills' && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">{skills.length}</span>}
                {tab === 'experience' && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">{experience.length}</span>}
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize flex items-center gap-2">
              {activeTab === 'projects' && <FaFolderOpen className="text-yellow-accent" />}
              {activeTab === 'skills' && <FaCode className="text-yellow-accent" />}
              {activeTab === 'experience' && <FaBriefcase className="text-yellow-accent" />}
              {activeTab}
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNew}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-accent hover:bg-yellow-600 rounded-lg text-white font-semibold shadow-sm"
            >
              <FaPlus />
              <span>Add New</span>
            </motion.button>
          </div>

          {/* Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {projects.length === 0 && !editing && (
                <div className="text-center py-12 text-gray-500">
                  <FaFolderOpen className="text-6xl mx-auto mb-4 opacity-20" />
                  <p>No projects yet. Click "Add New" to create one.</p>
                </div>
              )}
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  {editing === project.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Project Title"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Project Description"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                        <input
                          type="text"
                          value={formData.technologies?.join(', ') || ''}
                          onChange={(e) => setFormData({ ...formData, technologies: e.target.value ? e.target.value.split(',').map(t => t.trim()).filter(t => t) : [] })}
                          placeholder="React, Node.js, TypeScript"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <input
                            type="text"
                            value={formData.category || ''}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="Full Stack, Mobile, etc."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                          <input
                            type="text"
                            value={formData.githubUrl || ''}
                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                        >
                          <FaSave />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditing(null)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-yellow-accent/10 text-yellow-700 rounded-lg text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                              +{project.technologies.length - 5}
                            </span>
                          )}
                        </div>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(project)}
                          className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white shadow-sm"
                          title="Edit"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete('projects', project.id)}
                          className="p-3 bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-sm"
                          title="Delete"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              {skills.length === 0 && !editing && (
                <div className="text-center py-12 text-gray-500">
                  <FaCode className="text-6xl mx-auto mb-4 opacity-20" />
                  <p>No skills yet. Click "Add New" to create one.</p>
                </div>
              )}
              {skills.map((skill) => (
                <div key={skill.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  {editing === skill.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="React, Angular, etc."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={formData.category || 'frontend'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="mobile">Mobile</option>
                          <option value="tools">Tools</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proficiency: {formData.proficiency || 50}%
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={formData.proficiency || 50}
                          onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-accent"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>1%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                        >
                          <FaSave />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditing(null)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                          <span className="px-3 py-1 bg-yellow-accent/10 text-yellow-700 rounded-lg text-sm font-medium capitalize">
                            {skill.category}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <div
                            className="bg-yellow-accent h-3 rounded-full transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">{skill.proficiency}% proficiency</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(skill)}
                          className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white shadow-sm"
                          title="Edit"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete('skills', skill.id)}
                          className="p-3 bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-sm"
                          title="Delete"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              {experience.length === 0 && !editing && (
                <div className="text-center py-12 text-gray-500">
                  <FaBriefcase className="text-6xl mx-auto mb-4 opacity-20" />
                  <p>No experience entries yet. Click "Add New" to create one.</p>
                </div>
              )}
              {experience.map((exp) => (
                <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  {editing === exp.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                          <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Software Developer"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <input
                            type="text"
                            value={formData.company || ''}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Company Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          value={formData.duration || ''}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="03/2023 - Present"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Job description and responsibilities"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                        <input
                          type="text"
                          value={formData.technologies?.join(', ') || ''}
                          onChange={(e) => setFormData({ ...formData, technologies: e.target.value ? e.target.value.split(',').map(t => t.trim()).filter(t => t) : [] })}
                          placeholder="React, Node.js, TypeScript"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                        >
                          <FaSave />
                          <span>Save</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditing(null)}
                          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                        <p className="text-yellow-accent font-semibold mb-2">{exp.company}</p>
                        <p className="text-gray-600 text-sm mb-3">{exp.duration}</p>
                        <p className="text-gray-600 mb-3">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-yellow-accent/10 text-yellow-700 rounded-lg text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(exp)}
                          className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white shadow-sm"
                          title="Edit"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete('experience', exp.id)}
                          className="p-3 bg-red-500 hover:bg-red-600 rounded-lg text-white shadow-sm"
                          title="Delete"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* New Item Form */}
          {editing === 'new' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-yellow-accent/5 border-2 border-yellow-accent/20 border-dashed rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add New {activeTab.slice(0, -1)}</h3>
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Project Title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Project Description"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={formData.technologies?.join(', ') || ''}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value ? e.target.value.split(',').map(t => t.trim()).filter(t => t) : [] })}
                      placeholder="React, Node.js, TypeScript"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Full Stack"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                      <input
                        type="text"
                        value={formData.githubUrl || ''}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="React, Angular, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category || 'frontend'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="mobile">Mobile</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proficiency: {formData.proficiency || 50}%
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={formData.proficiency || 50}
                      onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-accent"
                    />
                  </div>
                </div>
              )}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Software Developer"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="03/2023 - Present"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Job description and responsibilities"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={formData.technologies?.join(', ') || ''}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value ? e.target.value.split(',').map(t => t.trim()).filter(t => t) : [] })}
                      placeholder="React, Node.js, TypeScript"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-accent focus:border-transparent"
                    />
                  </div>
                </div>
              )}
              <div className="flex space-x-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                >
                  <FaSave />
                  <span>Save</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditing(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
