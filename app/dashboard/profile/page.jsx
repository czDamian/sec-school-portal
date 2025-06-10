"use client";

import { useUser } from "@civic/auth/react";
import { useState, useEffect } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineIdcard,
  AiOutlineBook,
} from "react-icons/ai";
import { FaGraduationCap, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `/api/student-profile?email=${user.email}`
        );
        const data = await response.json();

        if (response.ok && data.data?.[0]) {
          setProfile(data.data[0]);
        } else {
          setError(data.error || "Failed to fetch profile");
        }
      } catch (error) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">No Profile Found</h2>
          <p className="text-gray-600">
            Please complete your profile registration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-[#131734] rounded-2xl shadow-xl p-8 mb-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1 mb-4">
            <div className="w-full h-full bg-[#1a1f3d] rounded-full flex items-center justify-center">
              <FaGraduationCap className="text-4xl text-blue-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-blue-400">{profile.class} Student</p>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-3">
              <AiOutlineIdcard className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-gray-400 text-sm">Registration Number</h3>
                <p className="text-white font-medium">{profile.regNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-3">
              <AiOutlineMail className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-gray-400 text-sm">Email Address</h3>
                <p className="text-white font-medium">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-3">
              <AiOutlinePhone className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-gray-400 text-sm">Phone Number</h3>
                <p className="text-white font-medium">{profile.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-3">
              <AiOutlineBook className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-gray-400 text-sm">Class</h3>
                <p className="text-white font-medium">{profile.class}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-3">
              <FaGlobe className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-gray-400 text-sm">Country</h3>
                <p className="text-white font-medium">{profile.country}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-lg hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-2xl text-blue-400" />
              <div>
                <h3 className="text-gray-400 text-sm">State</h3>
                <p className="text-white font-medium">{profile.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
