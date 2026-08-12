import React from 'react'
import { motion } from 'framer-motion'
import { Grid, FileText, ShieldCheck, FolderPlus, KeyRound, Plus } from 'lucide-react'

export default function DashboardTab({ 
  projectsCount, 
  categoriesCount, 
  onAddWorkClick, 
  onCreateCategoryClick, 
  onNavigate 
}) {
  return (
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
            <h3 className="text-4xl font-extrabold text-navy leading-none">{projectsCount}</h3>
          </div>
          <div className="w-12 h-12 bg-[#ffe7d6] rounded-2xl flex items-center justify-center text-brand-orange">
            <Grid className="w-6 h-6" />
          </div>
        </div>

        {/* Categories count */}
        <div className="bg-white p-6 rounded-custom-md border border-neutral-200/60 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Work Categories</span>
            <h3 className="text-4xl font-extrabold text-navy leading-none">{categoriesCount}</h3>
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
              onNavigate('/admin/work');
              setTimeout(() => onAddWorkClick(), 100);
            }}
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-sm"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Add Work updates</span>
          </button>
          <button
            onClick={() => {
              onNavigate('/admin/work');
              setTimeout(() => onCreateCategoryClick(), 100);
            }}
            className="inline-flex items-center gap-2 border border-neutral-300 hover:border-navy bg-white hover:bg-neutral-50 text-neutral-700 hover:text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Category</span>
          </button>
          <button
            onClick={() => onNavigate('/admin/settings')}
            className="inline-flex items-center gap-2 border border-neutral-300 hover:border-navy bg-white hover:bg-neutral-50 text-neutral-700 hover:text-navy text-xs font-bold px-6 py-3 rounded-full cursor-pointer transition-colors shadow-sm"
          >
            <KeyRound className="w-4 h-4" />
            <span>Security & Password Settings</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
