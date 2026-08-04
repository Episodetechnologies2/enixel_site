import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, ArrowUpRight } from 'lucide-react'

// Mock Data for the 6 Digigrowth Blog posts
const articles = [
  {
    id: 1,
    title: "How to increase Facebook reach over 200% with this simple trick",
    category: "Social Media",
    date: "Jun 16, 2025",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c7c0486852ac3bb18ba39_how-to-increase-facebook-reach-200-3-2-digigrowth-webflow-template.jpg",
    slug: "how-to-increase-facebook-reach-over-200-with-this-simple-trick"
  },
  {
    id: 2,
    title: "5 social media apps you should be paying attention to in 2026",
    category: "Growth",
    date: "Jun 16, 2025",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c7c423a8801fbc186e5e8_5-social-media-apps-to-watch-2026-3-2-digigrowth-webflow-template.jpg",
    slug: "5-social-media-apps-you-should-be-paying-attention-to-in-2026"
  },
  {
    id: 3,
    title: "5 great content marketing ideas for your Instagram account",
    category: "Content",
    date: "Jun 17, 2025",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/6851875a6d14b02237624049_5-instagram-content-marketing-ideas-3-2-digigrowth-webflow-template.jpg",
    slug: "5-great-content-marketing-ideas-for-your-instagram-account"
  },
  {
    id: 4,
    title: "Why user psychology matters in lead generation",
    category: "Social Media",
    date: "Jun 20, 2025",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c7bcb96462261752d2f9e_why-user-psychology-matters-lead-gen-3-2-digigrowth-webflow-template.jpg",
    slug: "why-user-psychology-matters-in-lead-generation"
  },
  {
    id: 5,
    title: "Why customer retention is the ultimate growth strategy",
    category: "Growth",
    date: "Jun 13, 2025",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c7b98e002c7db332a7a53_why-customer-retention-drives-growth-3-2-digigrowth-webflow-template.jpg",
    slug: "why-customer-retention-is-the-ultimate-growth-strategy"
  },
  {
    id: 6,
    title: "The power of social media in growth marketing: Strategies for coaches",
    category: "Content",
    date: "Jun 13, 2025",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c7a95fcf2de5dbc3f7308_social-media-growth-strategies-coaches-3-2-digigrowth-webflow-template.jpg",
    slug: "the-power-of-social-media-in-growth-marketing-strategies-for-coaches"
  }
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle newsletter signup
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  // Categories list
  const categories = ['All', 'Content', 'Growth', 'Social Media']

  // Featured post is id 1, stack posts are ids 2, 3, 4
  const featuredPost = articles[0]
  const stackPosts = articles.slice(1, 4)

  // Filter latest articles
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(post => post.category === selectedCategory)

  // Pagination bounds
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage)

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  return (
    <div className="flex flex-col w-full bg-white relative">
      
      {/* 1. HERO SECTION & RECENT ARTICLES */}
      <section className="relative w-full overflow-hidden bg-cover bg-center rounded-b-[40px] md:rounded-b-[64px] pt-32 md:pt-40 pb-20 px-6"
        style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6851b3864895901b7a749af8_soft-gradient-background-v9-digigrowth-webflow-template.jpg')` }}
      >
        <div className="max-w-[1256px] mx-auto w-full relative z-10">
          
          {/* Section Header Text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-8">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-navy tracking-tight leading-[1.05]"
              >
                Blog & resources
              </motion.h1>
            </div>
            <div className="md:col-span-4">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[15px] text-neutral-600 leading-relaxed max-w-[380px]"
              >
                Browse our latest articles, insights, and guides to scale your digital presence.
              </motion.p>
            </div>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
            
            {/* Left Column: Featured Post (Col-span 5) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <Link 
                to={`/blog/${featuredPost.slug}`}
                className="flex flex-col h-full bg-white rounded-custom-md border border-neutral-200/50 p-5 shadow-sm hover:shadow-premium transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-[4/3] w-full rounded-custom-sm overflow-hidden mb-6 bg-neutral-100">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <h3 className="text-xl md:text-[22px] font-bold text-navy leading-snug tracking-tight mb-6 group-hover:text-brand-orange transition-colors duration-200">
                    {featuredPost.title}
                  </h3>
                  <div className="flex items-center space-x-3 mt-auto">
                    <span className="bg-navy text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {featuredPost.date}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Middle Column: Secondary Posts Stack (Col-span 4) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-4 flex flex-col justify-between space-y-4"
            >
              {stackPosts.map((post, idx) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex flex-col justify-between p-6 bg-white rounded-custom-md border border-neutral-200/50 hover:border-brand-orange/30 shadow-sm hover:shadow-premium transition-all duration-300 group cursor-pointer flex-grow"
                >
                  <h3 className="text-[16px] md:text-[17px] font-bold text-navy leading-snug tracking-tight mb-4 group-hover:text-brand-orange transition-colors duration-200">
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="bg-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {post.date}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* Right Column: Premium Newsletter Card (Col-span 3) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-3 bg-navy rounded-custom-md p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-premium border border-neutral-800"
            >
              {/* Blur accent overlay */}
              <img 
                src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a8d7d57daec22bae50f97e_cta-card-bg-blur-digigrowth-webflow-template.png" 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none z-0"
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Paper airplane icon circle */}
                  <div className="mb-6 w-14 h-14 rounded-full bg-neutral-800/80 flex items-center justify-center border border-neutral-700/50 shadow-md">
                    <img 
                      src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68507cb1cd95a9878b7eb966_airplane-paper-digigrowth-webflow-template.png" 
                      alt="Paper Airplane illustration" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 tracking-tight leading-snug">
                    Get weekly news straight to your inbox
                  </h3>
                </div>

                <div className="w-full mt-6">
                  <form onSubmit={handleSubscribe} className="relative flex items-center w-full">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-800/80 backdrop-blur-sm text-white rounded-full py-3.5 pl-5 pr-14 text-sm outline-none border border-neutral-700/60 focus:border-brand-orange transition-all duration-300"
                      required
                    />
                    <button 
                      type="submit" 
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-orange hover:bg-brand-orange-light text-navy rounded-full p-2.5 transition-colors duration-300 flex items-center justify-center cursor-pointer shadow-premium"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </form>

                  {/* Form response states */}
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center space-x-2 text-sys-green mt-3 text-[11px] font-semibold"
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Thanks for joining our newsletter.</span>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center space-x-2 text-sys-red mt-3 text-[11px] font-semibold"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Oops! Something went wrong.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. LATEST ARTICLES GRID & FILTER PANEL */}
      <section className="py-24 px-6 bg-white w-full">
        <div className="max-w-[1256px] mx-auto w-full">
          
          {/* Header & Categories Selector */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-navy mb-4 tracking-tight">
              Latest articles
            </h2>
            <p className="text-[15px] text-neutral-600 max-w-[420px] mx-auto mb-8">
              Lorem ipsum dolor sit amet consectetur lacinia a odio vitae a viverra massa id blandit ullamcorper in.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-350 cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-navy border-navy text-white shadow-premium'
                      : 'bg-white border-neutral-200 text-navy hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Filtered Articles */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full"
          >
            <AnimatePresence mode="popLayout">
              {currentArticles.map((post) => (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="card blog-card-v3 flex flex-col h-full bg-white hover:bg-neutral-50 rounded-custom-md border border-neutral-200/50 p-6 shadow-sm hover:shadow-premium transition-all duration-300 group cursor-pointer justify-between"
                  >
                    <div className="w-full">
                      <div className="aspect-[3/2] w-full rounded-custom-sm overflow-hidden mb-6 bg-neutral-100">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                      </div>
                      
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <h3 className="text-xl md:text-[22px] font-bold text-navy leading-snug tracking-tight group-hover:text-brand-orange transition-colors duration-200">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
                      <div className="flex items-center space-x-3">
                        <span className="bg-neutral-100 border border-neutral-200 text-navy text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium">
                          {post.date}
                        </span>
                      </div>
                      
                      {/* Arrow Icon Badge */}
                      <div className="w-10 h-10 rounded-full bg-neutral-900 group-hover:bg-brand-orange text-white group-hover:text-navy flex items-center justify-center transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4 mt-12 pt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-2.5 rounded-full font-bold text-[14px] border border-neutral-200 text-navy bg-white hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              <span className="text-sm font-semibold text-neutral-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-2.5 rounded-full font-bold text-[14px] border border-neutral-200 text-navy bg-white hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}
