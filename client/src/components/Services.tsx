import { motion } from 'framer-motion';
import { 
  FaLaptopCode, 
  FaMobileAlt, 
  FaServer, 
  FaCloud, 
  FaDatabase, 
  FaCog,
  FaCheckCircle
} from 'react-icons/fa';

interface Service {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const Services = () => {
  const services: Service[] = [
    {
      icon: FaLaptopCode,
      title: 'Frontend Development',
      description: 'Building responsive, interactive user interfaces with modern frameworks',
      features: ['React & Angular', 'TypeScript', 'TailwindCSS & SCSS', 'Responsive Design'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaServer,
      title: 'Backend Development',
      description: 'Scalable server-side solutions and API development',
      features: ['Node.js & Express', 'RESTful APIs', 'Microservices', 'Database Design'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS and Android',
      features: ['React Native', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaCloud,
      title: 'Cloud Solutions',
      description: 'Deployment and infrastructure management',
      features: ['AWS & Azure', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FaDatabase,
      title: 'Database Management',
      description: 'Efficient data storage and retrieval systems',
      features: ['SQL & NoSQL', 'Database Optimization', 'Data Migration', 'Backup & Recovery'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FaCog,
      title: 'Integration Services',
      description: 'Third-party integrations and payment gateways',
      features: ['Razorpay & Stripe', 'API Integrations', 'Webhook Setup', 'Payment Processing'],
      color: 'from-teal-500 to-blue-500'
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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Services
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive development services to bring your vision to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-8 card-hover group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 relative z-10`}>
                  <Icon className="text-white text-2xl" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{service.title}</h3>
                <p className="text-gray-400 mb-6 relative z-10">{service.description}</p>

                <ul className="space-y-3 relative z-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <FaCheckCircle className={`text-sm mr-3 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-6 w-full py-3 rounded-lg bg-gradient-to-r ${service.color} text-white font-semibold relative z-10`}
                >
                  Learn More
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

