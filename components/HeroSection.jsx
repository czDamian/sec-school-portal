"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaTrophy, FaChevronRight } from "react-icons/fa";

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-20 px-4"
    >
      {/* Background Blob */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blob floating"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">Memorial</span>
            <br />
            <span className="text-white text-5xl">Grammar School</span>
            {/* text-5xl allows both text to stay on the same line */}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nurturing excellence and character in Nigeria, Where tradition meets
            innovation to create tomorrow's leaders through quality education
            and moral values.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our School
              <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-yellow-500 text-yellow-500 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "50+", label: "Years of Excellence" },
              { number: "2054+", label: "Alumni Network" },
              { number: "99%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl bg-red-500 font-bold gradient-text">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* School Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <motion.div
              className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/school-logo.jpg"
                alt="Memorial Grammar School Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold">Our Beautiful Campus</h3>
                <p className="text-gray-300">Lagos, Nigeria</p>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
            >
              <FaTrophy className="text-white text-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default HeroSection;