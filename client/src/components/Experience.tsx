import { motion } from 'framer-motion';
import { Experience as ExpType } from '../services/api';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

interface ExperienceProps {
  experience: ExpType[];
}

const Experience = ({ experience }: ExperienceProps) => {
  const achievements = [
    'Designed a modular Angular/React architecture that increased performance efficiency by 35%, enhancing user experience',
    'Led a team of 10 developers to successfully deliver an enterprise-level web application within a 12-month deadline',
    'Managed Angular/React upgrade projects that reduced technical debt by 25% and improved the maintainability of critical codebases',
    'Implemented CI/CD for the Angular/React projects, which halved deployment times and reduced manual testing requirements',
    'Collaborated with cross-functional product teams to accurately translate business goals into scalable front-end solutions',
    'Played a pivotal role in transforming a legacy system to Angular/React, achieving a 40% reduction in customer complaints'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-yellow-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            My professional journey and achievements
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 sm:mb-6">
                <div className="mb-4 md:mb-0 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <FaBriefcase className="text-yellow-accent text-lg sm:text-xl flex-shrink-0" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{exp.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-accent font-semibold mb-2">
                    <FaMapMarkerAlt />
                    <span>{exp.company}</span>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-accent/10 text-yellow-700 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap mt-2 md:mt-0">
                  {exp.duration}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements:</h4>
                <ul className="space-y-2">
                  {achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <span className="text-yellow-accent mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Achievement Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-yellow-accent/10 border-l-4 border-yellow-accent p-6 rounded-r-lg"
        >
          <h4 className="text-xl font-bold text-gray-900 mb-2">Key Achievement</h4>
          <p className="text-gray-700">
            <strong>Backend Developer Role:</strong> Joined as Front-end developer and transitioned into 
            Backend developer with Node.js and MongoDB, demonstrating versatility and continuous learning.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
