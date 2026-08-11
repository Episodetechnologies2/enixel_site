import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/enixal_favicon.png'
import { getApiUrl, getMediaUrl } from '../config'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, Edit2, LogOut, Upload, Image, 
  Grid, FileText, Check, AlertCircle, RefreshCw, X,
  Home, User, Settings, FolderPlus, KeyRound, ShieldCheck,
  Eye, EyeOff, ChevronDown
} from 'lucide-react'

// Import subcomponents
import AdminLogin from './admin/AdminLogin'
import DashboardTab from './admin/DashboardTab'
import WorkTab from './admin/WorkTab'
import ProfileTab from './admin/ProfileTab'
import SettingsTab from './admin/SettingsTab'
import CategoriesModal from './admin/CategoriesModal'
import ProjectFormModal from './admin/ProjectFormModal'

export default function Admin() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  // CMS active tab - derived from route pathname
  let activeTab = 'dashboard'
  const currentPath = location.pathname.toLowerCase()
  if (currentPath.startsWith('/admin/work')) {
    activeTab = 'work'
  } else if (currentPath.startsWith('/admin/profile')) {
    activeTab = 'profile'
  } else if (currentPath.startsWith('/admin/settings')) {
    activeTab = 'settings'
  } else if (currentPath.startsWith('/admin/dashboard')) {
    activeTab = 'dashboard'
  }

  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [filterCategory, setFilterCategory] = useState('All')
  
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  // Projects form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  // Profile settings state
  const [profileName, setProfileName] = useState('Askjey')
  const [profileUsername, setProfileUsername] = useState('Enixel')
  const [profileRole, setProfileRole] = useState('Administrator / Content Director & Developer')
  const [profileBio, setProfileBio] = useState('Supervising digital campaigns, web experiences, brand identities, and SEO growth structures for client projects.')
  const [profileAvatar, setProfileAvatar] = useState('data:image/jpeg;base64,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')

  // Check login on load and handle redirect
  useEffect(() => {
    const token = localStorage.getItem('enixel_admin_token')
    if (token === 'enixel-cms-session-token-2026') {
      setIsLoggedIn(true)
      const pathLower = location.pathname.toLowerCase()
      if (pathLower === '/admin' || pathLower === '/admin/') {
        navigate('/admin/dashboard')
      }
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const pathLower = location.pathname.toLowerCase()
    if (isLoggedIn && (pathLower === '/admin' || pathLower === '/admin/')) {
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
        fetch(getApiUrl('/api/projects')),
        fetch(getApiUrl('/api/categories'))
      ])
      if (!projRes.ok || !catRes.ok) throw new Error('Failed to load dashboard data')
      const projData = await projRes.json()
      const catData = await catRes.json()
      setProjects(projData)
      setCategories(catData)

      // Fetch Profile Data
      try {
        const profRes = await fetch(getApiUrl('/api/profile'))
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
  const handleLogin = async (usernameInput, passwordInput) => {
    setAuthError('')
    setIsAuthenticating(true)
    try {
      const response = await fetch(getApiUrl('/api/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
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
      setAuthError('Connection error. Could not connect to API server.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('enixel_admin_token')
    setIsLoggedIn(false)
    navigate('/admin')
  }

  // Handle Project Deletion
  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the project "${title}"?`)) return
    try {
      const response = await fetch(getApiUrl(`/api/projects/${id}`), {
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

      const response = await fetch(getApiUrl(`/api/projects/${proj.id}`), {
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

  // RENDER: LOGIN SCREEN (when not logged in)
  if (!isLoggedIn) {
    return (
      <AdminLogin 
        onLogin={handleLogin} 
        authError={authError} 
        isAuthenticating={isAuthenticating} 
      />
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
              {/* Profile dropdown trigger pill */}
              <button
                type="button"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 bg-[#0f1115] border border-neutral-800/80 pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer hover:bg-neutral-800 transition-all duration-300 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-orange/40 bg-neutral-900 flex-shrink-0">
                  <img
                    src={getMediaUrl(profileAvatar)}
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
              <DashboardTab 
                projectsCount={projects.length}
                categoriesCount={categories.length}
                onAddWorkClick={() => {
                  setEditingProject(null)
                  setIsFormOpen(true)
                }}
                onCreateCategoryClick={() => setIsCategoriesModalOpen(true)}
                onNavigate={navigate}
              />
            )}

            {/* T2. PROJECTS TAB */}
            {activeTab === 'work' && (
              <WorkTab 
                projects={projects}
                categories={categories}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                onOpenCategoriesModal={() => setIsCategoriesModalOpen(true)}
                onOpenAddForm={() => {
                  setEditingProject(null)
                  setIsFormOpen(true)
                }}
                onOpenEditForm={(proj) => {
                  setEditingProject(proj)
                  setIsFormOpen(true)
                }}
                onToggleStatus={handleToggleStatus}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {/* T4. PROFILE TAB */}
            {activeTab === 'profile' && (
              <ProfileTab 
                profile={{
                  name: profileName,
                  username: profileUsername,
                  role: profileRole,
                  bio: profileBio,
                  avatar: profileAvatar
                }}
                onProfileSaved={(updatedProf) => {
                  setProfileName(updatedProf.name)
                  setProfileUsername(updatedProf.username)
                  setProfileRole(updatedProf.role)
                  setProfileBio(updatedProf.bio)
                  setProfileAvatar(updatedProf.avatar)
                }}
                showToast={showToast}
              />
            )}

            {/* T5. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <SettingsTab 
                showToast={showToast}
              />
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
      <CategoriesModal 
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        categories={categories}
        onRefreshCategories={(updatedCats) => setCategories(updatedCats)}
        showToast={showToast}
      />

      {/* FULL SCREEN ADD/EDIT PROJECT OVERLAY */}
      <ProjectFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        project={editingProject}
        categories={categories}
        onSave={loadCMSData}
        showToast={showToast}
      />

    </div>
  )
}
