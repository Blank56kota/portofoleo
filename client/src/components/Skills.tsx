import { motion } from 'framer-motion';
import { Skill } from '../services/api';
import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaGithub,
  FaBitbucket,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiSass,
  SiRazorpay,
  SiStripe,
  SiNextdotjs,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

interface SkillsProps {
  skills: Skill[];
}

const skillIcons: Record<string, any> = {
  Angular: FaAngular,
  React: FaReact,
  'React Native': TbBrandReactNative,
  NextJs: SiNextdotjs,
  'Node.js': FaNodeJs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  SCSS: SiSass,
  TailwindCSS: SiTailwindcss,
  Bootstrap: FaBootstrap,
  Razorpay: SiRazorpay,
  Stripe: SiStripe,
  GitHub: FaGithub,
  Bitbucket: FaBitbucket,
  RxJS: SiTypescript,
  'RESTful APIs': FaNodeJs,
  MongoDB: FaNodeJs,
  Git: FaGithub,
  'CI/CD': FaGithub,
};

const Skills = ({ skills }: SkillsProps) => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-yellow-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Technologies and frameworks I work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 capitalize px-2">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {categorySkills.map((skill) => {
                  const IconComponent = skillIcons[skill.name] || FaReact;
                  return (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:shadow-md transition-all text-center"
                    >
                      <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                        <div className="text-2xl sm:text-3xl md:text-4xl text-yellow-accent">
                          <IconComponent />
                        </div>
                        <div className="text-center w-full">
                          <p className="text-gray-900 font-medium text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">{skill.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-2 rounded-full bg-yellow-accent"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{skill.proficiency}%</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
