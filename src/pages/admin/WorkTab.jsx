import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Image, Eye, EyeOff, Edit2, Trash2 } from 'lucide-react'

export default function WorkTab({
  projects,
  categories,
  filterCategory,
  setFilterCategory,
  onOpenCategoriesModal,
  onOpenAddForm,
  onOpenEditForm,
  onToggleStatus,
  onDeleteProject
}) {
  const filteredProjects = projects.filter(
    (p) => filterCategory === 'All' || (p.categories && p.categories.includes(filterCategory))
  )

  return (
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

          {/* Quick Categories Button */}
          <button
            type="button"
            onClick={onOpenCategoriesModal}
            className="inline-flex items-center gap-2 border border-neutral-300 hover:border-navy bg-white hover:bg-neutral-50 text-neutral-700 hover:text-navy text-xs font-bold px-5 py-3 rounded-full cursor-pointer transition-colors shadow-sm flex-shrink-0"
          >
            <Plus className="w-4 h-4 text-brand-orange stroke-[3]" />
            <span>Quick Categories</span>
          </button>

          <button
            onClick={onOpenAddForm}
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
      ) : filteredProjects.length === 0 ? (
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
                {filteredProjects.map((proj) => (
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
                          onClick={() => onToggleStatus(proj)}
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
                          onClick={() => onOpenEditForm(proj)}
                          className="text-neutral-400 hover:text-brand-orange p-1.5 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                          title="Edit details"
                        >
                          <Edit2 className="w-4.5 h-4.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => onDeleteProject(proj.id, proj.title)}
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
  )
}
