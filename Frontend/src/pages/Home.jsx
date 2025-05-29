import React, { useState, useEffect } from 'react';
import { Sparkles, Rocket, Users, Trophy, BookOpen, ArrowRight, Play, Star, CheckCircle, Target, Zap, Heart } from 'lucide-react';

export default function VibrantHomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const courses = [
    {
      title: 'Full-Stack Web Development',
      desc: 'Master React, Node.js, and databases with real-world projects.',
      color: 'from-blue-500 to-indigo-700',
      icon: '🚀',
      level: 'Beginner to Pro',
      duration: '12 Weeks',
      projects: '15+ Projects'
    },
    {
      title: 'Data Science Bootcamp',
      desc: 'Analyze data and build predictive models using Python.',
      color: 'from-green-400 to-teal-600',
      icon: '📊',
      level: 'Intermediate',
      duration: '16 Weeks',
      projects: '10+ Projects'
    },
    {
      title: 'Digital Marketing 101',
      desc: 'Learn SEO, social media, and ad campaigns to grow businesses.',
      color: 'from-pink-400 to-red-500',
      icon: '📈',
      level: 'Beginner',
      duration: '8 Weeks',
      projects: '12+ Campaigns'
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Interactive Learning',
      desc: 'Real projects, hands-on practice, and immediate feedback.',
      color: 'bg-gradient-to-r from-purple-400 to-pink-400'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Top Mentors',
      desc: 'Courses created by industry experts and educators.',
      color: 'bg-gradient-to-r from-blue-400 to-cyan-400'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Earn Certificates',
      desc: 'Boost your resume and get certified as you learn.',
      color: 'bg-gradient-to-r from-yellow-400 to-orange-400'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      feedback: 'The courses helped me land my dream job within 3 months!',
      role: 'Software Engineer',
      avatar: '👩‍💻',
      rating: 5
    },
    {
      name: 'David Lee',
      feedback: 'Clear content and practical exercises made learning fun.',
      role: 'Data Analyst',
      avatar: '👨‍🔬',
      rating: 5
    },
    {
      name: 'Emily Davis',
      feedback: 'Supportive mentors and great community made a difference.',
      role: 'Marketing Specialist',
      avatar: '👩‍💼',
      rating: 5
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Floating Elements */}
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

      {/* Navigation
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LearnHub
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Courses</a>
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About</a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Reviews</a>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
              Join Free
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        {/* Background Decorations */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-8 border border-purple-200">
            <Zap className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-purple-800 font-medium">Join 25,000+ Happy Learners</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Learn Skills.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Grow Fast.
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your career with expert-led online courses designed to boost your skills, confidence, and earning potential. Start your journey today! ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center">
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors font-semibold">
              <Play className="w-6 h-6 mr-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-1" />
              Watch Our Story (90s)
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '25K+', label: 'Students', icon: '🎓' },
              { number: '150+', label: 'Courses', icon: '📚' },
              { number: '98%', label: 'Success', icon: '🏆' },
              { number: '4.9★', label: 'Rating', icon: '⭐' }
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose LearnHub?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We make learning engaging, practical, and rewarding</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${activeFeature === i ? 'border-purple-300 scale-105' : 'border-transparent hover:border-purple-200'
                  }`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>

                {activeFeature === i && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Courses</h2>
            <p className="text-gray-600 text-lg">Hand-picked courses to accelerate your career</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col"
              >
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Icon and rating */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl">{course.icon}</div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {course.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {course.duration}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {course.projects}
                    </span>
                  </div>

                  {/* Enroll Button at bottom */}
                  <button
                    className={`mt-auto w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Student Success Stories</h2>
            <p className="text-gray-600 text-lg">See how our courses transformed careers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed">"{testimonial.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Target className="w-5 h-5 mr-2" />
            <span className="font-medium">Stay Ahead of the Curve</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join our newsletter for exclusive course updates, career tips, and special offers from industry experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 border-0 focus:outline-none focus:ring-4 focus:ring-white/30 font-medium"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Get Started Free
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Subscribe anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">UpSkillx</span>
          </div>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Empowering learners worldwide with cutting-edge courses and supportive community.
          </p>

          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            © 2024 UpSkillx. Made with ❤️ for learners everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}