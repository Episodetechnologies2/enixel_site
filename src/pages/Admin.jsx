import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/enixal_favicon.png'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, Edit2, LogOut, Upload, Image, 
  Grid, FileText, Check, AlertCircle, RefreshCw, X,
  Home, User, Settings, FolderPlus, KeyRound, ShieldCheck,
  Eye, EyeOff, ChevronDown
} from 'lucide-react'

export default function Admin() {
  const navigate = useNavigate()
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // CMS active tab - derived from route pathname
  const location = useLocation()
  let activeTab = 'dashboard'
  if (location.pathname.startsWith('/admin/work')) {
    activeTab = 'work'
  } else if (location.pathname.startsWith('/admin/profile')) {
    activeTab = 'profile'
  } else if (location.pathname.startsWith('/admin/settings')) {
    activeTab = 'settings'
  } else if (location.pathname.startsWith('/admin/dashboard')) {
    activeTab = 'dashboard'
  }

  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filterCategory, setFilterCategory] = useState('All')
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  // Categories management state
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isSavingCategory, setIsSavingCategory] = useState(false)

  // Projects form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [isSavingProject, setIsSavingProject] = useState(false)

  // Password Settings state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passError, setPassError] = useState('')
  const [passSuccess, setPassSuccess] = useState('')

  // Profile settings state
  const [profileName, setProfileName] = useState('Askjey')
  const [profileUsername, setProfileUsername] = useState('Enixel')
  const [profileRole, setProfileRole] = useState('Administrator / Content Director & Developer')
  const [profileBio, setProfileBio] = useState('Supervising digital campaigns, web experiences, brand identities, and SEO growth structures for client projects. You have full edit/write privileges to modify the dynamic grid data of the Work page, including stats and interleaved case photos.')
  const [profileAvatar, setProfileAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80')

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [editName, setEditName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editRole, setEditRole] = useState('')
  const [editBio, setEditBio] = useState('')
  const [profileFile, setProfileFile] = useState(null)
  const [profilePreview, setProfilePreview] = useState('')

  // Project Form Fields
  const [formStatus, setFormStatus] = useState('published')
  const [formTitle, setFormTitle] = useState('')
  const [formTagline, setFormTagline] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formSelectedCats, setFormSelectedCats] = useState([])
  const [formStat, setFormStat] = useState('')
  const [formStatLabel, setFormStatLabel] = useState('')
  const [formStatDetail, setFormStatDetail] = useState('')
  const [formClient, setFormClient] = useState('')
  const [formServices, setFormServices] = useState('')
  const [formChallenge, setFormChallenge] = useState('')
  const [formStrategy, setFormStrategy] = useState('')
  const [formResults, setFormResults] = useState('')
  const [formTestimonialText, setFormTestimonialText] = useState('')
  const [formTestimonialAuthor, setFormTestimonialAuthor] = useState('')
  const [formTestimonialRole, setFormTestimonialRole] = useState('')

  // Files & Previews
  const [fileMain, setFileMain] = useState(null)
  const [fileChallenge, setFileChallenge] = useState(null)
  const [fileStrategy, setFileStrategy] = useState(null)
  const [fileResults, setFileResults] = useState(null)

  const [previewMain, setPreviewMain] = useState('')
  const [previewChallenge, setPreviewChallenge] = useState('')
  const [previewStrategy, setPreviewStrategy] = useState('')
  const [previewResults, setPreviewResults] = useState('')

  // Check login on load and handle redirect
  useEffect(() => {
    const token = localStorage.getItem('enixel_admin_token')
    if (token === 'enixel-cms-session-token-2026') {
      setIsLoggedIn(true)
      if (location.pathname === '/admin' || location.pathname === '/admin/') {
        navigate('/admin/dashboard')
      }
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/admin' || location.pathname === '/admin/')) {
      navigate('/admin/dashboard')
    }
  }, [isLoggedIn, location.pathname, navigate])

  // Load dashboard data if logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadCMSData()
    }
  }, [isLoggedIn])

  const loadCMSData = async () => {
    setIsLoading(true)
    try {
      const [projRes, catRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/categories')
      ])
      if (!projRes.ok || !catRes.ok) throw new Error('Failed to load dashboard data')
      const projData = await projRes.json()
      const catData = await catRes.json()
      setProjects(projData)
      setCategories(catData)

      // Fetch Profile Data
      try {
        const profRes = await fetch('/api/profile')
        if (profRes.ok) {
          const profData = await profRes.json()
          setProfileName(profData.name || 'Askjey')
          setProfileUsername(profData.username || 'Enixel')
          setProfileRole(profData.role || 'Administrator / Content Director & Developer')
          setProfileBio(profData.bio || '')
          setProfileAvatar(profData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80')
        }
      } catch (profErr) {
        console.warn("Could not sync profile details:", profErr)
      }
    } catch (err) {
      showToast('error', 'Could not sync dashboard data with server. Make sure server is running.')
    } finally {
      setIsLoading(false)
    }
  }

  const showToast = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => {
      setMessage({ type: '', text: '' })
    }, 4000)
  }

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    setIsAuthenticating(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok && data.success) {
        localStorage.setItem('enixel_admin_token', data.token)
        setIsLoggedIn(true)
        showToast('success', 'Logged in successfully!')
        navigate('/admin/dashboard')
      } else {
        setAuthError(data.message || 'Invalid username or password')
      }
    } catch (err) {
      setAuthError('Connection to server failed. Is the CMS server running?')
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('enixel_admin_token')
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    navigate('/admin')
  }

  // Change Password Settings
  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPassError('')
    setPassSuccess('')

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match')
      return
    }
    if (newPassword.length < 4) {
      setPassError('Password must be at least 4 characters long')
      return
    }

    setIsUpdatingPassword(true)
    try {
      const response = await fetch('/api/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setPassSuccess('Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        showToast('success', 'Credentials updated successfully!')
      } else {
        setPassError(data.error || 'Failed to update password')
      }
    } catch (err) {
      setPassError('Network error. Could not change password.')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Categories Management
  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return
    setIsSavingCategory(true)
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() })
      })
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories)
        setNewCategoryName('')
        showToast('success', 'Category added successfully!')
      } else {
        showToast('error', data.error || 'Failed to add category')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not add category.')
    } finally {
      setIsSavingCategory(false)
    }
  }

  const handleDeleteCategory = async (catName) => {
    if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) return
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName })
      })
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories)
        showToast('success', 'Category deleted successfully!')
      } else {
        showToast('error', data.error || 'Failed to delete category')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not delete category.')
    }
  }

  // Form helpers
  const handleCategoryCheckboxChange = (cat) => {
    if (formSelectedCats.includes(cat)) {
      setFormSelectedCats(formSelectedCats.filter(c => c !== cat))
    } else {
      setFormSelectedCats([...formSelectedCats, cat])
    }
  }

  const handleFileChange = (e, fileSetter, previewSetter) => {
    const file = e.target.files[0]
    if (file) {
      fileSetter(file)
      previewSetter(URL.createObjectURL(file))
    }
  }

  const openAddForm = () => {
    setEditingProjectId(null)
    setFormTitle('')
    setFormTagline('')
    setFormDescription('')
    setFormSelectedCats([])
    setFormStat('')
    setFormStatLabel('')
    setFormStatDetail('')
    setFormClient('')
    setFormServices('')
    setFormChallenge('')
    setFormStrategy('')
    setFormResults('')
    setFormTestimonialText('')
    setFormTestimonialAuthor('')
    setFormTestimonialRole('')
    
    setFileMain(null)
    setFileChallenge(null)
    setFileStrategy(null)
    setFileResults(null)
    
    setPreviewMain('')
    setPreviewChallenge('')
    setPreviewStrategy('')
    setFormStatus('published')
    setPreviewResults('')
    
    setIsFormOpen(true)
  }

  const openEditForm = (proj) => {
    setEditingProjectId(proj.id)
    setFormStatus(proj.status || 'published')
    setFormTitle(proj.title || '')
    setFormTagline(proj.tagline || '')
    setFormDescription(proj.description || '')
    setFormSelectedCats(proj.categories || [])
    setFormStat(proj.stat || '')
    setFormStatLabel(proj.statLabel || '')
    setFormStatDetail(proj.statDetail || '')
    setFormClient(proj.details?.client || '')
    setFormServices(proj.details?.services ? proj.details.services.join(', ') : '')
    setFormChallenge(proj.details?.challenge || '')
    setFormStrategy(proj.details?.strategy || '')
    setFormResults(proj.details?.results || '')
    setFormTestimonialText(proj.details?.testimonial?.text || '')
    setFormTestimonialAuthor(proj.details?.testimonial?.author || '')
    setFormTestimonialRole(proj.details?.testimonial?.role || '')

    setFileMain(null)
    setFileChallenge(null)
    setFileStrategy(null)
    setFileResults(null)

    setPreviewMain(proj.image || '')
    setPreviewChallenge(proj.details?.challengeImage || '')
    setPreviewStrategy(proj.details?.strategyImage || '')
    setPreviewResults(proj.details?.resultsImage || '')

    setIsFormOpen(true)
  }

  // Handle Project Form Submission (Create & Edit)
  const handleSaveProject = async (e) => {
    e.preventDefault()
    if (!formTitle.trim()) {
      showToast('error', 'Title is required')
      return
    }

    setIsSavingProject(true)

    try {
      const servicesArray = formServices
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '')

      const payload = {
        title: formTitle.trim(),
        status: formStatus,
        tagline: formTagline.trim(),
        description: formDescription.trim(),
        categories: formSelectedCats,
        stat: formStat.trim(),
        statLabel: formStatLabel.trim(),
        statDetail: formStatDetail.trim(),
        client: formClient.trim(),
        services: servicesArray,
        challenge: formChallenge.trim(),
        strategy: formStrategy.trim(),
        results: formResults.trim(),
        testimonialText: formTestimonialText.trim(),
        testimonialAuthor: formTestimonialAuthor.trim(),
        testimonialRole: formTestimonialRole.trim()
      }

      const formData = new FormData()
      formData.append('data', JSON.stringify(payload))
      
      if (fileMain) formData.append('image', fileMain)
      if (fileChallenge) formData.append('challengeImage', fileChallenge)
      if (fileStrategy) formData.append('strategyImage', fileStrategy)
      if (fileResults) formData.append('resultsImage', fileResults)

      const url = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects'
      const method = editingProjectId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formData
      })

      const responseData = await response.json()
      if (response.ok && responseData.success) {
        showToast('success', editingProjectId ? 'Project updated successfully!' : 'Project created successfully!')
        setIsFormOpen(false)
        navigate('/admin/work')
        loadCMSData()
      } else {
        showToast('error', responseData.error || 'Failed to save project')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not connect to CMS.')
    } finally {
      setIsSavingProject(false)
    }
  }

  // Handle Project Deletion
  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the project "${title}"?`)) return
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        showToast('success', 'Project deleted successfully!')
        loadCMSData()
      } else {
        showToast('error', 'Failed to delete project')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not delete project.')
    }
  }

  const handleToggleStatus = async (proj) => {
    const newStatus = proj.status === 'draft' ? 'published' : 'draft';
    try {
      const payload = {
        title: proj.title,
        status: newStatus,
        tagline: proj.tagline || '',
        description: proj.description || '',
        categories: proj.categories || [],
        stat: proj.stat || '',
        statLabel: proj.statLabel || '',
        statDetail: proj.statDetail || '',
        client: proj.details?.client || '',
        services: proj.details?.services || [],
        challenge: proj.details?.challenge || '',
        strategy: proj.details?.strategy || '',
        results: proj.details?.results || '',
        testimonialText: proj.details?.testimonial?.text || '',
        testimonialAuthor: proj.details?.testimonial?.author || '',
        testimonialRole: proj.details?.testimonial?.role || ''
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payload));

      const response = await fetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        showToast('success', `Project status set to ${newStatus}`);
        loadCMSData();
      } else {
        showToast('error', 'Failed to update project status');
      }
    } catch (err) {
      showToast('error', 'Network error. Could not toggle status.');
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setIsSavingProfile(true)
    try {
      const payload = {
        name: editName.trim(),
        username: editUsername.trim(),
        role: editRole.trim(),
        bio: editBio.trim()
      }

      const formData = new FormData()
      formData.append('data', JSON.stringify(payload))

      if (profileFile) {
        formData.append('avatar', profileFile)
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        body: formData
      })

      const responseData = await response.json()
      if (response.ok && responseData.success) {
        showToast('success', 'Profile updated successfully!')
        setIsEditingProfile(false)
        setProfileName(responseData.profile.name)
        setProfileUsername(responseData.profile.username)
        setProfileRole(responseData.profile.role)
        setProfileBio(responseData.profile.bio)
        setProfileAvatar(responseData.profile.avatar)
      } else {
        showToast('error', responseData.error || 'Failed to update profile')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not update profile.')
    } finally {
      setIsSavingProfile(false)
    }
  }

  // RENDER: LOGIN SCREEN (when not logged in)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#ffe7d6] via-[#ffa17c] to-[#ff5d57] px-6 py-12 relative">
        
        {/* Float Home Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white text-navy font-bold text-xs px-5 py-3 rounded-full hover:bg-neutral-50 transition-colors shadow-premium cursor-pointer border border-neutral-200/50"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Site</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[450px] bg-white/95 backdrop-blur-xl border border-white/40 p-8 sm:p-10 rounded-custom-lg shadow-premium"
        >
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange mb-1.5 block">Administration Portal</span>
            <h1 className="text-3xl font-extrabold text-navy tracking-tight">CMS Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Username</label>
              <input
                type="text"
                placeholder="e.g. Enixel"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-100 text-navy rounded-2xl py-3.5 px-5 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-100 text-navy rounded-2xl py-3.5 pl-5 pr-12 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-brand-red text-xs bg-brand-red/10 border border-brand-red/20 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-navy hover:bg-neutral-800 text-white font-bold py-4 rounded-full text-[15px] cursor-pointer transition-all duration-300 flex items-center justify-center shadow-premium"
            >
              {isAuthenticating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // RENDER: FULL SCREEN DASHBOARD PORTAL (when logged in)
  return (
    <div className="h-screen w-full flex overflow-hidden bg-neutral-100 font-sans text-navy">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-[280px] bg-navy text-white flex flex-col justify-between border-r border-neutral-800 flex-shrink-0 h-full">
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-transparent flex-shrink-0">
              <img
                src={logo}
                alt="Enixel Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-md font-bold tracking-tight text-white leading-none">Enixel Digital Studio</h2>
              <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mt-1">Admin Portal</span>
            </div>
          </div>

          {/* Sidebar Menu Options */}
          <nav className="p-4 space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-widest px-3 mb-2.5 block">Menu</span>
            
            {/* Dashboard tab */}
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`w-full text-left inline-flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-brand-orange text-navy shadow-badge-orange'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4.5 h-4.5" />
              <span>Dashboard</span>
            </button>

            {/* Projects tab */}
            <button
              onClick={() => navigate('/admin/work')}
              className={`w-full text-left inline-flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'work'
                  ? 'bg-brand-orange text-navy shadow-badge-orange'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Grid className="w-4.5 h-4.5" />
              <span>Work Updates</span>
            </button>

            {/* Profile tab */}
            <button
              onClick={() => navigate('/admin/profile')}
              className={`w-full text-left inline-flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-brand-orange text-navy shadow-badge-orange'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4.5 h-4.5" />
              <span>Profile</span>
            </button>

            {/* Settings tab */}
            <button
              onClick={() => navigate('/admin/settings')}
              className={`w-full text-left inline-flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-brand-orange text-navy shadow-badge-orange'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4.5 h-4.5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full text-center inline-flex items-center justify-center gap-2 border border-neutral-800 hover:bg-white/5 text-neutral-300 text-xs font-bold py-3 rounded-xl cursor-pointer transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Visit Live Site</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full text-center inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-600 text-white text-xs font-bold py-3 rounded-xl cursor-pointer transition-all shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* 2. RIGHT VIEW PORT AREA */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-[70px] bg-white border-b border-neutral-200/80 flex items-center justify-between px-8 flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-navy capitalize tracking-tight flex items-center gap-2">
              <span>{activeTab === 'work' ? 'work updates' : activeTab}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Sync button */}
            <button
              onClick={loadCMSData}
              className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-navy cursor-pointer transition-all border border-neutral-200/50"
              title="Sync Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-6 w-px bg-neutral-200"></div>
            <div className="relative">
              {/* Profile dropdown trigger pill matching screenshot */}
              <button
                type="button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 bg-[#0f1115] border border-neutral-800/80 pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer hover:bg-neutral-800 transition-all duration-300 shadow-sm"
              >
                {/* Profile photo of Askjey */}
                <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-orange/40 bg-neutral-900 flex-shrink-0">
                  <img
                    src={profileAvatar}
                    alt="Askjey Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-extrabold text-white tracking-tight">{profileName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* Profile Dropdown Options Card */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    {/* Invisible clickout layer */}
                    <div 
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="fixed inset-0 z-10"
                    ></div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-48 bg-white border border-neutral-200 rounded-xl shadow-premium py-2 z-20 text-left"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          navigate('/admin/profile')
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-neutral-600 hover:text-navy hover:bg-neutral-50 transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          navigate('/admin/settings')
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-neutral-600 hover:text-navy hover:bg-neutral-50 transition-colors"
                      >
                        Account Settings
                      </button>
                      <div className="h-px bg-neutral-100 my-1"></div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          handleLogout()
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-brand-red hover:bg-brand-red/5 transition-colors"
                      >
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Tab Content Panel (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            
            {/* T1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-navy to-neutral-900 text-white rounded-custom-md p-8 relative overflow-hidden border border-neutral-800 shadow-premium">
                  <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-brand-orange/10 blur-3xl"></div>
                  <div className="relative z-10 space-y-2">
                    <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest block">Dashboard Overview</span>
                    <h2 className="text-3xl text-white font-extrabold tracking-tight">Welcome back, Enixel Admin!</h2>
                    <p className="text-neutral-400 text-sm max-w-[600px] leading-relaxed">
                      You are in complete control of the Enixel work database. Easily add new digital growth case studies, manage filters, or update server security configuration.
                    </p>
                  </div>
                </div>

                {/* Counter widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Projects count */}
                  <div className="bg-white p-6 rounded-custom-md border border-neutral-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Work updates</span>
                      <h3 className="text-4xl font-extrabold text-navy leading-none">{projects.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#ffe7d6] rounded-2xl flex items-center justify-center text-brand-orange">
                      <Grid className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Categories count */}
                  <div className="bg-white p-6 rounded-custom-md border border-neutral-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Work Categories</span>
                      <h3 className="text-4xl font-extrabold text-navy leading-none">{categories.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#ffe7d6] rounded-2xl flex items-center justify-center text-brand-orange">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>

                  {/* System health */}
                  <div className="bg-white p-6 rounded-custom-md border border-neutral-200/60 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">CMS Status</span>
                      <h3 className="text-sm font-bold text-sys-green flex items-center gap-1.5 mt-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sys-green inline-block animate-pulse"></span>
                        <span>Connected & Secure</span>
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-[#ffe7d6] rounded-2xl flex items-center justify-center text-brand-orange">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Quick actions panel */}
                <div className="bg-white p-6 rounded-custom-md border border-neutral-200/60 shadow-sm space-y-4">
                  <h3 className="font-bold text-navy text-base">Quick Shortcuts</h3>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        navigate('/admin/work');
                        setTimeout(() => openAddForm(), 100);
                      }}
                      className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-sm"
                    >
                      <FolderPlus className="w-4 h-4" />
                      <span>Add Work updates</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/work');
                        setTimeout(() => setIsCategoriesModalOpen(true), 100);
                      }}
                      className="inline-flex items-center gap-2 border border-neutral-300 hover:border-navy bg-white hover:bg-neutral-50 text-neutral-700 hover:text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Category</span>
                    </button>
                    <button
                      onClick={() => navigate('/admin/settings')}
                      className="inline-flex items-center gap-2 border border-neutral-300 hover:border-navy bg-white hover:bg-neutral-50 text-neutral-700 hover:text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-sm"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Security & Password Settings</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* T2. PROJECTS TAB */}
            {activeTab === 'work' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-neutral-200/80 pb-5">
                  <div>
                    <h2 className="text-xl font-bold text-navy tracking-tight">Work Management ({projects.length})</h2>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5">Work details cards, statistics, client testimonials, and section photos.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Category Filter Select Dropdown */}
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="bg-white border border-neutral-300 rounded-full px-4 py-2.5 text-xs font-bold text-navy focus:border-brand-orange outline-none shadow-sm cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    {/* Quick Categories Button - Left Side of Add Project Button */}
                    <button
                      type="button"
                      onClick={() => setIsCategoriesModalOpen(true)}
                      className="inline-flex items-center gap-2 border border-neutral-300 hover:border-navy bg-white hover:bg-neutral-50 text-neutral-700 hover:text-navy text-xs font-bold px-5 py-3 rounded-full cursor-pointer transition-colors shadow-sm flex-shrink-0"
                    >
                      <Plus className="w-4 h-4 text-brand-orange stroke-[3]" />
                      <span>Quick Categories</span>
                    </button>

                    <button
                      onClick={openAddForm}
                      className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-premium flex-shrink-0"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add Work</span>
                    </button>
                  </div>
                </div>

                {projects.length === 0 ? (
                  <div className="bg-white rounded-custom-md border border-neutral-200/60 p-12 text-center shadow-sm">
                    <Image className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                    <h3 className="font-bold text-navy mb-1">No Projects Found</h3>
                    <p className="text-neutral-500 text-xs mb-4">Click "Add Work" to populate your portfolio grid.</p>
                  </div>
                ) : projects.filter(p => filterCategory === 'All' || (p.categories && p.categories.includes(filterCategory))).length === 0 ? (
                  <div className="bg-white rounded-custom-md border border-neutral-200/60 p-12 text-center shadow-sm">
                    <Image className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                    <h3 className="font-bold text-navy mb-1">No Matching Projects</h3>
                    <p className="text-neutral-500 text-xs mb-4">No projects found matching the "{filterCategory}" category filter.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-custom-md border border-neutral-200/60 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest">
                            <th className="py-4 px-6 w-20 text-center">Cover</th>
                            <th className="py-4 px-6">Folder Name</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6 w-32 text-center">Status</th>
                            <th className="py-4 px-6 w-40 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-xs font-bold text-navy">
                          {projects
                            .filter(p => filterCategory === 'All' || (p.categories && p.categories.includes(filterCategory)))
                            .map((proj) => (
                            <tr key={proj.id} className="hover:bg-neutral-50/40 transition-colors">
                              {/* Cover */}
                              <td className="py-4 px-6">
                                <div className="w-12 h-10 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200/40 flex items-center justify-center mx-auto">
                                  {proj.image ? (
                                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <Image className="w-4 h-4 text-neutral-400" />
                                  )}
                                </div>
                              </td>

                              {/* Title */}
                              <td className="py-4 px-6 text-sm font-extrabold">
                                <span>{proj.title}</span>
                              </td>

                              {/* Category */}
                              <td className="py-4 px-6 text-neutral-500 font-medium">
                                {proj.category || 'N/A'}
                              </td>

                              {/* Status */}
                              <td className="py-4 px-6 text-center">
                                {proj.status === 'draft' ? (
                                  <span className="inline-flex items-center px-3 py-1 bg-neutral-200 text-neutral-600 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                                    Draft
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-3 py-1 bg-navy text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                                    Published
                                  </span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-3">
                                  {/* Toggle publish status */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleStatus(proj)}
                                    className="text-neutral-400 hover:text-navy p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                                    title={proj.status === 'draft' ? "Publish" : "Revert to Draft"}
                                  >
                                    {proj.status === 'draft' ? (
                                      <EyeOff className="w-4.5 h-4.5" />
                                    ) : (
                                      <Eye className="w-4.5 h-4.5" />
                                    )}
                                  </button>

                                  {/* Edit */}
                                  <button
                                    type="button"
                                    onClick={() => openEditForm(proj)}
                                    className="text-neutral-400 hover:text-brand-orange p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                                    title="Edit details"
                                  >
                                    <Edit2 className="w-4.5 h-4.5" />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                                    className="text-neutral-400 hover:text-brand-red p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                                    title="Delete case study"
                                  >
                                    <Trash2 className="w-4.5 h-4.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}



            {/* T4. PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white rounded-custom-md border border-neutral-200/60 p-8 shadow-sm max-w-[800px]"
              >
                {!isEditingProfile ? (
                  // VIEW PROFILE MODE
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-neutral-200">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-orange shadow-premium flex-shrink-0 bg-neutral-900">
                        <img
                          src={profileAvatar}
                          alt="Askjey Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                        <h2 className="text-2xl font-extrabold text-navy tracking-tight">{profileName}</h2>
                        <p className="text-sm font-semibold text-brand-orange">{profileRole}</p>
                        <p className="text-xs text-neutral-400 font-medium">Joined CMS: August 2026</p>
                      </div>
                    </div>

                    <div className="py-6 space-y-4">
                      <h3 className="text-xs uppercase font-extrabold text-brand-orange tracking-wider">Account Overview</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                          <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-0.5">Username</span>
                          <span className="font-bold text-navy text-sm">{profileUsername}</span>
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                          <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-0.5">Authorization Tier</span>
                          <span className="font-bold text-navy text-sm">CMS Super User</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-xs font-bold text-navy block">Bio & Permissions</span>
                        <p className="text-xs text-neutral-500 leading-relaxed text-justify">
                          {profileBio}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end border-t border-neutral-100">
                      <button
                        onClick={() => {
                          setEditName(profileName)
                          setEditUsername(profileUsername)
                          setEditRole(profileRole)
                          setEditBio(profileBio)
                          setProfileFile(null)
                          setProfilePreview(profileAvatar)
                          setIsEditingProfile(true)
                        }}
                        className="bg-navy hover:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-full text-xs cursor-pointer transition-colors shadow-sm"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  // EDIT PROFILE MODE
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-neutral-200">
                      {/* File Upload with Preview */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-brand-orange shadow-premium flex-shrink-0 bg-neutral-900 group">
                        <img
                          src={profilePreview || profileAvatar}
                          alt="Askjey Profile"
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-navy/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity">
                          <Upload className="w-5 h-5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                setProfileFile(file)
                                setProfilePreview(URL.createObjectURL(file))
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-navy">Edit Profile Details</h2>
                        <p className="text-xs text-neutral-400 font-semibold">Upload avatar photo and update text values.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Username</label>
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Display Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Role Description</label>
                        <input
                          type="text"
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Bio / Permissions Summary</label>
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        rows={4}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all resize-none"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-6 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:text-navy border border-neutral-200 bg-white hover:bg-neutral-50 cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingProfile}
                        className="bg-navy hover:bg-neutral-800 text-white font-bold px-8 py-2.5 rounded-full text-xs cursor-pointer transition-colors flex items-center justify-center shadow-premium"
                      >
                        {isSavingProfile ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {/* T5. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white rounded-custom-md border border-neutral-200/60 p-6 sm:p-8 shadow-sm max-w-[650px] space-y-6"
              >
                <div className="border-b border-neutral-200 pb-5">
                  <h2 className="text-xl font-bold text-navy tracking-tight mb-1">Security & Credentials Settings</h2>
                  <p className="text-xs text-neutral-500 font-medium">Update password parameters for Enixel CMS portal access.</p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-neutral-100 text-navy rounded-xl py-3 pl-4 pr-10 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy cursor-pointer focus:outline-none"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-neutral-100 text-navy rounded-xl py-3 pl-4 pr-10 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy cursor-pointer focus:outline-none"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-neutral-100 text-navy rounded-xl py-3 pl-4 pr-10 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy cursor-pointer focus:outline-none"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {passError && (
                    <div className="flex items-center gap-2 text-brand-red text-xs bg-brand-red/10 border border-brand-red/20 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{passError}</span>
                    </div>
                  )}

                  {passSuccess && (
                    <div className="flex items-center gap-2 text-sys-green text-xs bg-sys-green/10 border border-sys-green/20 rounded-xl p-3">
                      <Check className="w-4 h-4 flex-shrink-0 animate-bounce" />
                      <span>{passSuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full bg-[#090909] hover:bg-neutral-800 text-white font-bold py-4 rounded-full text-xs cursor-pointer transition-all duration-300 flex items-center justify-center shadow-sm"
                  >
                    {isUpdatingPassword ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>Save Password Settings</span>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* DYNAMIC SAVING/NOTIFICATION TOAST */}
      {message.text && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-premium border text-sm font-bold ${
              message.type === 'success'
                ? 'bg-sys-green/10 border-sys-green/20 text-sys-green'
                : 'bg-brand-red/10 border-brand-red/20 text-brand-red'
            }`}
          >
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </motion.div>
        </div>
      )}

      {/* QUICK CATEGORIES MODAL */}
      <AnimatePresence>
        {isCategoriesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoriesModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-[480px] bg-white rounded-custom-lg border border-neutral-200/50 shadow-premium z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-navy tracking-tight">Quick Categories Manager</h2>
                  <p className="text-[11px] text-neutral-400 font-semibold mt-0.5">Add or remove work category filters.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoriesModalOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-navy cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Add Category Form */}
                <form onSubmit={handleAddCategory} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New category (e.g. CRO Optimization)..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-grow bg-neutral-100 text-navy rounded-xl py-3 px-4 text-xs outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSavingCategory}
                    className="bg-navy hover:bg-neutral-800 text-white font-bold px-6 py-3 rounded-full text-xs cursor-pointer transition-all flex-shrink-0"
                  >
                    {isSavingCategory ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>Add</span>
                    )}
                  </button>
                </form>

                {/* Category List */}
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {categories.length === 0 ? (
                    <p className="text-center text-xs text-neutral-400 py-6">No categories defined yet.</p>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat}
                        className="bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-3 flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-navy">{cat}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-neutral-400 hover:text-brand-red p-1 rounded-lg hover:bg-white cursor-pointer transition-all border border-transparent hover:border-neutral-200"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-neutral-200 flex justify-end bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setIsCategoriesModalOpen(false)}
                  className="px-6 py-2.5 bg-navy hover:bg-neutral-800 text-white font-bold rounded-full text-xs cursor-pointer transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN ADD/EDIT PROJECT SLIDE-OUT OVERLAY */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isSavingProject) setIsFormOpen(false)
              }}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full h-full bg-white flex flex-col z-10"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-navy tracking-tight">
                    {editingProjectId ? 'Edit Work' : 'Create New Work'}
                  </h2>
                  <p className="text-xs text-neutral-500 font-medium">Fill in the fields to publish a dynamic case study</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSavingProject}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-navy cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-8">
                
                {/* 1. GENERAL INFORMATION */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase font-extrabold text-brand-orange tracking-wider border-b border-neutral-100 pb-2">1. General Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Zamindar Kitchen"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Tagline</label>
                      <input
                        type="text"
                        placeholder="e.g. Heritage Culinary Branding"
                        value={formTagline}
                        onChange={(e) => setFormTagline(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3.5 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all cursor-pointer font-bold"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Short Summary Description</label>
                    <textarea
                      placeholder="Enter a brief summary displayed on the card grid (max 2 lines)..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-3 block">Categories (Select all that apply)</label>
                    <div className="flex flex-wrap gap-2.5 bg-neutral-50 p-4 rounded-xl border border-neutral-200/65">
                      {categories.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => handleCategoryCheckboxChange(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            formSelectedCats.includes(cat)
                              ? 'bg-navy border-navy text-white shadow-sm'
                              : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. PERFORMANCE METRICS */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase font-extrabold text-brand-orange tracking-wider border-b border-neutral-100 pb-2">2. Performance Metrics & Client</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Highlight Stat Value</label>
                      <input
                        type="text"
                        placeholder="e.g. +45% or 2.4M"
                        value={formStat}
                        onChange={(e) => setFormStat(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Stat Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Reservations or Organic Views"
                        value={formStatLabel}
                        onChange={(e) => setFormStatLabel(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Stat Detailed Info</label>
                      <input
                        type="text"
                        placeholder="e.g. Increase in booking in 30 days"
                        value={formStatDetail}
                        onChange={(e) => setFormStatDetail(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Zamindar Kitchen F&B Group"
                        value={formClient}
                        onChange={(e) => setFormClient(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Services Provided (comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Brand Identity, Local SEO, Influencer Outreach"
                        value={formServices}
                        onChange={(e) => setFormServices(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. IMAGES & COPY SECTIONS */}
                <div className="space-y-6">
                  <h3 className="text-xs uppercase font-extrabold text-brand-orange tracking-wider border-b border-neutral-100 pb-2">3. Section Layouts & Interleaved Photos</h3>

                  <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    <div className="sm:col-span-8 space-y-1">
                      <label className="text-xs font-bold text-navy uppercase tracking-wider block">Main Hero Thumbnail Image</label>
                      <p className="text-[10px] text-neutral-500 font-medium">Displayed on the grid and top of the details page.</p>
                      <div className="pt-2">
                        <label className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 hover:border-brand-orange bg-white rounded-lg text-xs font-bold text-neutral-600 hover:text-brand-orange cursor-pointer transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setFileMain, setPreviewMain)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="sm:col-span-4 flex justify-end">
                      <div className="w-28 h-20 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300/40 flex items-center justify-center">
                        {previewMain ? (
                          <img src={previewMain} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Image className="w-6 h-6 text-neutral-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-orange"></span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Challenge Section details</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      <div className="lg:col-span-8">
                        <textarea
                          placeholder="What challenge did the client face? (Challenge section copy)..."
                          value={formChallenge}
                          onChange={(e) => setFormChallenge(e.target.value)}
                          rows={4}
                          className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all resize-none"
                        />
                      </div>
                      <div className="lg:col-span-4 space-y-3">
                        <div className="h-28 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 flex items-center justify-center relative">
                          {previewChallenge ? (
                            <img src={previewChallenge} alt="Challenge Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-3">
                              <Image className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                              <span className="text-[10px] text-neutral-400 font-medium block">No Challenge Image</span>
                            </div>
                          )}
                        </div>
                        <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-neutral-300 bg-white rounded-lg text-[11px] font-bold text-neutral-600 hover:text-brand-orange cursor-pointer transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload section Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setFileChallenge, setPreviewChallenge)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-pink"></span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Strategy Section details</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      <div className="lg:col-span-8">
                        <textarea
                          placeholder="What was the strategy implemented? (Strategy section copy)..."
                          value={formStrategy}
                          onChange={(e) => setFormStrategy(e.target.value)}
                          rows={4}
                          className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all resize-none"
                        />
                      </div>
                      <div className="lg:col-span-4 space-y-3">
                        <div className="h-28 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 flex items-center justify-center relative">
                          {previewStrategy ? (
                            <img src={previewStrategy} alt="Strategy Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-3">
                              <Image className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                              <span className="text-[10px] text-neutral-400 font-medium block">No Strategy Image</span>
                            </div>
                          )}
                        </div>
                        <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-neutral-300 bg-white rounded-lg text-[11px] font-bold text-neutral-600 hover:text-brand-orange cursor-pointer transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload section Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setFileStrategy, setPreviewStrategy)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-orange-light"></span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy">Campaign Results details</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      <div className="lg:col-span-8">
                        <textarea
                          placeholder="What were the outcomes/results achieved? (Results section copy)..."
                          value={formResults}
                          onChange={(e) => setFormResults(e.target.value)}
                          rows={4}
                          className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all resize-none"
                        />
                      </div>
                      <div className="lg:col-span-4 space-y-3">
                        <div className="h-28 bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 flex items-center justify-center relative">
                          {previewResults ? (
                            <img src={previewResults} alt="Results Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-3">
                              <Image className="w-5 h-5 text-neutral-400 mx-auto mb-1" />
                              <span className="text-[10px] text-neutral-400 font-medium block">No Results Image</span>
                            </div>
                          )}
                        </div>
                        <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 border border-neutral-300 bg-white rounded-lg text-[11px] font-bold text-neutral-600 hover:text-brand-orange cursor-pointer transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload section Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setFileResults, setPreviewResults)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 4. CLIENT TESTIMONIAL */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase font-extrabold text-brand-orange tracking-wider border-b border-neutral-100 pb-2">4. Client Testimonial</h3>
                  
                  <div>
                    <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Quote Text</label>
                    <textarea
                      placeholder="Client testimonial quotation text..."
                      value={formTestimonialText}
                      onChange={(e) => setFormTestimonialText(e.target.value)}
                      rows={3}
                      className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Author Name</label>
                      <input
                        type="text"
                        placeholder="e.g. David Wu"
                        value={formTestimonialAuthor}
                        onChange={(e) => setFormTestimonialAuthor(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-navy uppercase tracking-wider mb-2 block">Author Role / Company</label>
                      <input
                        type="text"
                        placeholder="e.g. Head of Product, Zircle"
                        value={formTestimonialRole}
                        onChange={(e) => setFormTestimonialRole(e.target.value)}
                        className="w-full bg-neutral-50 text-navy rounded-xl py-3 px-4 text-sm outline-none border border-neutral-200 focus:border-brand-orange transition-all"
                      />
                    </div>
                  </div>
                </div>

              </form>

              <div className="p-6 border-t border-neutral-200 flex justify-end gap-3 bg-neutral-50">
                <button
                  type="button"
                  disabled={isSavingProject}
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 rounded-full text-xs font-bold text-neutral-600 hover:text-navy border border-neutral-200 bg-white hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProject}
                  disabled={isSavingProject}
                  className="bg-navy hover:bg-neutral-800 text-white font-bold px-8 py-3 rounded-full text-xs cursor-pointer transition-colors flex items-center justify-center shadow-premium"
                >
                  {isSavingProject ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span>{editingProjectId ? 'Update Work' : 'Publish Work'}</span>
                  )}
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
