import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"


import NavBar from "./Components/NavBar.jsx"
import SideBar from "./Components/SideBar.jsx"

import Home from './pages/Home.jsx'
import Courses from "./pages/Courses.jsx"
import EnrollCourse from "./pages/EnrollCourse.jsx"
import About from "./Pages/About.jsx"
import Contact from './pages/Contact.jsx'
import MyCourse from './pages/MyCourse.jsx'

import Profile from './Components/Profile.jsx'
import Login from "./Components/Auth/Login.jsx"
import Signup from "./Components/Auth/Signup.jsx"
import Settings from './Components/Settings.jsx'
import NotFound from "./pages/NotFound.jsx"
import DoubtPage from './pages/doubt.jsx'


export default function App() {

    return (
        <div className="h-screen bg-gray-100 flex flex-col">
            <BrowserRouter>
                <Routes>
                    {/* Auth routes without SideBar and NavBar*/}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/*" element={<NotFound />} />

                    {/* Main routes with NavBar and SideBar */}
                    <Route path="/" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <Home />
                                </main>
                            </div>
                        </div>
                    } />

                    <Route path="/about" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <About />
                                </main>
                            </div>
                        </div>
                    } /> 

                    <Route path="/courses" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <Courses />
                                </main>
                            </div>
                        </div>
                    } />

                    <Route path="/doubt" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <DoubtPage />
                                </main>
                            </div>
                        </div>
                    } />
                    <Route path="/Contact" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <Contact />
                                </main>
                            </div>
                        </div>
                    } />

                    <Route path="/courses/enroll/:cid" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <EnrollCourse />
                                </main>
                            </div>
                        </div>
                    } />

                    <Route path="/mycourses" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <SideBar />
                                <main className="flex-1 overflow-y-auto p-4">
                                    <MyCourse />
                                </main>
                            </div>
                        </div>
                    } />

                </Routes>
            </BrowserRouter>
        </div>
    )
}
