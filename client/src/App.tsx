import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { Project, Skill, Experience as ExpType } from './services/api';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<ExpType[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes, expRes] = await Promise.all([
        fetch('/api/projects').then(r => {
          if (!r.ok) throw new Error('Failed to fetch projects');
          return r.json();
        }),
        fetch('/api/skills').then(r => {
          if (!r.ok) throw new Error('Failed to fetch skills');
          return r.json();
        }),
        fetch('/api/experience').then(r => {
          if (!r.ok) throw new Error('Failed to fetch experience');
          return r.json();
        }),
      ]);
      setProjects(projectsRes);
      setSkills(skillsRes);
      setExperience(expRes);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty arrays on error to prevent crashes
      setProjects([]);
      setSkills([]);
      setExperience([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-yellow-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onAdminClick={() => setShowAdmin(!showAdmin)} />
      
      {showAdmin ? (
        <AdminPanel
          projects={projects}
          skills={skills}
          experience={experience}
          onUpdate={fetchData}
          onClose={() => setShowAdmin(false)}
        />
      ) : (
        <>
          <Hero />
          <About />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Education />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;

