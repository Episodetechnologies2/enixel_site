import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'

export default function ProfileTab({ profile, onProfileSaved, showToast }) {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editName, setEditName] = useState(profile.name || '')
  const [editUsername, setEditUsername] = useState(profile.username || '')
  const [editRole, setEditRole] = useState(profile.role || '')
  const [editBio, setEditBio] = useState(profile.bio || '')
  const [profileFile, setProfileFile] = useState(null)
  const [profilePreview, setProfilePreview] = useState(profile.avatar || '')
  const [isSavingProfile, setIsSavingProfile] = useState(false)

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
        onProfileSaved({
          name: responseData.profile.name,
          username: responseData.profile.username,
          role: responseData.profile.role,
          bio: responseData.profile.bio,
          avatar: responseData.profile.avatar
        })
      } else {
        showToast('error', responseData.error || 'Failed to update profile')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not update profile.')
    } finally {
      setIsSavingProfile(false)
    }
  }

  return (
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
                src={profile.avatar}
                alt="Askjey Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-extrabold text-navy tracking-tight">{profile.name}</h2>
              <p className="text-sm font-semibold text-brand-orange">{profile.role}</p>
              <p className="text-xs text-neutral-400 font-medium">Joined CMS: August 2026</p>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <h3 className="text-xs uppercase font-extrabold text-brand-orange tracking-wider">Account Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-0.5">Username</span>
                <span className="font-bold text-navy text-sm">{profile.username}</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-0.5">Authorization Tier</span>
                <span className="font-bold text-navy text-sm">CMS Super User</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-bold text-navy block">Bio & Permissions</span>
              <p className="text-xs text-neutral-500 leading-relaxed text-justify">
                {profile.bio}
              </p>
            </div>
          </div>

          <div className="pt-6 flex justify-end border-t border-neutral-100">
            <button
              onClick={() => {
                setEditName(profile.name || '')
                setEditUsername(profile.username || '')
                setEditRole(profile.role || '')
                setEditBio(profile.bio || '')
                setProfileFile(null)
                setProfilePreview(profile.avatar || '')
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
                src={profilePreview}
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
  )
}
