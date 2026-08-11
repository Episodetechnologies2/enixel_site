import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { getApiUrl } from '../../config'

export default function SettingsTab({ showToast }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [passError, setPassError] = useState('')
  const [passSuccess, setPassSuccess] = useState('')

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
      const response = await fetch(getApiUrl('/api/settings/password'), {
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

  return (
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
  )
}
