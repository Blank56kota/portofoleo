import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Hero = () => {
  const words = ['Angular Solutions', 'React Applications', 'Mobile Apps', 'Scalable Platforms', 'Full-Stack Solutions'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 70);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <span className="text-yellow-accent uppercase tracking-wider text-sm font-semibold">
                Angular Developer | Front-End Development
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight"
            >
              Hello, my name is{' '}
              <span className="text-yellow-accent">Sandeep Kota</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl"
            >
              With over 3 years of experience, I am passionate about delivering scalable and performant 
              Angular & React solutions. My expertise with TypeScript, Node.js, and cloud integration has 
              driven significant efficiency improvements—recently contributing to an 85% project productivity 
              boost, including an award-winning platform delivery.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-yellow-accent text-white text-sm sm:text-base font-semibold rounded hover:bg-yellow-600 transition-colors"
              >
                Projects
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border-2 border-gray-300 text-gray-900 text-sm sm:text-base font-semibold rounded hover:border-gray-400 transition-colors flex items-center gap-2"
              >
                <FaLinkedin />
                <span className="hidden sm:inline">LinkedIn</span>
              </motion.a>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-2 text-gray-600 text-sm sm:text-base"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <FaPhone className="text-yellow-accent flex-shrink-0" />
                <a href="tel:+918488063630" className="hover:text-yellow-accent transition-colors break-all">
                  +91-8488063630
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <FaEnvelope className="text-yellow-accent flex-shrink-0" />
                <a href="mailto:kotasandeep504@gmail.com" className="hover:text-yellow-accent transition-colors break-all">
                  kotasandeep504@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <FaMapMarkerAlt className="text-yellow-accent flex-shrink-0" />
                <span>Hyderabad, India</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image/Visual Element */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              {/* Yellow blob shape */}
              <motion.div
                animate={{ 
                  borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%'],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-yellow-accent opacity-20"
              />
              
              {/* Placeholder for profile image - you can add your image here */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-accent to-yellow-400 flex items-center justify-center text-6xl font-bold text-white">
                  SK
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Arrow */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-600 hover:text-yellow-accent transition-colors"
          >
            <FaArrowDown size={24} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
