"use client";

import { useUser } from "@civic/auth/react";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserCircle, FaEdit, FaFileAlt, FaBell } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const classLevels = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

const Page = () => {
  const { signOut, user } = useUser();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    regNumber: "",
    country: "",
    state: "",
    phoneNumber: "",
    class: "JSS1",
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  useEffect(() => {
    const checkProfile = async () => {
      if (user?.email) {
        try {
          const response = await fetch(
            `/api/student-profile?email=${user.email}`
          );
          const data = await response.json();

          // Check if data exists and has the array
          if (data.isUser && data.data?.[0]) {
            setProfileData(data.data[0]); // Access the first item in the array
          } else {
            setShowForm(true);
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      checkProfile();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/student-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email: user.email,
          role: "student",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.data);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  if (!user) return <div>User not logged in</div>;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="regNumber"
              placeholder="Registration Number"
              value={formData.regNumber}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              {classLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profileData?.firstName || "Student"}! 👋
        </h1>
        <p className="text-white/80">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/dashboard/profile">
          <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
            <FaUserCircle className="text-3xl text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">
              View Profile
            </h3>
            <p className="text-gray-400 text-sm">
              Check your student information and academic details
            </p>
          </div>
        </Link>

        <Link href="/dashboard/update-profile">
          <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
            <FaEdit className="text-3xl text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Update Profile
            </h3>
            <p className="text-gray-400 text-sm">
              Keep your contact information up to date
            </p>
          </div>
        </Link>

        <Link href="/dashboard/results">
          <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 transition-all cursor-pointer group">
            <FaFileAlt className="text-3xl text-green-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">View Results</h3>
            <p className="text-gray-400 text-sm">
              Access your academic performance and results
            </p>
          </div>
        </Link>
      </div>

      {/* Announcements Section */}
      <div className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10">
        <div className="flex items-center mb-4">
          <FaBell className="text-2xl text-yellow-400 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Recent Announcements
          </h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-yellow-400 mb-1">New</p>
            <h3 className="text-white font-medium mb-1">
              End of Term Examination
            </h3>
            <p className="text-gray-400 text-sm">
              Final examinations begin next week. Please check the timetable.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="text-white font-medium mb-1">School Activities</h3>
            <p className="text-gray-400 text-sm">
              Inter-house sports competition scheduled for next month.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-[#1a1f3d] p-4 rounded-lg border border-white/10">
          <p className="text-sm text-gray-400">Current Term</p>
          <p className="text-xl font-semibold text-white">2nd Term</p>
        </div>
        <div className="bg-[#1a1f3d] p-4 rounded-lg border border-white/10">
          <p className="text-sm text-gray-400">Class</p>
          <p className="text-xl font-semibold text-white">
            {profileData?.class}
          </p>
        </div>
        <div className="bg-[#1a1f3d] p-4 rounded-lg border border-white/10">
          <p className="text-sm text-gray-400">Academic Year</p>
          <p className="text-xl font-semibold text-white">2024/2025</p>
        </div>
        <div className="bg-[#1a1f3d] p-4 rounded-lg border border-white/10">
          <p className="text-sm text-gray-400">Next Assessment</p>
          <p className="text-xl font-semibold text-white">2 weeks</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
