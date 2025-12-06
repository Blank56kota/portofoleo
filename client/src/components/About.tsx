import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaUsers, FaAward, FaDownload } from 'react-icons/fa';
import { downloadResume } from '../utils/resume';

const About = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Modular Architecture',
      description: 'Designed modular Angular/React architecture that increased performance efficiency by 35%',
      color: 'text-yellow-accent'
    },
    {
      icon: FaRocket,
      title: 'Team Leadership',
      description: 'Led a team of 10 developers to successfully deliver enterprise-level applications',
      color: 'text-yellow-accent'
    },
    {
      icon: FaUsers,
      title: 'Technical Debt Reduction',
      description: 'Managed upgrade projects that reduced technical debt by 25% and improved maintainability',
      color: 'text-yellow-accent'
    },
    {
      icon: FaAward,
      title: 'CI/CD Implementation',
      description: 'Implemented CI/CD pipelines that halved deployment times and reduced manual testing',
      color: 'text-yellow-accent'
    }
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About me
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
              With over 3 years of experience, I am passionate about delivering scalable and performant 
              Angular & React solutions. My expertise with TypeScript, Node.js, and cloud integration has 
              driven significant efficiency improvements—recently contributing to an 85% project productivity 
              boost, including an award-winning platform delivery.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
              I'm eager to leverage these skills as an Angular/React Architect to help organizations 
              elevate their technical offerings. I specialize in transforming legacy systems to modern 
              frameworks, achieving measurable improvements in performance and user satisfaction.
            </p>
            <motion.button
              onClick={downloadResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-accent text-white font-semibold rounded hover:bg-yellow-600 transition-colors"
            >
              <FaDownload />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              <motion.div
                animate={{ 
                  borderRadius: ['50%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-yellow-accent opacity-20"
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-accent to-yellow-400 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                  SK
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className={`${feature.color} text-4xl mb-4`} />
                <h4 className="text-gray-900 font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
