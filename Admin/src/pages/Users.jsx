import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
    const API = import.meta.env.VITE_API_URL;   // ✅ IMPORTANT

  useEffect(() => {
    async function getdata() {
      try {
        let res = await axios.get(`${API}/api/users/`);
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getdata();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Users List
        </h1>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border-b">Profile</th>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Age</th>
                  <th className="py-3 px-4 border-b">Role</th>
                  <th className="py-3 px-4 border-b">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="text-center hover:bg-gray-50">
                    <td className="py-2 px-4 border-b flex justify-center">
                      <img
                        src={u.profilePicture}
                        alt={u.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{u.name}</td>
                    <td className="py-2 px-4 border-b">{u.email}</td>
                    <td className="py-2 px-4 border-b">{u.age}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          u.role === "Admin" ? "bg-red-500" : "bg-green-500"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
