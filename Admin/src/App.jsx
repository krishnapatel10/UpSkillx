import React from 'react'
import Home from './pages/Home'
import NavBar from './Components/NavBar.jsx'
import Users from './pages/users.jsx'
import Courses from "./pages/Courses.jsx"
import Settings from './pages/Settings.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Courses" element={<Courses />} />
                    <Route path="/user" element={<Users />} />
                    <Route path="/Settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
