"use client";

import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSession";
import HeroSection from "@/components/HeroSection";
import HomepageFooter from "@/components/HomepageFooter";
import HomepageNav from "@/components/HomepageNav";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-[#131734] overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <HomepageNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ContactSection />
      <HomepageFooter />
    </div>
  );
}
