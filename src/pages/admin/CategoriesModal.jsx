import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { getApiUrl } from '../../config'

export default function CategoriesModal({ 
  isOpen, 
  onClose, 
  categories, 
  onRefreshCategories, 
  showToast 
}) {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isSavingCategory, setIsSavingCategory] = useState(false)

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return
    setIsSavingCategory(true)
    try {
      const response = await fetch(getApiUrl('/api/categories'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() })
      })
      const data = await response.json()
      if (response.ok) {
        onRefreshCategories(data.categories)
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
      const response = await fetch(getApiUrl('/api/categories'), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName })
      })
      const data = await response.json()
      if (response.ok) {
        onRefreshCategories(data.categories)
        showToast('success', 'Category deleted successfully!')
      } else {
        showToast('error', data.error || 'Failed to delete category')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not delete category.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                onClick={onClose}
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
                onClick={onClose}
                className="px-6 py-2.5 bg-navy hover:bg-neutral-800 text-white font-bold rounded-full text-xs cursor-pointer transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
