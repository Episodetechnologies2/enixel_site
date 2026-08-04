import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'

const featuredPost = {
  title: "How to increase Facebook reach over 200% with this simple trick",
  category: "Social Media",
  date: "Jun 16, 2025",
  image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d3f322/684c7c0486852ac3bb18ba39_how-to-increase-facebook-reach-200-3-2-digigrowth-webflow-template.jpg"
}

const listPosts = [
  {
    title: "5 social media apps you should be paying attention to in 2026",
    category: "Growth",
    date: "Jun 16, 2025"
  },
  {
    title: "5 great content marketing ideas for your Instagram account",
    category: "Content",
    date: "Jun 17, 2025"
  },
  {
    title: "Why user psychology matters in lead generation",
    category: "Social Media",
    date: "Jun 20, 2025"
  }
]

export default function BlogNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  return (
    <section className="py-24 px-6 bg-white max-w-[1256px] mx-auto w-full">
      
      {/* SECTION TITLE & HEADER BUTTON */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-[400px]">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-navy tracking-tight leading-tight">
            Browse our content on growth marketing
          </h2>
        </div>
        <div className="flex-shrink-0">
          <a 
            href="#blog" 
            className="relative inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-semibold text-[15px] text-navy bg-white border border-neutral-200 hover:text-white group transition-all duration-300 shadow-sm hover:shadow-premium"
          >
            <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-navy"></span>
            Browse all articles
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ARTICLES GRID (COL-SPAN 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          
          {/* Featured Post Card (Col-span 7) */}
          <div className="md:col-span-7 flex flex-col h-full bg-neutral-100 rounded-custom-md border border-neutral-200/50 p-6 shadow-sm hover:shadow-premium transition-all duration-300 group cursor-pointer">
            <div className="aspect-[4/3] bg-neutral-200 rounded-custom-sm overflow-hidden mb-6">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <h3 className="text-xl font-bold text-navy leading-snug tracking-tight mb-6 group-hover:text-brand-orange transition-colors duration-200">
                {featuredPost.title}
              </h3>
              <div className="flex items-center space-x-3 mt-auto">
                <span className="bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <span className="text-sm text-neutral-500 font-medium">
                  {featuredPost.date}
                </span>
              </div>
            </div>
          </div>

          {/* List Posts Stack (Col-span 5) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            {listPosts.map((post, idx) => (
              <div 
                key={idx}
                className="p-6 bg-neutral-100 rounded-custom-md border border-neutral-200/50 hover:border-brand-orange/30 shadow-sm hover:shadow-premium transition-all duration-300 group cursor-pointer"
              >
                <h3 className="text-base md:text-[17px] font-bold text-navy leading-snug tracking-tight mb-4 group-hover:text-brand-orange transition-colors duration-200">
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
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: NEWSLETTER CARD (COL-SPAN 4) */}
        <div className="lg:col-span-4 bg-navy rounded-custom-md p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-premium min-h-[460px] border border-neutral-800">
          
          {/* Background overlay images for blur look */}
          <img 
            src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a8d7d57daec22bae50f97e_cta-card-bg-blur-digigrowth-webflow-template.png" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen pointer-events-none z-0"
          />

          <div className="relative z-10">
            {/* Plane Illustration */}
            <div className="mb-8 w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700/60 shadow-premium">
              <img 
                src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68507cb1cd95a9878b7eb966_airplane-paper-digigrowth-webflow-template.png" 
                alt="Paper Airplane icon" 
                className="w-8 h-8 object-contain"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
              Get weekly news straight to your inbox
            </h3>
          </div>

          {/* Form */}
          <div className="relative z-10 w-full mt-8">
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
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-orange hover:bg-brand-orange-light text-navy rounded-full p-2.5 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>

            {/* Validation Feedback message */}
            {status === 'success' && (
              <div className="flex items-center space-x-2 text-sys-green mt-3 text-xs font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Thanks for joining our newsletter.</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center space-x-2 text-sys-red mt-3 text-xs font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Oops! Something went wrong.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
