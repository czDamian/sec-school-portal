"use client";

import { useUser } from "@civic/auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineLoading3Quarters,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineIdcard,
  AiOutlineWarning,
  AiOutlineSave,
} from "react-icons/ai";
import {
  FaGraduationCap,
  FaGlobe,
  FaMapMarkerAlt,
  FaUser,
  FaLock,
} from "react-icons/fa";

const classLevels = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

const page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    regNumber: "",
    country: "",
    state: "",
    phoneNumber: "",
    class: "JSS1",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `/api/student-profile?email=${user.email}`
        );
        const data = await response.json();

        if (response.ok && data.data?.[0]) {
          setFormData(data.data[0]);
        } else {
          setError("Failed to fetch profile");
        }
      } catch (error) {
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const response = await fetch("/api/student-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard/profile");
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (error) {
      setError("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaGraduationCap className="text-3xl text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Update Your Profile
          </h2>
          <p className="text-gray-400">Manage your student information</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
          <AiOutlineWarning className="text-xl mr-2" />
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/5 rounded-xl p-6 backdrop-blur-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Non-editable fields */}
          <div>
            <label className="block text-sm text-gray-400 mb-1 flex items-center">
              <FaUser className="mr-2" />
              First Name
              <FaLock
                className="ml-2 text-yellow-500 text-xs"
                title="Contact admin to edit"
              />
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              className="w-full bg-white/5 border border-gray-700 p-2 rounded-lg text-gray-400 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center">
              <FaUser className="mr-2" />
              Last Name
              <FaLock
                className="ml-2 text-yellow-500 text-xs"
                title="Contact admin to edit"
              />
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              className="w-full bg-white/5 border border-gray-700 p-2 rounded-lg text-gray-400 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Editable fields */}
          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center">
              <AiOutlineIdcard className="mr-2" />
              Registration Number
              <FaLock
                className="ml-2 text-yellow-500 text-xs"
                title="Contact admin to edit"
              />
            </label>
            <input
              type="text"
              name="regNumber"
              value={formData.regNumber}
              className="w-full bg-white/5 border border-gray-700 p-2 rounded-lg text-gray-400 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center">
              <FaGraduationCap className="mr-2" />
              Class
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full bg-[#131734] border border-gray-700 p-2 rounded-lg text-white focus:border-blue-500 transition-colors"
              required
            >
              {classLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center">
              <FaGlobe className="mr-2" />
              Country
              <FaLock
                className="ml-2 text-yellow-500 text-xs"
                title="Contact admin to edit"
              />
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              className="w-full bg-white/5 border border-gray-700 p-2 rounded-lg text-gray-400 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-white/5 border border-gray-700 p-2 rounded-lg text-white focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center">
              <AiOutlinePhone className="mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full bg-white/5 border border-gray-700 p-2 rounded-lg text-white focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Admin Notice */}
        <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-start space-x-3">
            <AiOutlineWarning className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-yellow-500 font-medium mb-1">
                Important Notice
              </h4>
              <p className="text-gray-400 text-sm">
                To update your first name, last name, or country information,
                please contact the school administrator at{" "}
                <a
                  href="mailto:admin@mg-school.com"
                  className="text-blue-400 hover:underline"
                >
                  admin@mg-school.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg
                   hover:shadow-lg transition-all duration-300 disabled:from-gray-500 disabled:to-gray-600
                   flex items-center justify-center space-x-2"
        >
          <AiOutlineSave className={updating ? "animate-spin" : ""} />
          <span>{updating ? "Updating..." : "Save Changes"}</span>
        </button>
      </form>
    </div>
  );
};

export default page;
