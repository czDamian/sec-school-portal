"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaTrophy, FaStar, FaAward, FaMedal } from "react-icons/fa";

function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const achievements = [
    {
      icon: FaAward,
      title: "Best Secondary School Award",
      year: "2023",
      description: "Lagos State Education Excellence Award",
    },
    {
      icon: FaMedal,
      title: "National Science Competition",
      year: "2023",
      description: "1st Place in National Physics Olympiad",
    },
    {
      icon: FaTrophy,
      title: "Inter-School Sports Championship",
      year: "2022",
      description: "Overall Champions in Athletics",
    },
    {
      icon: FaStar,
      title: "Academic Excellence",
      year: "2022",
      description: "95% WAEC Success Rate",
    },
  ];

  return (
    <section
      ref={ref}
      id="achievements"
      className="py-24 px-4 bg-gradient-to-br from-gray-900/50 to-gray-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Achievements</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating our students' success and the school's commitment to
            excellence in academics, sports, and character development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl backdrop-blur-sm border border-gray-700/50 text-center card-hover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <achievement.icon className="text-white text-2xl" />
              </motion.div>
              <div className="text-sm text-yellow-400 font-semibold mb-2">
                {achievement.year}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {achievement.title}
              </h3>
              <p className="text-gray-300 text-sm">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default AchievementsSection;
