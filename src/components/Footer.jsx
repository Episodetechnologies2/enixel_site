import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import enixel from '../assets/logo/enixel.png';

export default function Footer() {
  return (
    <footer className="bg-[#0b132a] text-white py-20 px-6 border-t border-neutral-800 rounded-t-[40px] md:rounded-t-[48px]">
      <div className="max-w-[1256px] mx-auto">
        
        {/* MAIN PANEL - 4 COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/60">
          
          {/* Column 1: Logo, Bio & Social Icons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <Link to="/">
                <img 
                  src={enixel} 
                  alt="Enixel Logo" 
                  className="h-[70px] md:h-[90px] w-auto object-contain -ml-2"
                />
              </Link>
              <p className="text-neutral-400 text-[15px] leading-relaxed max-w-[360px] mt-4">
                Enixel is a results-driven growth marketing partner. We turn attention into business growth through data-backed SEO, social media, and paid marketing strategies.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
              >
                <FaFacebookF className="w-[16px] h-[16px]" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
              >
                <FaXTwitter className="w-[16px] h-[16px]" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
              >
                <FaInstagram className="w-[16px] h-[16px]" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300"
              >
                <FaLinkedinIn className="w-[16px] h-[16px]" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3 className="text-white font-bold text-[16px] tracking-tight uppercase">Company</h3>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors w-fit hover-underline-anim">
                Home
              </Link>
              <Link to="/about" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors w-fit hover-underline-anim">
                About
              </Link>
              {/* <Link to="/pricing" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors w-fit hover-underline-anim">
                Pricing
              </Link> */}
              <Link to="/blog" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors w-fit hover-underline-anim">
                Blog
              </Link>
              <Link to="/work" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors w-fit hover-underline-anim">
                Work
              </Link>
              <Link to="/contact" className="text-neutral-400 hover:text-white text-[15px] font-medium transition-colors w-fit hover-underline-anim">
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3 className="text-white font-bold text-[16px] tracking-tight uppercase">Get in Touch</h3>
            <div className="flex flex-col space-y-3 text-[15px] text-neutral-400">
              <a href="mailto:info@enixel.com" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Mail className="w-4 h-4 text-brand-orange" />
                <span>info@enixel.com</span>
              </a>
              <a href="tel:(123)456-7890" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>(123) 456 - 7890</span>
              </a>
            </div>
          </div>

          {/* Column 4: Ready to Grow CTA */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3 className="text-white font-bold text-[16px] tracking-tight uppercase">Ready to Grow?</h3>
            <p className="text-neutral-400 text-[14px] leading-relaxed">
              Let's create something extraordinary together.
            </p>
            <div>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-navy font-bold text-[14px] px-6 py-2.5 rounded-full shadow-badge-orange transition-colors duration-300"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM PANEL: COPYRIGHT & DETAILS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-[14px] text-neutral-500">
          <p className="text-center md:text-left">
            Copyright © <span className="text-white font-medium">Enixel</span> | Designed by <a href="https://brixtemplates.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-neutral-400 underline font-medium">BRIX Templates</a>.
          </p>
          <p className="text-center md:text-right font-medium">
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

