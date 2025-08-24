import React from 'react';
import { Users, BookOpen, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-10">
          At <span className="font-semibold text-purple-600">SkillSprout</span>, we're passionate about helping learners thrive through engaging and practical online courses. Whether you're just starting out or looking to sharpen your skills, we’ve got you covered!
        </p>

        {/* Core Values Section */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <Users className="text-pink-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Community Driven</h3>
            <p className="text-gray-600">
              We believe in building a learning environment where students and instructors connect, share, and grow together.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <BookOpen className="text-yellow-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Quality Education</h3>
            <p className="text-gray-600">
              Our courses are curated by industry experts and structured to give you real-world skills you can apply right away.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <ShieldCheck className="text-green-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Trusted & Secure</h3>
            <p className="text-gray-600">
              We ensure a secure and seamless experience so you can focus entirely on your learning journey.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mt-16 bg-gradient-to-r from-white via-purple-50 to-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Founded in 2025, <strong>SkillSprout</strong> started with a vision to make high-quality education accessible to everyone. From humble beginnings with just a few passionate instructors, we’ve grown into a vibrant platform offering hundreds of curated courses. Our mission is simple — empower people through knowledge and creativity.
          </p>
        </div>
      </div>
    </div>
  );
}
