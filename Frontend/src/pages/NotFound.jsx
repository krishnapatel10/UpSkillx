import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
