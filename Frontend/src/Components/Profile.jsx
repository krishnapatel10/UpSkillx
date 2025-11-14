import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, KeyRound, ImagePlus, Trash2, Edit3 } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()
  
    const API = import.meta.env.VITE_API_URL;   // ✅ IMPORTANT
  // User data state
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: ''
  })
  
  // Preview image state
  const [imagePreview, setImagePreview] = useState(null)
  
  // Action states
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('You must be logged in to view this page')
        setLoading(false)
        return
      }
      
      try {
        // Decode JWT to get user ID
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        const userId = tokenData.id
        
        const response = await axios.get(`${API}/api/users/${userId}`, {
          headers: {
            'Authorization': token
          }
        })
        
        // If your API returns an array, adjust accordingly; here we assume an object
        const user = Array.isArray(response.data) ? response.data[0] : response.data
        
        setUserData(user)
        
        // Initialize form data
        setFormData({
          name: user.name || '',
          email: user.email || '',
          age: user.age || '',
          newPassword: '',
          confirmPassword: '',
          profilePicture: user.profilePicture || ''
        })
        
        setImagePreview(user.profilePicture || '')
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to load profile data. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({ ...prev, profilePicture: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission for profile update
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    setUpdateError(null)
    
    // Validate password match/length
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setUpdateError('Passwords do not match')
        setUpdateLoading(false)
        return
      }
      if (formData.newPassword.length < 6) {
        setUpdateError('Password must be at least 6 characters')
        setUpdateLoading(false)
        return
      }
    }
    
    try {
      const token = localStorage.getItem('token')
      const updateData = {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        profilePicture: formData.profilePicture
      }
      if (formData.newPassword) updateData.password = formData.newPassword
      
      const res = await axios.put(
        `${API}/api/users/${userData._id}`,
        updateData,
        { headers: { 'Authorization': token } }
      )
      
      setUserData(res.data)
      setUpdateSuccess(true)
      setIsEditing(false)
      setUpdateLoading(false)
      
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (err) {
      console.error('Error updating profile:', err)
      setUpdateError(err.response?.data?.message || 'Failed to update profile. Please try again.')
      setUpdateLoading(false)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setDeleteLoading(true)
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${API}/api/users/${userData._id}`, {
        headers: { 'Authorization': token }
      })
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      console.error('Error deleting account:', err)
      setDeleteLoading(false)
      setDeleteModalOpen(false)
      setUpdateError('Failed to delete account. Please try again later.')
    }
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      age: userData.age || '',
      newPassword: '',
      confirmPassword: '',
      profilePicture: userData.profilePicture || ''
    })
    setImagePreview(userData.profilePicture || '')
    setIsEditing(false)
    setUpdateError(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-lg text-blue-700 font-medium">Loading your profile...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md border border-red-200">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-medium mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 px-6 rounded-full shadow-md transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-6">
            <h1 className="text-3xl font-bold text-white">👤 My Profile</h1>
          </div>

          {updateSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-800 px-6 py-4">
              ✅ Profile updated successfully!
            </div>
          )}
          {updateError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-800 px-6 py-4">
              ❌ {updateError}
            </div>
          )}

          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={imagePreview || 'https://via.placeholder.com/128?text=No+Image'}
                      alt="Profile"
                      className="rounded-full w-full h-full object-cover border-4 border-indigo-300 shadow"
                      onError={e => { e.target.src = 'https://via.placeholder.com/128?text=No+Image' }}
                    />
                    {isEditing && (
                      <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg">
                        <input
                          type="file"
                          id="profilePicture"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <ImagePlus size={16} />
                      </label>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">{userData.name}</h2>
                  <p className="text-sm text-gray-500">{userData.role || 'Student'}</p>
                  {!isEditing && (
                    <div className="mt-4 space-y-2 w-full">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-full shadow-md flex items-center justify-center gap-2"
                      >
                        <Edit3 size={16} /> Edit Profile
                      </button>
                      <button
                        onClick={() => setDeleteModalOpen(true)}
                        className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-300 py-2 rounded-full flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} /> Delete Account
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Fields */}
                <div className="md:col-span-2 space-y-4">
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', icon: <User size={16} /> },
                    { label: 'Email', name: 'email', type: 'email', icon: <Mail size={16} /> },
                    { label: 'Age', name: 'age', type: 'number', icon: <Calendar size={16} /> }
                  ].map(({ label, name, type, icon }) => (
                    <div key={name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                      <div className="flex items-center bg-gray-50 border rounded-lg px-3">
                        {icon}
                        <input
                          name={name}
                          type={type}
                          value={formData[name]}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-2 py-2 bg-transparent focus:outline-none ${!isEditing ? 'text-gray-500' : ''}`}
                        />
                      </div>
                    </div>
                  ))}

                  {isEditing && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                        <div className="flex items-center bg-gray-50 border rounded-lg px-3">
                          <KeyRound size={16} />
                          <input
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-2 py-2 bg-transparent focus:outline-none"
                            placeholder="Leave blank to keep current"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                        <div className="flex items-center bg-gray-50 border rounded-lg px-3">
                          <KeyRound size={16} />
                          <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-2 py-2 bg-transparent focus:outline-none"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          className={`flex-1 py-2 rounded-full text-white shadow-md ${updateLoading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'}`}
                          disabled={updateLoading}
                        >
                          {updateLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="flex-1 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>

            {!isEditing && (
              <div className="mt-10 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl text-center shadow-sm">
                    <p className="text-sm text-blue-500">Member Since</p>
                    <p className="font-medium text-blue-800">
                      {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center shadow-sm">
                    <p className="text-sm text-purple-500">Last Login</p>
                    <p className="font-medium text-purple-800">Today</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl text-center shadow-sm">
                    <p className="text-sm text-pink-500">Role</p>
                    <p className="font-medium text-pink-800">{userData.role || 'Student'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">Delete Account</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className={`flex-1 py-2 rounded-full text-white ${deleteLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'} shadow-md`}
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
