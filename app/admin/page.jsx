"use client";

import { useUser } from "@civic/auth/react";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaUsers,
  FaUpload,
  FaBullhorn,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSchool,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalResults: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.email) {
        try {
          const response = await fetch("/api/stats");
          const { data } = await response.json();
          setStats({
            totalStudents: data.totalStudents,
            totalResults: data.totalResults,
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (!user) return <div>Access denied</div>;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-white/80">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <FaSchool className="text-5xl text-white/20" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <FaUsers className="text-3xl text-blue-400" />
            <span className="text-2xl font-bold text-white">
              {stats.totalStudents}
            </span>
          </div>
          <h3 className="text-lg text-white">Total Students</h3>
        </div>

        <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <FaGraduationCap className="text-3xl text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {stats.totalResults}
            </span>
          </div>
          <h3 className="text-lg text-white">Results Uploaded</h3>
        </div>

        <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <FaBullhorn className="text-3xl text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {stats.totalAnnouncements}
            </span>
          </div>
          <h3 className="text-lg text-white">Announcements</h3>
          <p className="text-gray-400 text-sm">No announcements </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/admin/students">
          <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
            <FaUsers className="text-3xl text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Manage Students
            </h3>
            <p className="text-gray-400 text-sm">
              View and manage student records, profiles, and information
            </p>
          </div>
        </Link>

        <Link href="/admin/upload-result">
          <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
            <FaUpload className="text-3xl text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Upload Results
            </h3>
            <p className="text-gray-400 text-sm">
              Record examination results for the students
            </p>
          </div>
        </Link>

        <Link href="#">
          <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
            <FaBullhorn className="text-3xl text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Announcements
            </h3>
            <p className="text-gray-400 text-sm">
              Manage and publish announcements
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10">
        <div className="flex items-center mb-4">
          <FaChalkboardTeacher className="text-2xl text-green-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Recent Activities
          </h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-blue-400 mb-1">Student Registration</p>
            <p className="text-white font-medium mb-1">
              New student registered
            </p>
            <p className="text-gray-400 text-sm">2 hours ago</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-purple-400 mb-1">Result Upload</p>
            <p className="text-white font-medium mb-1">
              SS2 First Term results uploaded
            </p>
            <p className="text-gray-400 text-sm">5 hours ago</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-yellow-400 mb-1">Announcement</p>
            <p className="text-white font-medium mb-1">
              New announcement published
            </p>
            <p className="text-gray-400 text-sm">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
