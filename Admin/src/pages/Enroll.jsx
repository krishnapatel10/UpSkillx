import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Enroll() {
  const [enroll, setEnroll] = useState([]);
  const API = import.meta.env.VITE_API_URL;   // ✅ IMPORTANT

  useEffect(() => {
    async function GetEnroll() {
      try {
        let res = await axios.get(`${API}/api/enroll/getAllEnroll`);
        setEnroll(res.data);
        console.log("Enrollments:", res.data);
      } catch (err) {
        console.error("Failed to fetch enrollments:", err.message);
      }
    }
    GetEnroll();
  }, []);

  return (
    <div className="bg-gray-100">
      {enroll.map((e, index) => (
        <div key={index} className="p-4 border-b">
          <h2 className="font-bold text-lg">
            Course: {e.courseId?.name || "No course"}
          </h2>
          <p>User: {e.userId?.name || "No user linked"}</p>
          <p>Email: {e.userId?.email || "N/A"}</p>
          <p>Duration: {e.courseId?.duration} weeks</p>
          <p>Price: ${e.courseId?.price}</p>
        </div>
      ))}
    </div>
  );
}
