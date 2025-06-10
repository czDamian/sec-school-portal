"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

function HomepageNav({ isMenuOpen, setIsMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Separate navigation links
  const navLinks = [
    { name: "Achievements", href: "/#achievements" },
    { name: "News", href: "/news" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#131734]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full flex items-center justify-center">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Memorial Grammar School
              </h1>
              <p className="text-sm text-gray-300">Excellence in Education</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            <Link href="/login">
              <motion.span
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Result Portal
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${
            isMenuOpen ? "max-h-64" : "max-h-0"
          }`}
          initial={false}
          animate={{
            maxHeight: isMenuOpen ? 256 : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white transition-colors duration-300 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <Link href="/login">
              <motion.span
                className="block text-gray-300 hover:text-white transition-colors duration-300 py-2 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ delay: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Result Portal
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default HomepageNav;
