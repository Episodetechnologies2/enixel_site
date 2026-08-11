import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLogin({ onLogin, authError, isAuthenticating }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }

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

        <form onSubmit={handleSubmit} className="space-y-6">
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
