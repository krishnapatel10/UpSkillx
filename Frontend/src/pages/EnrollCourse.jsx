import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, Clock, CheckCircle, Sparkles, Heart } from 'lucide-react';

export default function EnrollCourse() {
  const { cid } = useParams();
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
      const API = import.meta.env.VITE_API_URL;   // ✅ ENV VARIABLE

    async function fetchCourse() {
      try {
        const res = await axios.get(`${API}/api/courses/${cid}`, {

          headers: { Authorization: token },
        });
        setCourseData(res.data);
      } catch (err) {
        console.error("Failed to fetch course:", err.message);
      }
    }

    fetchCourse();
  }, [cid]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user")); // assumes user is saved in localStorage

      const res = await axios.post(
        "http://localhost:5500/api/enroll/addNewEnroll",
        {
          userId: userData._id,
          courseId: cid,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Enrollment Successful!");
      navigate("/mycourses"); // redirect to mycourses after enroll
    } catch (err) {
      console.error("Enrollment failed:", err);
      alert(err?.response?.data?.message || "Enrollment failed!");
    }
  };

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading course details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 px-4 py-16 md:px-12">
      <h1 className="text-2xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
        Enroll in <span className="underline">{courseData.name}</span>
      </h1>

      {/* Course Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10">
        <img
          src={courseData.poster}
          alt={courseData.name}
          className="w-full h-70 object-cover rounded-2xl mb-6 shadow-md"
        />

        <h2 className="text-3xl font-bold text-purple-700 mb-2">{courseData.name}</h2>
        <p className="text-gray-600 mb-6">{courseData.description}</p>

        <div className="flex flex-wrap gap-4 text-sm font-medium mb-6">
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" /> {courseData.duration} weeks
          </span>
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4" /> Certificate
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-purple-600 text-2xl font-bold">${courseData.price}</span>
        </div>

        <button
          onClick={handleEnroll}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          Confirm Enrollment
        </button>
      </div>
    </div>
  );
}
