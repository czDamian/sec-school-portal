"use client";

import { useUser } from "@civic/auth/react";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";
import {
  FaGraduationCap,
  FaRegCalendarAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";

const ResultModal = ({ result, onClose }) => {
  // Calculate grade statistics
  const totalSubjects = Object.keys(result.subjects).length;
  const gradeCount = Object.values(result.subjects).reduce((acc, subject) => {
    acc[subject.grade] = (acc[subject.grade] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#131734] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Result Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Student Information Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FaUserGraduate className="mr-2 text-blue-400" />
                  Student Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-medium">
                      {result.student.firstName} {result.student.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Class:</span>
                    <span className="text-white font-medium">
                      {result.student.class}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Result Class:</span>
                    <span className="text-white font-medium">
                      {result.class}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FaRegCalendarAlt className="mr-2 text-purple-400" />
                  Academic Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Academic Year:</span>
                    <span className="text-white font-medium">
                      {result.academicYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Term:</span>
                    <span className="text-white font-medium">
                      {result.term}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Score:</span>
                    <span className="text-white font-medium">
                      {result.average.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade Summary Card */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/10 p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-green-400" />
                  Grade Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {gradeCount["A"] || 0}
                    </div>
                    <div className="text-sm text-gray-400">A Grades</div>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {gradeCount["B"] || 0}
                    </div>
                    <div className="text-sm text-gray-400">B Grades</div>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {gradeCount["C"] || 0}
                    </div>
                    <div className="text-sm text-gray-400">C Grades</div>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {gradeCount["F"] || 0}
                    </div>
                    <div className="text-sm text-gray-400">F Grades</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Result Header */}
            <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/10">
              <FaGraduationCap className="w-12 h-12 mx-auto text-blue-400 mb-2" />
              <h3 className="text-xl font-bold text-white">
                {result.academicYear}
              </h3>
              <p className="text-gray-400">
                {result.term} - {result.class}
              </p>
            </div>

            {/* Subjects Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-[#1a1f3d]/50">
                <thead>
                  <tr className="bg-[#1a1f3d]">
                    <th className="border border-gray-700 p-3 text-left text-gray-300">
                      Subject
                    </th>
                    <th className="border border-gray-700 p-3 text-center text-gray-300">
                      Assessment (40)
                    </th>
                    <th className="border border-gray-700 p-3 text-center text-gray-300">
                      Exam (60)
                    </th>
                    <th className="border border-gray-700 p-3 text-center text-gray-300">
                      Total (100)
                    </th>
                    <th className="border border-gray-700 p-3 text-center text-gray-300">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result.subjects).map(
                    ([subject, scores], index) => (
                      <tr
                        key={subject}
                        className={
                          index % 2 === 0 ? "bg-black/20" : "bg-black/10"
                        }
                      >
                        <td className="border border-gray-700 p-3 capitalize text-blue-400">
                          {subject}
                        </td>
                        <td className="border border-gray-700 p-3 text-center text-gray-300">
                          {scores.assessmentScore}
                        </td>
                        <td className="border border-gray-700 p-3 text-center text-gray-300">
                          {scores.examScore}
                        </td>
                        <td className="border border-gray-700 p-3 text-center text-white font-medium">
                          {scores.total}
                        </td>
                        <td className="border border-gray-700 p-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              scores.grade === "A"
                                ? "bg-green-500/20 text-green-400"
                                : scores.grade === "B"
                                ? "bg-blue-500/20 text-blue-400"
                                : scores.grade === "C"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {scores.grade}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Comments Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-[#1a1f3d]/50 p-4 rounded-lg border border-white/10">
                <div className="flex items-center mb-3">
                  <FaChalkboardTeacher className="text-blue-400 mr-2" />
                  <h4 className="font-semibold text-white">
                    Teacher's Comment
                  </h4>
                </div>
                <p className="text-gray-400">
                  {result.teacherComment || "No comment"}
                </p>
              </div>
              <div className="bg-[#1a1f3d]/50 p-4 rounded-lg border border-white/10">
                <div className="flex items-center mb-3">
                  <FaGraduationCap className="text-purple-400 mr-2" />
                  <h4 className="font-semibold text-white">
                    Principal's Comment
                  </h4>
                </div>
                <p className="text-gray-400">
                  {result.principalComment || "No comment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ResultsPage() {
  const { user } = useUser();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`/api/results?email=${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setResults(data.data || []);
          console.log("Fetched results:", data.data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading results...</span>
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

  if (results.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-4">
            Your results will appear here once they are uploaded by your
            teachers.
          </p>
          <div className="p-8 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">Check back later for your results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <FaGraduationCap className="text-2xl text-white" />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-white">Academic Results</h1>
          <p className="text-gray-400">
            View your academic performance and results
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div
            key={index}
            onClick={() => setSelectedResult(result)}
            className="bg-[#1a1f3d] p-6 rounded-xl border border-white/10 hover:bg-white/5 
                     transition-all cursor-pointer group"
          >
            <FaRegCalendarAlt className="text-3xl text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {result.term} - {result.academicYear}
            </h3>
            <p className="text-gray-400 mb-4">Class: {result.class}</p>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center cursor-pointer">
              View Details
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {selectedResult && (
        <ResultModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}
