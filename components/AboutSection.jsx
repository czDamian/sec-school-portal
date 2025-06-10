"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaUsers, FaTrophy, FaBook } from "react-icons/fa";

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: FaBook,
      title: "Academic Excellence",
      description:
        "Comprehensive curriculum designed to prepare students for higher education and future careers.",
    },
    {
      icon: FaUsers,
      title: "Character Development",
      description:
        "Building moral values, leadership skills, and social responsibility in every student.",
    },
    {
      icon: FaTrophy,
      title: "Extracurricular Activities",
      description:
        "Sports, arts, clubs, and competitions to develop well-rounded individuals.",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Our School</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            For over five decades, Memorial Grammar School has been a beacon of
            educational excellence in Lagos, Nigeria, shaping minds and building
            character.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 card-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="text-white text-2xl" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Our Mission
            </h3>
            <p className="text-gray-300">
              To provide quality education that nurtures intellectual growth,
              character development, and social responsibility, preparing
              students to become leaders and contributors to society.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-8 rounded-2xl border border-yellow-500/20">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Our Vision
            </h3>
            <p className="text-gray-300">
              To be the leading secondary school in Nigeria, recognized for
              academic excellence, character formation, and producing graduates
              who make positive impacts globally.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
