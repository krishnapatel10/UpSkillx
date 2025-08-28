import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Star, Clock, CheckCircle, Sparkles, Heart } from 'lucide-react';

export default function Courses() {
  let navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchCourses() {
      try {
        const res = await axios.get("http://localhost:5500/api/courses", {
          headers: { Authorization: token }
        });
        setCourses(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err.message);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 px-4 py-16 md:px-12">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-16">
        Discover Amazing Courses
      </h1>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-500">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-60 right-40 animate-pulse delay-700">
          <Heart className="w-5 h-5 text-pink-400" />
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No courses available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={course.poster}
                  alt={course.name}
                  className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Course Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-purple-700 mb-2 group-hover:text-pink-600 transition-colors">
                  {course.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {course.description}
                </p>

                {/* Course Info */}
                <div className="flex flex-wrap gap-2 text-sm font-medium mb-4">
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" /> {course.duration} weeks
                  </span> 
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4" /> Certificate
                  </span>
                </div>

                {/* Price and Enroll */}
                <div className="mt-auto">
                  <div className="flex justify-between items-center text-gray-700 font-semibold mb-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-purple-600 text-lg font-bold">${course.price}</span>
                  </div>

                  <button onClick={() => {
                    navigate(`/courses/enroll/${course._id}`)
                  }} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>
      )}
    </div>
  );
}
