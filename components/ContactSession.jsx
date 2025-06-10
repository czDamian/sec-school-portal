"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Contact Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with us for admissions, inquiries, or to schedule a
            visit to our campus.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white">Get In Touch</h3>

            <div className="space-y-6">
              {[
                {
                  icon: FaMapMarkerAlt,
                  title: "Address",
                  info: "123 Education Avenue, Victoria Island, Lagos, Nigeria",
                },
                { icon: FaPhone, title: "Phone", info: "+234 801 234 5678" },
                {
                  icon: FaEnvelope,
                  title: "Email",
                  info: "info@memorialgrammar.edu.ng",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <contact.icon className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {contact.title}
                    </h4>
                    <p className="text-gray-300">{contact.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                  (Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon />
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Send us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
