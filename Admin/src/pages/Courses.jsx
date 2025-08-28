import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, Star } from "lucide-react";

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
        // console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err.message);
      }
    }

    fetchCourses();
  }, []);
 
  return (

   
    <div className="p-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((e) => (
          <div
            key={e._id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <img
              src={e.poster}
              alt={e.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-bold text-purple-700 mb-2">
              {e.name}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {e.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                <Clock className="w-4 h-4" /> {e.duration} weeks
              </span>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                <CheckCircle className="w-4 h-4" /> Certificate
              </span>
            </div>

            {/* Rating + Price */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-purple-600 text-lg font-bold">
                ${e.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
