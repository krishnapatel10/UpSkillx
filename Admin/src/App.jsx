import React from 'react'
import Home from './pages/Home'
import NavBar from './Components/NavBar.jsx'
import Users from './pages/users.jsx'
import Courses from "./pages/Courses.jsx"
import Settings from './pages/Settings.jsx'
import Login from './Components/Auth/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                
                <Routes>
                     <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <main className="flex-1 overflow-y-auto p-4">
                                    <Home />
                                </main>
                            </div>
                        </div>
                    } />
                     <Route path="/Courses" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <main className="flex-1 overflow-y-auto p-4">
                                    <Courses />
                                </main>
                            </div>
                        </div>
                    } />
                    <Route path="/user" element={
                        <div className="flex flex-col h-full">
                            <NavBar />
                            <div className="flex flex-1 overflow-hidden">
                                <main className="flex-1 overflow-y-auto p-4">
                                    <Users />
                                </main>
                            </div>
                        </div>
                    } />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
