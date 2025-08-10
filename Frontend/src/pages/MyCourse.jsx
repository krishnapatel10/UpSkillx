import React, { useEffect, useState } from "react";
import axios from "axios";
import { GraduationCap } from "lucide-react";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user")); // Ensure user ID is stored
        const res = await axios.get(`http://localhost:5500/api/enroll/getEnrolls/${user._id}`, {
          headers: {
            'Authorization': token
          }
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-purple-600 w-8 h-8" />
        <h2 className="text-3xl font-bold text-gray-800">My Enrolled Courses</h2>
      </div>

      {courses.length === 0 ? (
        <div className="text-center mt-10 text-gray-600 text-lg">
          You haven’t enrolled in any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 border border-purple-200"
            >
              <img
                src={course.courseId?.poster}
                alt="Course Poster"
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-purple-700">{course.courseId?.name}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{course.courseId?.description}</p>
              <div className="mt-3 text-sm text-purple-600 font-medium">
                Duration: {course.courseId?.duration} hour
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
