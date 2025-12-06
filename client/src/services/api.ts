import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.config?.url);
    return Promise.reject(error);
  }
);

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
  proficiency: number;
  icon?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

// Projects API
export const projectsApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (project: Omit<Project, 'id'>) => api.post<Project>('/projects', project),
  update: (id: string, project: Partial<Project>) => api.put<Project>(`/projects/${id}`, project),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Skills API
export const skillsApi = {
  getAll: () => api.get<Skill[]>('/skills'),
  getById: (id: string) => api.get<Skill>(`/skills/${id}`),
  create: (skill: Omit<Skill, 'id'>) => api.post<Skill>('/skills', skill),
  update: (id: string, skill: Partial<Skill>) => api.put<Skill>(`/skills/${id}`, skill),
  delete: (id: string) => api.delete(`/skills/${id}`),
};

// Experience API
export const experienceApi = {
  getAll: () => api.get<Experience[]>('/experience'),
  getById: (id: string) => api.get<Experience>(`/experience/${id}`),
  create: (exp: Omit<Experience, 'id'>) => api.post<Experience>('/experience', exp),
  update: (id: string, exp: Partial<Experience>) => api.put<Experience>(`/experience/${id}`, exp),
  delete: (id: string) => api.delete(`/experience/${id}`),
};

export default api;

