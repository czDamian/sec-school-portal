"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "Annual Inter-House Sports Competition",
    date: "March 15, 2024",
    description:
      "Join us for our annual inter-house sports competition featuring track and field events.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 2,
    title: "Science Fair Winners Announced",
    date: "March 10, 2024",
    description:
      "Congratulations to all participants in this year's science fair. Special recognition to our winners.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 3,
    title: "New Computer Lab Opening",
    date: "March 5, 2024",
    description:
      "State-of-the-art computer laboratory opening ceremony scheduled for next week.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 4,
    title: "Parent-Teacher Conference",
    date: "February 28, 2024",
    description:
      "Important meeting for all parents to discuss student progress and school development.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 5,
    title: "Mathematics Competition Success",
    date: "February 20, 2024",
    description:
      "Our students excel at the state mathematics competition, bringing home multiple awards.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 6,
    title: "Cultural Day Celebration",
    date: "February 15, 2024",
    description:
      "Annual cultural day celebration showcasing our diverse heritage and traditions.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 7,
    title: "Sports Team Victory",
    date: "February 10, 2024",
    description:
      "School football team wins regional championship for the third consecutive year.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 8,
    title: "Art Exhibition Opening",
    date: "February 5, 2024",
    description:
      "Student art exhibition featuring paintings, sculptures, and digital art pieces.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 9,
    title: "Academic Excellence Awards",
    date: "January 30, 2024",
    description:
      "Recognition ceremony for students who achieved outstanding academic results.",
    image: "/inter-house.jpg", // Default image for all posts
  },
  {
    id: 10,
    title: "New Library Resources",
    date: "January 25, 2024",
    description:
      "School library updated with new books and digital learning resources.",
    image: "/inter-house.jpg", // Default image for all posts
  },
].map((item) => ({
  ...item,
  image: "/inter-house.jpg", // Adding default image to all items
}));

export default function News() {
  return (
    <section id="news" className="py-20 bg-[#131734]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Latest School News
          </h2>
          <p className="text-gray-400">
            Stay updated with the latest happenings at our school
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden hover:bg-white/20 
                       transition-all duration-300 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative w-full h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3} // Load first 3 images immediately
                />
              </div>

              {/* Content Container */}
              <div className="p-6">
                <div className="text-sm text-blue-400 mb-2">{news.date}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {news.title}
                </h3>
                <p className="text-gray-400">{news.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
