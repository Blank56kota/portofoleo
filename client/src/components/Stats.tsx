import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaProjectDiagram, FaUsers, FaCode, FaAward } from 'react-icons/fa';

interface Stat {
  icon: any;
  value: string;
  label: string;
  suffix?: string;
  color: string;
}

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats: Stat[] = [
    {
      icon: FaProjectDiagram,
      value: '50',
      suffix: '+',
      label: 'Projects Completed',
      color: 'text-blue-400'
    },
    {
      icon: FaUsers,
      value: '30',
      suffix: '+',
      label: 'Happy Clients',
      color: 'text-purple-400'
    },
    {
      icon: FaCode,
      value: '100',
      suffix: 'K+',
      label: 'Lines of Code',
      color: 'text-pink-400'
    },
    {
      icon: FaAward,
      value: '5',
      suffix: '+',
      label: 'Years Experience',
      color: 'text-primary-400'
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
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-900/20 via-purple-900/20 to-pink-900/20 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Achievements & Stats
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that speak for themselves
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -10 }}
                className="glass rounded-2xl p-8 text-center card-hover"
              >
                <Icon className={`${stat.color} text-5xl mx-auto mb-4`} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-5xl font-bold text-white mb-2"
                >
                  {isInView && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.span>
                  )}
                  {stat.suffix && (
                    <span className="text-gradient">{stat.suffix}</span>
                  )}
                </motion.div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;

