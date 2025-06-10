"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function HomepageFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black py-12 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* School Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full flex items-center justify-center">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Memorial Grammar School
                </h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Nurturing excellence and character in Lagos, Nigeria for over 50
              years. Building tomorrow's leaders through quality education and
              moral values.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Admissions",
                "Academic Programs",
                "Student Life",
                "Alumni",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <div className="space-y-2 text-gray-400">
              <p>123 Education Avenue</p>
              <p>Victoria Island, Lagos</p>
              <p>Nigeria</p>
              <p>+234 801 234 5678</p>
              <p>info@memorialgrammar.edu.ng</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Memorial Grammar School. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default HomepageFooter;
