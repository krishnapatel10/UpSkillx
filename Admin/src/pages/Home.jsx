import React, { useState, useEffect } from "react";
import { Users, BookOpen, TrendingUp, Activity, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [courses, setCourses] = useState([]);
  let [user, setUserData] = useState([])
  const [enroll, setEnroll] = useState([]);
  const [enrollCount, setEnrollCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  let [usercount, setusercount] = useState(0)



  useEffect(() => {
    async function GetEnroll() {
      try {
        let res = await axios.get("http://localhost:5500/api/enroll/getAllEnroll");
          setEnroll(res.data);
        setEnrollCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch enrollments:", err.message);
      }
    }
    GetEnroll();
  }, []);


  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:5500/api/users")
      setUserData(res.data);
      // console.log(res.data);
      setusercount(res.data.length)

    }
    getData();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchCourses() {
      try {
        const res = await axios.get("http://localhost:5500/api/courses", {
          headers: { Authorization: token },
        });
        setCourses(res.data);
        setCourseCount(res.data.length); // yaha count set hoga
      } catch (err) {
        console.error("Failed to fetch courses:", err.message);
      }
    }

    fetchCourses();
  }, []);

  let navigate = useNavigate();

  const stats = [
    {
      name: "Total Users",
      value: usercount,
      icon: <Users className="w-10 h-10 text-blue-600" />,
      desc: "Registered learners on the platform",
      onClick: () => navigate("/user")  // <-- yaha fix
    },
    {
      name: "Total Courses",
      value: courseCount, // yaha dynamic count dikh jaayega
      icon: <BookOpen className="w-10 h-10 text-green-600" />,
      desc: "Available courses for students",
      onClick: () => navigate("/courses"),
    },
    {
      name: "Active Enrollments",
      value: enrollCount,
      icon: <Activity className="w-10 h-10 text-purple-600" />,
      desc: "Students currently enrolled",
      onClick: () => navigate("/enroll"),
    },
    {
      name: "Monthly Growth",
      value: "12%",
      icon: <TrendingUp className="w-10 h-10 text-orange-600" />,
      desc: "Compared to last month",
    },
  ];

  const recentUsers = [
    { id: 1, name: "Rohit Sharma", email: "rohit@example.com" },
    { id: 2, name: "Sneha Patel", email: "sneha@example.com" },
    { id: 3, name: "Arjun Verma", email: "arjun@example.com" },
    { id: 4, name: "Priya Mehta", email: "priya@example.com" },
    { id: 5, name: "Mohit Choudhary", email: "mohit@example.com" },
    { id: 6, name: "Karan Gupta", email: "karan@example.com" },
  ];

  const recentCourses = [
    { id: 1, title: "MERN Stack Development", instructor: "Rahul Jain" },
    { id: 2, title: "UI/UX Design Basics", instructor: "Neha Kapoor" },
    { id: 3, title: "Python for Data Science", instructor: "Amit Singh" },
    { id: 4, title: "Cloud Computing", instructor: "Rakesh Yadav" },
    { id: 5, title: "AI & Machine Learning", instructor: "Ananya Sharma" },
    { id: 6, title: "DevOps Fundamentals", instructor: "Suresh Kumar" },
  ];

  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Section */}
      <main className="flex-1 container mx-auto px-6 py-10">
        {/* Header with Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Platform Overview
          </h2>
          <button onClick={() => navigate("/add-course")} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 cursor-pointer transition">
            <PlusCircle className="w-5 h-5" />
            Add Course
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              onClick={stat.onClick}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {stat.icon}
                <div>
                  <h3 className="text-gray-500 text-sm">{stat.name}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
              <p className="text-gray-600 mt-3 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Users & Courses */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Users
            </h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {(showAllUsers ? user : user.slice(0, 3)).map(
                  (user, index) => (
                    <tr key={user._id || index} className="border-b hover:bg-gray-50">
                      <td className="py-2">{user.name}</td>
                      <td className="py-2">{user.email}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <button
              onClick={() => setShowAllUsers(!showAllUsers)}
              className="mt-3 text-blue-600 text-sm hover:underline"
            >
              {showAllUsers ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* Recent Courses */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Courses
            </h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Course</th>
                  <th className="py-2">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {(showAllCourses ? recentCourses : recentCourses.slice(0, 3)).map(
                  (course) => (
                    <tr key={course.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{course.title}</td>
                      <td className="py-2">{course.instructor}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <button
              onClick={() => setShowAllCourses(!showAllCourses)}
              className="mt-3 text-blue-600 text-sm hover:underline"
            >
              {showAllCourses ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-4 text-center text-gray-500 text-sm">
        © 2025 UpSkillX Admin. All rights reserved.
      </footer>
    </div>
  );
}
