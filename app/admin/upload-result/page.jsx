"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import {
  FaBook,
  FaUserGraduate,
  FaCalendarAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";

const classLevels = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const terms = ["1st Term", "2nd Term", "3rd Term"];
const currentYear = new Date().getFullYear();
const academicYears = [
  `${currentYear - 3}/${currentYear - 2}`,
  `${currentYear - 2}/${currentYear - 1}`,
  `${currentYear - 1}/${currentYear}`,
  `${currentYear}/${currentYear + 1}`,
  `${currentYear + 1}/${currentYear + 2}`,
];

export default function UploadResult() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    academicYear: `${currentYear - 1}/${currentYear}`,
    term: "1st Term",
    class: "",
    subjects: {
      english: { assessmentScore: 0, examScore: 0 },
      mathematics: { assessmentScore: 0, examScore: 0 },
      biology: { assessmentScore: 0, examScore: 0 },
      chemistry: { assessmentScore: 0, examScore: 0 },
      physics: { assessmentScore: 0, examScore: 0 },
      agriculture: { assessmentScore: 0, examScore: 0 },
      history: { assessmentScore: 0, examScore: 0 },
      marketing: { assessmentScore: 0, examScore: 0 },
    },
    teacherComment: "",
    principalComment: "",
  });

  // Fetch students when class changes
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/student-profile?class=${selectedClass}`);
        const data = await res.json();
        if (data.data) {
          setStudents(data.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setFormData((prev) => ({ ...prev, class: e.target.value, student: "" }));
  };

  const handleSubjectChange = (subject, field, value) => {
    setFormData((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: {
          ...prev.subjects[subject],
          [field]: Number(value),
        },
      },
    }));
  };

  const clearForm = () => {
    setFormData({
      student: "",
      academicYear: `${currentYear - 1}/${currentYear}`,
      term: "1st Term",
      class: "",
      subjects: {
        english: { assessmentScore: 0, examScore: 0 },
        mathematics: { assessmentScore: 0, examScore: 0 },
        biology: { assessmentScore: 0, examScore: 0 },
        chemistry: { assessmentScore: 0, examScore: 0 },
        physics: { assessmentScore: 0, examScore: 0 },
        agriculture: { assessmentScore: 0, examScore: 0 },
        history: { assessmentScore: 0, examScore: 0 },
        marketing: { assessmentScore: 0, examScore: 0 },
      },
      teacherComment: "",
      principalComment: "",
    });
    setSelectedClass("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        clearForm();
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.message || "An error occurred while uploading the result");
      }
    } catch (error) {
      setError("Network error: Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <AiOutlineCloudUpload className="text-2xl text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Upload Student Result
          </h1>
          <p className="text-gray-400">
            Enter student scores and assessment details
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-[#131734]/80 p-6 rounded-xl backdrop-blur-lg border border-white/10"
      >
        {/* Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Class", "Student", "Academic Year", "Term"].map((label, index) => (
            <div
              key={label}
              className="bg-[#0f1225] p-4 rounded-lg border border-gray-800"
            >
              <label className="flex items-center space-x-2 text-gray-300 mb-2">
                {index === 0 && (
                  <FaChalkboardTeacher className="text-blue-400" />
                )}
                {index === 1 && <FaUserGraduate className="text-blue-400" />}
                {index === 2 && <FaCalendarAlt className="text-blue-400" />}
                {index === 3 && <FaBook className="text-blue-400" />}
                <span>{label}</span>
              </label>
              <select
                value={
                  index === 0
                    ? selectedClass
                    : index === 1
                    ? formData.student
                    : index === 2
                    ? formData.academicYear
                    : formData.term
                }
                onChange={(e) => {
                  if (index === 0) handleClassChange(e);
                  else if (index === 1)
                    setFormData((prev) => ({
                      ...prev,
                      student: e.target.value,
                    }));
                  else if (index === 2)
                    setFormData((prev) => ({
                      ...prev,
                      academicYear: e.target.value,
                    }));
                  else
                    setFormData((prev) => ({ ...prev, term: e.target.value }));
                }}
                disabled={index === 1 && !selectedClass}
                className="w-full bg-[#1a1f3d] border border-gray-800 rounded-md p-2.5 text-white 
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              >
                <option value="">{`Select ${label}`}</option>
                {index === 0 &&
                  classLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                {index === 1 &&
                  students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                {index === 2 &&
                  academicYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                {index === 3 &&
                  terms.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>

        {/* Subjects Table Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <FaBook className="text-blue-400" />
            <span>Subject Scores</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f1225] border-b border-gray-800">
                <tr>
                  <th className="text-left p-4 text-gray-400">Subject</th>
                  <th className="text-left p-4 text-gray-400">
                    Assessment (40)
                  </th>
                  <th className="text-left p-4 text-gray-400">Exam (60)</th>
                  <th className="text-left p-4 text-gray-400">Total (100)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(formData.subjects).map(
                  ([subject, scores], index) => (
                    <tr
                      key={subject}
                      className={`border-b border-gray-800 ${
                        index % 2 === 0 ? "bg-black/20" : "bg-black/30"
                      }`}
                    >
                      <td className="p-4">
                        <span className="capitalize text-blue-400 font-medium">
                          {subject}
                        </span>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="40"
                          value={scores.assessmentScore}
                          onChange={(e) =>
                            handleSubjectChange(
                              subject,
                              "assessmentScore",
                              e.target.value
                            )
                          }
                          className="w-20 bg-[#1a1f3d] border border-gray-800 rounded-md p-2 text-white
                                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          required={
                            subject === "english" || subject === "mathematics"
                          }
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="60"
                          value={scores.examScore}
                          onChange={(e) =>
                            handleSubjectChange(
                              subject,
                              "examScore",
                              e.target.value
                            )
                          }
                          className="w-20 bg-[#1a1f3d] border border-gray-800 rounded-md p-2 text-white
                                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          required={
                            subject === "english" || subject === "mathematics"
                          }
                        />
                      </td>
                      <td className="p-4 text-gray-400">
                        {Number(scores.assessmentScore) +
                          Number(scores.examScore)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comments Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
            <label className="flex items-center space-x-2 text-gray-300 mb-2">
              <FaChalkboardTeacher className="text-blue-400" />
              <span>Teacher's Comment</span>
            </label>
            <textarea
              value={formData.teacherComment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  teacherComment: e.target.value,
                }))
              }
              className="w-full bg-black/50 border border-gray-700 rounded-md p-2.5 text-white
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              rows="3"
            />
          </div>
          <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
            <label className="flex items-center space-x-2 text-gray-300 mb-2">
              <FaUserGraduate className="text-blue-400" />
              <span>Principal's Comment</span>
            </label>
            <textarea
              value={formData.principalComment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  principalComment: e.target.value,
                }))
              }
              className="w-full bg-black/50 border border-gray-700 rounded-md p-2.5 text-white
                       focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              rows="3"
            />
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-2 text-red-400">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center space-x-2 text-green-400">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Result uploaded successfully!</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 
                   rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <AiOutlineCloudUpload className="text-xl" />
              <span>Upload Result</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
