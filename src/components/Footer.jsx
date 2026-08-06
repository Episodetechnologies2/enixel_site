import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Check, AlertCircle, ArrowRight } from 'lucide-react'
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import enixel from '../assets/logo/enixel.png';

export default function Footer() {
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
    <footer className="bg-navy text-white py-20 px-6 border-t border-neutral-800 rounded-t-[40px] md:rounded-t-[48px]">
      <div className="max-w-[1256px] mx-auto">
        
        {/* TOP PANEL: LOGO & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-16 border-b border-neutral-800/80">
          <div className="lg:col-span-4">
            <Link to="/">
              <img 
                src={enixel} 
                alt="Enixel Logo" 
                className="h-[70px] md:h-[90px] w-auto object-contain"
              />
            </Link>
          </div>
          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
            <h2 className="text-xl md:text-2xl text-white font-bold tracking-tight max-w-[420px] leading-snug">
              Get practical tips and industry updates delivered directly to your inbox.
            </h2>
            <div className="w-full max-w-[400px]">
              <form onSubmit={handleSubscribe} className="w-full bg-white rounded-full flex items-center p-1 border border-neutral-800">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 pl-6 pr-2 py-2 text-[15px] outline-none border-none"
                  required
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit" 
                  className="bg-black hover:bg-neutral-800 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </form>

              {/* Status Message feedback */}
              {status === 'success' && (
                <div className="flex items-center space-x-2 text-sys-green mt-3 text-sm font-medium">
                  <Check className="w-4 h-4" />
                  <span>Thanks for joining our newsletter.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center space-x-2 text-sys-red mt-3 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>Oops! Something went wrong.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NAVIGATION PANEL */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-b border-neutral-800/80">
          <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-3">
            <Link to="/" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors hover-underline-anim">
              Home
            </Link>
            <Link to="/about" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors hover-underline-anim">
              About
            </Link>
            <Link to="/pricing" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors hover-underline-anim">
              Pricing
            </Link>
            <Link to="/blog" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors hover-underline-anim">
              Blog
            </Link>
            <Link to="/contact" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors hover-underline-anim">
              Contact
            </Link>
          </nav>
          <div className="text-[14px] text-neutral-500 font-medium">
            Ready to grow? <Link to="/contact" className="text-brand-orange hover:text-brand-orange-light transition-colors underline">Get in touch</Link>
          </div>
        </div>

        {/* BOTTOM PANEL: COPYRIGHT & SOCIALS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-[14px] text-neutral-500 text-center md:text-left">
            Copyright © <span className="text-white font-medium">Enixel</span> | Designed by <a href="https://brixtemplates.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-neutral-400 underline">BRIX Templates</a> - Powered by Webflow.
          </p>
          <div className="flex items-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-400 transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-400 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-400 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-400 transition-colors">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
