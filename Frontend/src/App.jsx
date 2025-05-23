import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { Home as HomeIcon } from "lucide-react"

import NavBar from "./Components/NavBar.jsx"
// import Bar from "./Components/bar.jsx"
import SideBar from "./Components/SideBar.jsx"

import Home from "./Pages/Home.jsx"
import Courses from "./Pages/Courses.jsx"
// import EnrollCourse from "./Pages/EnrollCourse.jsx"
import About from "./Pages/About.jsx"

import Login from "./Components/Auth/Login.jsx"
import Signup from "./Components/Auth/Signup.jsx"


export default function App() {
    return (
        <div className="h-screen bg-gray-100">
            <BrowserRouter>
                <Routes>
                    {/* Auth routes without SideBar and NavBar*/}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Main routes with NavBar and SideBar */}
                    <Route path="/" element={<div className="flex h-full">
                        <SideBar />
                        <div className="flex flex-col flex-1">
                            <NavBar />
                            {/* <Bar/> */}
                            <main className="flex-1 overflow-y-auto p-4">
                                <Home />
                            </main>
                        </div>
                    </div>} />

                    <Route path="/about" element={<div className="flex h-full">
                        <SideBar />
                        <div className="flex flex-col flex-1">
                            <NavBar />
                            {/* <Bar/> */}
                            <main className="flex-1 overflow-y-auto p-4">
                                <About />
                            </main>
                        </div>
                    </div>} />

                    <Route path="/courses" element={<div className="flex h-full">
                        <SideBar />
                        <div className="flex flex-col flex-1">
                            <NavBar />
                            {/* <Bar/> */}
                            <main className="flex-1 overflow-y-auto p-4">
                                <Courses />
                            </main>
                        </div>
                    </div>} />
                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}
