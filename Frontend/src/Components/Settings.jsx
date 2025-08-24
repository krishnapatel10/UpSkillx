import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()
  
  // User and settings states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)
  
  // Settings categories
  const [activeTab, setActiveTab] = useState('account')
  
  // Individual settings states
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  })
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    colorBlindMode: false
  })
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showEnrolledCourses: true,
    showProfileToPublic: true
  })
  
  const [learningSettings, setLearningSettings] = useState({
    autoplayVideos: true,
    showSubtitles: true,
    downloadMaterials: true,
    languagePreference: 'english'
  })
  
  // Save button states
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSetSaveError] = useState(null)

  // Fetch user data and settings on component mount
  useEffect(() => {
    const fetchUserSettings = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('You must be logged in to view settings')
        setLoading(false)
        return
      }
      
      try {
        // Decode JWT to get user ID
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        setUserId(tokenData.id)
        
        // Simulate loading delay for demo
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching settings:', err)
        setError('Failed to load settings. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchUserSettings()
  }, [])

  // Handle input changes for account settings
  const handleAccountSettingsChange = (e) => {
    const { name, checked, type, value } = e.target
    setAccountSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Handle input changes for appearance settings
  const handleAppearanceSettingsChange = (e) => {
    const { name, checked, type, value } = e.target
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Handle input changes for privacy settings
  const handlePrivacySettingsChange = (e) => {
    const { name, checked } = e.target
    setPrivacySettings(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  // Handle input changes for learning settings
  const handleLearningSettingsChange = (e) => {
    const { name, checked, type, value } = e.target
    setLearningSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Save all settings
  const saveSettings = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    setSetSaveError(null)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token || !userId) {
        throw new Error('Authentication required')
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setSaveSuccess(true)
      setIsSaving(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Error saving settings:', err)
      setSetSaveError('Failed to save settings. Please try again.')
      setIsSaving(false)
    }
  }

  // Loading state with modern spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-blue-400 absolute top-2 left-2"></div>
          </div>
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 animate-pulse">Loading your settings</h3>
            <p className="text-gray-600 animate-pulse">Just a moment while we prepare everything...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state with glassmorphism effect
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100">
        <div className="text-center bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 max-w-md transform hover:scale-105 transition-all duration-300">
          <div className="text-6xl mb-6 animate-bounce">⚠️</div>
          <h3 className="text-xl font-bold text-red-600 mb-4">{error}</h3>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'privacy', name: 'Privacy', icon: '🔒' },
    { id: 'learning', name: 'Learning', icon: '📚' }
  ]

  const AnimatedToggle = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 group">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{label}</h4>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 transform hover:scale-110 ${
          enabled 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-200' 
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
            enabled ? 'translate-x-6 shadow-blue-200' : 'translate-x-1'
          }`}
        >
          <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            enabled ? 'bg-blue-50' : 'bg-gray-50'
          }`} />
        </span>
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Customize your learning experience and manage your preferences
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Success/Error Messages with Animations */}
        {saveSuccess && (
          <div className="mb-8 transform animate-slide-down">
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-xl shadow-lg border border-green-300 backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-2xl mr-3 animate-bounce">✅</span>
                <p className="font-semibold">Your settings have been saved successfully!</p>
              </div>
            </div>
          </div>
        )}
        
        {saveError && (
          <div className="mb-8 transform animate-slide-down">
            <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-4 rounded-xl shadow-lg border border-red-300 backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-2xl mr-3 animate-pulse">❌</span>
                <p className="font-semibold">{saveError}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="lg:flex">
            {/* Modern Navigation Sidebar */}
            <div className="lg:w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Categories</h2>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-4 rounded-xl flex items-center transition-all duration-300 transform hover:scale-105 group ${
                        activeTab === tab.id 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200' 
                          : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                      }`}
                    >
                      <span className={`text-2xl mr-4 transition-transform duration-300 group-hover:scale-110 ${
                        activeTab === tab.id ? 'animate-pulse' : ''
                      }`}>
                        {tab.icon}
                      </span>
                      <span className="font-semibold">{tab.name}</span>
                      {activeTab === tab.id && (
                        <span className="ml-auto">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-8">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div className="animate-fade-in space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Account Settings</h2>
                    <p className="text-gray-600">Manage your notifications and security preferences</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Notifications Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">🔔</span>
                        <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
                      </div>
                      
                      <div className="space-y-1">
                        <AnimatedToggle
                          enabled={accountSettings.emailNotifications}
                          onChange={(checked) => setAccountSettings(prev => ({...prev, emailNotifications: checked}))}
                          label="Email Notifications"
                          description="Receive updates, course announcements, and messages via email"
                        />
                        
                        <AnimatedToggle
                          enabled={accountSettings.smsNotifications}
                          onChange={(checked) => setAccountSettings(prev => ({...prev, smsNotifications: checked}))}
                          label="SMS Notifications"
                          description="Receive important notifications and reminders via SMS"
                        />
                      </div>
                    </div>

                    {/* Security Card */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">🛡️</span>
                        <h3 className="text-xl font-bold text-gray-800">Security</h3>
                      </div>
                      
                      <AnimatedToggle
                        enabled={accountSettings.twoFactorAuth}
                        onChange={(checked) => setAccountSettings(prev => ({...prev, twoFactorAuth: checked}))}
                        label="Two-Factor Authentication"
                        description="Add an extra layer of security to your account"
                      />
                    </div>

                    {/* Connected Accounts Card */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">🔗</span>
                        <h3 className="text-xl font-bold text-gray-800">Connected Accounts</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { name: 'Facebook', color: 'blue', icon: '📘' },
                          { name: 'Twitter', color: 'sky', icon: '🐦' },
                          { name: 'Google', color: 'red', icon: '🔴' }
                        ].map((platform) => (
                          <div key={platform.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{platform.icon}</span>
                              <div>
                                <h4 className="font-semibold text-gray-800">{platform.name}</h4>
                                <p className="text-sm text-gray-500">Not connected</p>
                              </div>
                            </div>
                            <button className={`px-4 py-2 bg-gradient-to-r from-${platform.color}-500 to-${platform.color}-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold`}>
                              Connect
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="animate-fade-in space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Appearance Settings</h2>
                    <p className="text-gray-600">Customize the look and feel of your interface</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Theme Selection */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">🌓</span>
                        <h3 className="text-xl font-bold text-gray-800">Theme Preferences</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                          { value: 'light', label: 'Light', preview: 'bg-white', icon: '☀️' },
                          { value: 'dark', label: 'Dark', preview: 'bg-gray-800', icon: '🌙' },
                          { value: 'system', label: 'System', preview: 'bg-gradient-to-r from-white to-gray-800', icon: '💻' }
                        ].map((theme) => (
                          <label key={theme.value} className={`relative cursor-pointer group`}>
                            <input
                              type="radio"
                              name="theme"
                              value={theme.value}
                              checked={appearanceSettings.theme === theme.value}
                              onChange={handleAppearanceSettingsChange}
                              className="sr-only"
                            />
                            <div className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              appearanceSettings.theme === theme.value 
                                ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}>
                              <div className="text-center">
                                <div className={`h-16 w-full ${theme.preview} rounded-lg mb-3 border border-gray-200 shadow-sm`}></div>
                                <div className="flex items-center justify-center space-x-2">
                                  <span className="text-lg">{theme.icon}</span>
                                  <span className="font-semibold text-gray-800">{theme.label}</span>
                                </div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">🔤 Font Size</label>
                        <select
                          name="fontSize"
                          value={appearanceSettings.fontSize}
                          onChange={handleAppearanceSettingsChange}
                          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Accessibility */}
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">♿</span>
                        <h3 className="text-xl font-bold text-gray-800">Accessibility</h3>
                      </div>
                      
                      <AnimatedToggle
                        enabled={appearanceSettings.colorBlindMode}
                        onChange={(checked) => setAppearanceSettings(prev => ({...prev, colorBlindMode: checked}))}
                        label="Color Blind Mode"
                        description="Adjust colors for better visibility and accessibility"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="animate-fade-in space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Privacy Settings</h2>
                    <p className="text-gray-600">Control your profile visibility and data usage</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">👀</span>
                        <h3 className="text-xl font-bold text-gray-800">Profile Visibility</h3>
                      </div>
                      
                      <div className="space-y-1">
                        <AnimatedToggle
                          enabled={privacySettings.showOnlineStatus}
                          onChange={(checked) => setPrivacySettings(prev => ({...prev, showOnlineStatus: checked}))}
                          label="Show Online Status"
                          description="Let others know when you're active on the platform"
                        />
                        
                        <AnimatedToggle
                          enabled={privacySettings.showEnrolledCourses}
                          onChange={(checked) => setPrivacySettings(prev => ({...prev, showEnrolledCourses: checked}))}
                          label="Show Enrolled Courses"
                          description="Display your enrolled courses on your public profile"
                        />
                        
                        <AnimatedToggle
                          enabled={privacySettings.showProfileToPublic}
                          onChange={(checked) => setPrivacySettings(prev => ({...prev, showProfileToPublic: checked}))}
                          label="Show Profile to Public"
                          description="Make your profile visible to non-registered users"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">📊</span>
                        <h3 className="text-xl font-bold text-gray-800">Data Usage</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        We collect data to improve your learning experience. Manage how your data is used below.
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold">
                          🍪 Manage Cookies
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold">
                          📥 Download Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Learning Settings */}
              {activeTab === 'learning' && (
                <div className="animate-fade-in space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Settings</h2>
                    <p className="text-gray-600">Optimize your learning experience and preferences</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">🎥</span>
                        <h3 className="text-xl font-bold text-gray-800">Video Preferences</h3>
                      </div>
                      
                      <div className="space-y-1">
                        <AnimatedToggle
                          enabled={learningSettings.autoplayVideos}
                          onChange={(checked) => setLearningSettings(prev => ({...prev, autoplayVideos: checked}))}
                          label="Autoplay Videos"
                          description="Automatically play the next video in a series"
                        />
                        
                        <AnimatedToggle
                          enabled={learningSettings.showSubtitles}
                          onChange={(checked) => setLearningSettings(prev => ({...prev, showSubtitles: checked}))}
                          label="Show Subtitles"
                          description="Display subtitles on videos when available"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-6">
                        <span className="text-3xl mr-3">📚</span>
                        <h3 className="text-xl font-bold text-gray-800">Content Preferences</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <AnimatedToggle
                          enabled={learningSettings.downloadMaterials}
                          onChange={(checked) => setLearningSettings(prev => ({...prev, downloadMaterials: checked}))}
                          label="Download Materials"
                          description="Automatically download course materials when available"
                        />
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">🌍 Language Preference</label>
                          <select
                            name="languagePreference"
                            value={learningSettings.languagePreference}
                            onChange={handleLearningSettingsChange}
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <option value="english">🇺🇸 English</option>
                            <option value="spanish">🇪🇸 Spanish</option>
                            <option value="french">🇫🇷 French</option>
                            <option value="german">🇩🇪 German</option>
                            <option value="chinese">🇨🇳 Chinese</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Animated Save Button */}
              <div className="mt-12 flex justify-center">
                <button
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Saving Settings...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">💾</span>
                        Save All Settings
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>)}