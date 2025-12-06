import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  details?: string;
}

const Education = () => {
  const education: EducationItem[] = [
    {
      id: '1',
      degree: 'B.Sc Bio-technology',
      institution: 'Sri Sai Triveeni Degree and Pg Colleges',
      location: 'Suryapet, Telangana',
      duration: '06/2018 - 05/2022',
      details: 'CGPA - 8.2'
    },
    {
      id: '2',
      degree: 'Intermediate (BI.P.C)',
      institution: 'Intermediate',
      location: 'Noothanka, Suryapet',
      duration: '2016 - 2018'
    },
    {
      id: '3',
      degree: 'SSC (10th)',
      institution: 'SSC',
      location: 'Gorentla, Maddirala, Suryapet',
      duration: '2016'
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
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-yellow-accent mx-auto mb-4"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaGraduationCap className="text-yellow-accent text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                  <p className="text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{edu.institution}</p>
                  {edu.details && (
                    <p className="text-yellow-accent font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{edu.details}</p>
                  )}
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-yellow-accent" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-accent" />
                      <span>{edu.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

