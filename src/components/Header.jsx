import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import enixel from '../assets/logo/enixel.png';

const SlidNavLink = ({ to, children }) => {
  return (
    <Link to={to} className="block py-2 text-[15px] font-semibold tracking-tight text-neutral-800 hover:text-neutral-500 transition-colors duration-200">
      {children}
    </Link>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])


  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent py-6 text-white">
      <div className="max-w-[1256px] mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center z-50">
          <img
            src={enixel}
            alt="Digigrowth Logo"
            className="h-[80px] w-auto"
          />
        </Link>

        {/* DESKTOP NAVIGATION & CTA CAPSULE */}
        <div className="hidden md:flex items-center bg-white rounded-full shadow-premium pl-8 pr-2 py-1.5 border border-neutral-200/40">
          <nav className="flex items-center space-x-8 text-neutral-800">
            <SlidNavLink to="/">Home</SlidNavLink>
            <SlidNavLink to="/about">About</SlidNavLink>
            <SlidNavLink to="/pricing">Pricing</SlidNavLink>
            <SlidNavLink to="/blog">Blog</SlidNavLink>
          </nav>

          <div className="ml-6">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-[14px] text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300"
            >
              Let's talk
            </Link>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 focus:outline-none z-50 text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-navy border-t border-neutral-800 text-white overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              <Link to="/" className="text-lg font-medium hover:text-neutral-300 py-1">Home</Link>
              <Link to="/about" className="text-lg font-medium hover:text-neutral-300 py-1">About</Link>
              <Link to="/pricing" className="text-lg font-medium hover:text-neutral-300 py-1">Pricing</Link>
              <Link to="/blog" className="text-lg font-medium hover:text-neutral-300 py-1">Blog</Link>

              <Link
                to="/contact"
                className="w-full bg-white hover:bg-neutral-100 text-neutral-900 text-center py-4 rounded-full font-bold text-base transition-colors duration-300"
              >
                Let's talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
