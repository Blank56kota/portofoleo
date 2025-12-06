import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware - CORS configuration
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store (replace with database in production)
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
  proficiency: number; // 1-100
  icon?: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

let projects: Project[] = [
  {
    id: '1',
    title: 'Enterprise Web Application',
    description: 'Led a team of 10 developers to successfully deliver an enterprise-level web application within a 12-month deadline. Designed modular Angular/React architecture that increased performance efficiency by 35%.',
    technologies: ['Angular', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'RxJS'],
    category: 'Full Stack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '2',
    title: 'Legacy System Transformation',
    description: 'Played a pivotal role in transforming a legacy system to Angular/React, achieving a 40% reduction in customer complaints. Managed upgrade projects that reduced technical debt by 25%.',
    technologies: ['Angular', 'React', 'TypeScript', 'Node.js', 'CI/CD'],
    category: 'Full Stack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '3',
    title: 'E-Commerce Platform with Payment Integration',
    description: 'Full-stack e-commerce solution with Razorpay and Stripe payment integration. Implemented CI/CD pipelines that halved deployment times.',
    technologies: ['React', 'Node.js', 'TypeScript', 'Stripe', 'Razorpay', 'MongoDB'],
    category: 'Full Stack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  }
];

let skills: Skill[] = [
  { id: '1', name: 'Angular', category: 'frontend', proficiency: 95 },
  { id: '2', name: 'React', category: 'frontend', proficiency: 90 },
  { id: '3', name: 'React Native', category: 'mobile', proficiency: 88 },
  { id: '4', name: 'NextJs', category: 'frontend', proficiency: 85 },
  { id: '5', name: 'Node.js', category: 'backend', proficiency: 90 },
  { id: '6', name: 'TypeScript', category: 'frontend', proficiency: 93 },
  { id: '7', name: 'JavaScript', category: 'frontend', proficiency: 95 },
  { id: '8', name: 'HTML5', category: 'frontend', proficiency: 98 },
  { id: '9', name: 'CSS3', category: 'frontend', proficiency: 98 },
  { id: '10', name: 'SCSS', category: 'frontend', proficiency: 90 },
  { id: '11', name: 'RxJS', category: 'frontend', proficiency: 85 },
  { id: '12', name: 'RESTful APIs', category: 'backend', proficiency: 92 },
  { id: '13', name: 'MongoDB', category: 'backend', proficiency: 88 },
  { id: '14', name: 'Git', category: 'tools', proficiency: 95 },
  { id: '15', name: 'CI/CD', category: 'tools', proficiency: 90 },
  { id: '16', name: 'Razorpay', category: 'tools', proficiency: 85 },
  { id: '17', name: 'Stripe', category: 'tools', proficiency: 87 },
  { id: '18', name: 'GitHub', category: 'tools', proficiency: 95 },
  { id: '19', name: 'Bitbucket', category: 'tools', proficiency: 90 }
];

let experiences: Experience[] = [
  {
    id: '1',
    title: 'Angular Developer / React Developer',
    company: 'UXDESIGNLABS TECHNOLOGIES LLP',
    duration: '03/2023 - Present',
    description: 'Leading frontend development initiatives and managing team of developers to deliver enterprise-level applications. Specialized in Angular and React development with focus on performance optimization and scalable architecture.',
    technologies: ['Angular', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'RxJS', 'React Native', 'CI/CD']
  }
];

// Projects API
app.get('/api/projects', (req: Request, res: Response) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.post('/api/projects', (req: Request, res: Response) => {
  try {
    console.log('POST /api/projects - Body:', req.body);
    const newProject: Project = {
      id: Date.now().toString(),
      ...req.body
    };
    projects.push(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  try {
    console.log('PUT /api/projects/:id - ID:', req.params.id, 'Body:', req.body);
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  projects.splice(index, 1);
  res.json({ message: 'Project deleted successfully' });
});

// Skills API
app.get('/api/skills', (req: Request, res: Response) => {
  res.json(skills);
});

app.get('/api/skills/:id', (req: Request, res: Response) => {
  const skill = skills.find(s => s.id === req.params.id);
  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }
  res.json(skill);
});

app.post('/api/skills', (req: Request, res: Response) => {
  try {
    console.log('POST /api/skills - Body:', req.body);
    const newSkill: Skill = {
      id: Date.now().toString(),
      ...req.body
    };
    skills.push(newSkill);
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

app.put('/api/skills/:id', (req: Request, res: Response) => {
  try {
    console.log('PUT /api/skills/:id - ID:', req.params.id, 'Body:', req.body);
    const index = skills.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    skills[index] = { ...skills[index], ...req.body };
    res.json(skills[index]);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

app.delete('/api/skills/:id', (req: Request, res: Response) => {
  const index = skills.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Skill not found' });
  }
  skills.splice(index, 1);
  res.json({ message: 'Skill deleted successfully' });
});

// Experience API
app.get('/api/experience', (req: Request, res: Response) => {
  res.json(experiences);
});

app.get('/api/experience/:id', (req: Request, res: Response) => {
  const exp = experiences.find(e => e.id === req.params.id);
  if (!exp) {
    return res.status(404).json({ error: 'Experience not found' });
  }
  res.json(exp);
});

app.post('/api/experience', (req: Request, res: Response) => {
  try {
    console.log('POST /api/experience - Body:', req.body);
    const newExp: Experience = {
      id: Date.now().toString(),
      ...req.body
    };
    experiences.push(newExp);
    res.status(201).json(newExp);
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

app.put('/api/experience/:id', (req: Request, res: Response) => {
  try {
    console.log('PUT /api/experience/:id - ID:', req.params.id, 'Body:', req.body);
    const index = experiences.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    experiences[index] = { ...experiences[index], ...req.body };
    res.json(experiences[index]);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

app.delete('/api/experience/:id', (req: Request, res: Response) => {
  const index = experiences.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Experience not found' });
  }
  experiences.splice(index, 1);
  res.json({ message: 'Experience deleted successfully' });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please either:`);
    console.error(`   1. Kill the process using: lsof -ti:${PORT} | xargs kill -9`);
    console.error(`   2. Or change the PORT in your .env file`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

