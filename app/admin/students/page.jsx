"use client";

import { useState, useEffect } from "react";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const classLevels = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

export default function StudentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        const { data } = await response.json();

        // Create a map of all class levels with 0 as default count
        const classStats = Object.fromEntries(
          classLevels.map((level) => [level, 0])
        );

        // Update counts from API data
        data.studentsByClass.forEach((stat) => {
          if (classStats.hasOwnProperty(stat._id)) {
            classStats[stat._id] = stat.count;
          }
        });

        // Convert to array for rendering
        setStats(Object.entries(classStats));
      } catch (error) {
        setError("Failed to fetch student statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaUsers className="text-2xl text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Student Distribution
          </h1>
          <p className="text-gray-400">
            Overview of students across all classes
          </p>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(([classLevel, count]) => (
          <div
            key={classLevel}
            className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <FaChalkboardTeacher className="text-3xl text-blue-400" />
              <span className="text-2xl font-bold text-white">{count}</span>
            </div>
            <h3 className="text-lg text-white">{classLevel}</h3>
            <p className="text-gray-400 text-sm">
              {count === 1 ? "student" : "students"} enrolled
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
