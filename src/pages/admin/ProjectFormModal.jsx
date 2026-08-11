import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Image } from 'lucide-react'
import { getApiUrl, getMediaUrl } from '../../config'

export default function ProjectFormModal({ 
  isOpen, 
  onClose, 
  project, 
  categories, 
  onSave, 
  showToast 
}) {
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
  
  const [fileMain, setFileMain] = useState(null)
  const [fileChallenge, setFileChallenge] = useState(null)
  const [fileStrategy, setFileStrategy] = useState(null)
  const [fileResults, setFileResults] = useState(null)
  
  const [previewMain, setPreviewMain] = useState('')
  const [previewChallenge, setPreviewChallenge] = useState('')
  const [previewStrategy, setPreviewStrategy] = useState('')
  const [previewResults, setPreviewResults] = useState('')
  
  const [formStatus, setFormStatus] = useState('published')
  const [isSavingProject, setIsSavingProject] = useState(false)

  useEffect(() => {
    if (project) {
      setFormStatus(project.status || 'published')
      setFormTitle(project.title || '')
      setFormTagline(project.tagline || '')
      setFormDescription(project.description || '')
      setFormSelectedCats(project.categories || [])
      setFormStat(project.stat || '')
      setFormStatLabel(project.statLabel || '')
      setFormStatDetail(project.statDetail || '')
      setFormClient(project.details?.client || '')
      setFormServices(project.details?.services ? project.details.services.join(', ') : '')
      setFormChallenge(project.details?.challenge || '')
      setFormStrategy(project.details?.strategy || '')
      setFormResults(project.details?.results || '')
      setFormTestimonialText(project.details?.testimonial?.text || '')
      setFormTestimonialAuthor(project.details?.testimonial?.author || '')
      setFormTestimonialRole(project.details?.testimonial?.role || '')
      
      setFileMain(null)
      setFileChallenge(null)
      setFileStrategy(null)
      setFileResults(null)
      
      setPreviewMain(project.image || '')
      setPreviewChallenge(project.details?.challengeImage || '')
      setPreviewStrategy(project.details?.strategyImage || '')
      setPreviewResults(project.details?.resultsImage || '')
    } else {
      setFormStatus('published')
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
      setPreviewResults('')
    }
  }, [project, isOpen])

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

  const handleSaveProjectSubmit = async (e) => {
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

      const url = project ? getApiUrl(`/api/projects/${project.id}`) : getApiUrl('/api/projects')
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formData
      })

      const responseData = await response.json()
      if (response.ok && responseData.success) {
        showToast('success', project ? 'Project updated successfully!' : 'Project created successfully!')
        onSave()
        onClose()
      } else {
        showToast('error', responseData.error || 'Failed to save project')
      }
    } catch (err) {
      showToast('error', 'Network error. Could not connect to CMS.')
    } finally {
      setIsSavingProject(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isSavingProject) onClose()
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
                  {project ? 'Edit Work' : 'Create New Work'}
                </h2>
                <p className="text-xs text-neutral-500 font-medium">Fill in the fields to publish a dynamic case study</p>
              </div>
              <button
                onClick={onClose}
                disabled={isSavingProject}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-navy cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectSubmit} className="flex-grow overflow-y-auto p-6 sm:p-8 space-y-8">
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
                        <img src={getMediaUrl(previewMain)} alt="Preview" className="w-full h-full object-cover" />
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
                          <img src={getMediaUrl(previewChallenge)} alt="Challenge Preview" className="w-full h-full object-cover" />
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
                          <img src={getMediaUrl(previewStrategy)} alt="Strategy Preview" className="w-full h-full object-cover" />
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
                          <img src={getMediaUrl(previewResults)} alt="Results Preview" className="w-full h-full object-cover" />
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
                onClick={onClose}
                className="px-6 py-3 rounded-full text-xs font-bold text-neutral-600 hover:text-navy border border-neutral-200 bg-white hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProjectSubmit}
                disabled={isSavingProject}
                className="bg-navy hover:bg-neutral-800 text-white font-bold px-8 py-3 rounded-full text-xs cursor-pointer transition-colors flex items-center justify-center shadow-premium"
              >
                {isSavingProject ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>{project ? 'Update Work' : 'Publish Work'}</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
