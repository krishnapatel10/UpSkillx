import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function Courses() {
  const [success, setSuccess] = useState(false); // ✅ alert ke liye state
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let addCourse = {
      name: e.target[0].value,
      poster: e.target[1].value,
      duration: e.target[2].value,
      price: e.target[3].value,
      description: e.target[4].value,
    };
    let token = localStorage.getItem("token");

    try {
      let res = await axios.post("http://localhost:5500/api/courses", addCourse, {
        headers: {
          "Authorization": token,
        },
      });

      console.log("data send", res.data);
      setSuccess(true);  // ✅ success alert show hoga
      setError(false);
      e.target.reset();

      // 3 sec baad hide
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error(err);
      setError(true);  // ✅ error alert show hoga
      setTimeout(() => setError(false), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-4xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 pb-2 border-b border-gray-200">
          Add New Course
        </h1>



        

        {/* ✅ Alert Messages */}
        {success && (
          <Alert severity="success" className="mb-4">
            Course added successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="mb-4">
            Failed to add course. Try again!
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              placeholder="Enter Course name..."
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 hover:shadow-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Poster URL
            </label>
            <input
              type="text"
              placeholder="Poster URL"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 hover:shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Duration (hours)
            </label>
            <input
              type="number"
              placeholder="Duration"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 hover:shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 hover:shadow-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Description"
              rows="4"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 hover:shadow-sm"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-3 rounded-md hover:bg-blue-600 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
