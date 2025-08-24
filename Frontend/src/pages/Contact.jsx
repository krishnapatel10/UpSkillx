import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-center text-purple-800 mb-6">Get in Touch</h1>
                <p className="text-center text-gray-600 mb-10">
                    We'd love to hear from you! Whether you have questions, feedback, or just want to say hello.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold">Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <input
                                type="email"
                                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Message</label>
                            <textarea
                                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                rows="4"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Details */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="flex items-center space-x-4">
                            <Mail className="text-purple-600 w-6 h-6" />
                            <span className="text-gray-700">krishnapatel71006@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Phone className="text-purple-600 w-6 h-6" />
                            <span className="text-gray-700">+91 9424887149</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <MapPin className="text-purple-600 w-6 h-6" />
                            <span className="text-gray-700">230, village Chandana,india</span>
                        </div>

                        <div className="mt-6">
                          
                            <iframe  className="w-full h-48 rounded-xl border border-gray-300"
                                title="Map"
                                loading="lazy"
                                allowFullScreen src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16627.675135499896!2d75.97297599703813!3d22.958378568510582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396310b2b5cefefb%3A0xf773627372eadc04!2sChandana%2C%20Madhya%20Pradesh%20455001!5e1!3m2!1sen!2sin!4v1748846279818!5m2!1sen!2sin"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
