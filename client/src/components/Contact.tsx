import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contacts
          </h2>
          <div className="w-24 h-1 bg-yellow-accent mx-auto mb-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.a
              href="mailto:kotasandeep504@gmail.com"
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-yellow-accent/10 rounded-lg flex items-center justify-center">
                <FaEnvelope className="text-yellow-accent text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-900 font-medium">kotasandeep504@gmail.com</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+918488063630"
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-yellow-accent/10 rounded-lg flex items-center justify-center">
                <FaPhone className="text-yellow-accent text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-gray-900 font-medium">+91-8488063630</p>
              </div>
            </motion.a>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center space-x-4 bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="w-12 h-12 bg-yellow-accent/10 rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-yellow-accent text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="text-gray-900 font-medium">Hyderabad, India</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-12 h-12 bg-yellow-accent/10 rounded-full flex items-center justify-center text-yellow-accent hover:bg-yellow-accent hover:text-white transition-colors"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-12 h-12 bg-yellow-accent/10 rounded-full flex items-center justify-center text-yellow-accent hover:bg-yellow-accent hover:text-white transition-colors"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-12 h-12 bg-yellow-accent/10 rounded-full flex items-center justify-center text-yellow-accent hover:bg-yellow-accent hover:text-white transition-colors"
              >
                <FaInstagram />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-yellow-accent transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-yellow-accent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-yellow-accent transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-4 bg-yellow-accent hover:bg-yellow-600 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Send Message</span>
                <FaPaperPlane />
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600">Sandeep Kota 2024</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
