import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  ArrowRight, 
  Send,
  Check
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import FAQ from '../sections/FAQ'

// Icons for the custom checkbox grid
const servicesList = [
  {
    id: 'social-media',
    label: 'Social media marketing',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455aebd0d629f3088d79_ads-icon-digigrowth-webflow-template.svg',
    gradient: 'from-brand-pink/20 to-transparent',
    borderColor: 'group-hover:border-brand-pink'
  },
  {
    id: 'seo',
    label: 'Search engine optimization',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455a93603b395c5ef701_search-icon-digigrowth-webflow-template.svg',
    gradient: 'from-brand-orange/20 to-transparent',
    borderColor: 'group-hover:border-brand-orange'
  },
  {
    id: 'paid-adv',
    label: 'Paid advertising',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455a5c9e4a82383477e9_paid-icon-digigrowth-webflow-template.svg',
    gradient: 'from-brand-orange/20 to-transparent',
    borderColor: 'group-hover:border-brand-orange'
  },
  {
    id: 'funnel-opt',
    label: 'Funnel optimization',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6852e61f11a439fea51f181b_funnel-optimization-iorange-con-digigrowth-webflow-template.svg',
    gradient: 'from-brand-pink/20 to-transparent',
    borderColor: 'group-hover:border-brand-pink'
  },
  {
    id: 'adv-analytics',
    label: 'Advance analytics',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455aa2d1ac94b31e4a93_chart-bar-icon-digigrowth-webflow-template.svg',
    gradient: 'from-brand-pink/20 to-transparent',
    borderColor: 'group-hover:border-brand-pink'
  },
  {
    id: 'content-mktg',
    label: 'Content marketing',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455ab341efa6df4385cd_play-button-icon-digigrowth-webflow-template.svg',
    gradient: 'from-brand-orange/20 to-transparent',
    borderColor: 'group-hover:border-brand-orange'
  }
]

export default function Contact() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  })
  const [selectedServices, setSelectedServices] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API request
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  return (
    <div className="flex flex-col w-full bg-white relative">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative w-full overflow-hidden bg-cover bg-center rounded-b-[40px] md:rounded-b-[64px] pt-32 md:pt-44 pb-24 px-6"
        style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6851b3864895901b7a749af8_soft-gradient-background-v9-digigrowth-webflow-template.jpg')` }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[25%] left-[50%] -translate-x-[50%] w-[500px] h-[500px] rounded-full bg-brand-orange-light/10 blur-[100px]"></div>
        </div>

        <div className="max-w-[1256px] mx-auto w-full relative z-10">
          {/* Header Text */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-navy tracking-tight leading-none mb-6"
            >
              Contact
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-neutral-600 text-base md:text-lg max-w-[500px] mx-auto leading-relaxed"
            >
              Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor nulla donec et dui at posuere.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Help & Support */}
            <motion.a 
              variants={itemVariants}
              href="mailto:support@digigrowth.com"
              className="group relative flex flex-col justify-between bg-white rounded-custom-lg border border-neutral-200/50 p-8 sm:p-10 shadow-sm hover:shadow-premium transition-all duration-400 overflow-hidden"
            >
              {/* Background gradient image effect on hover */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f87446e69ac0e28ec4e4e_help-and-support-contact-image-bg-digigrowth-webflow-template.png')` }}
              ></div>
              <div className="absolute top-[10%] left-[50%] -translate-x-[50%] w-[180px] h-[180px] rounded-full bg-brand-pink/5 blur-[35px] group-hover:scale-125 transition-transform duration-700"></div>

              <div className="z-10 flex flex-col items-center text-center">
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f8743e00207c83fac621a_help-and-support-contact-image-digigrowth-webflow-template.png" 
                  alt="Help & Support" 
                  className="w-full max-w-[200px] object-contain mb-8 group-hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">Help & support</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed mb-6">
                  Pellentesque purus tempor dolor ac consequat bibendum vitae in massa ac viverra tellus nisl.
                </p>
              </div>
              <div className="z-10 w-full inline-flex items-center justify-center py-3 bg-neutral-100 group-hover:bg-brand-pink group-hover:text-white rounded-full font-bold text-xs text-navy tracking-wide uppercase transition-all duration-300 gap-2">
                <span>support@digigrowth.com</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Sales & Inquiries */}
            <motion.a 
              variants={itemVariants}
              href="mailto:sales@digigrowth.com"
              className="group relative flex flex-col justify-between bg-white rounded-custom-lg border border-neutral-200/50 p-8 sm:p-10 shadow-sm hover:shadow-premium transition-all duration-400 overflow-hidden"
            >
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f87437189d248b87cd98d_sales-and-inquiries-contact-image-bg-digigrowth-webflow-template.png')` }}
              ></div>
              <div className="absolute top-[10%] left-[50%] -translate-x-[50%] w-[180px] h-[180px] rounded-full bg-brand-orange/5 blur-[35px] group-hover:scale-125 transition-transform duration-700"></div>

              <div className="z-10 flex flex-col items-center text-center">
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f874382d59748c2dfa49f_sales-and-inquiries-contact-image-digigrowth-webflow-template.png" 
                  alt="Sales & Inquiries" 
                  className="w-full max-w-[200px] object-contain mb-8 group-hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">Sales & inquiries</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed mb-6">
                  Magnis adipiscing risus non ut pellentesque elit risus quam massa enim a sociis orci quis aliquet.
                </p>
              </div>
              <div className="z-10 w-full inline-flex items-center justify-center py-3 bg-neutral-100 group-hover:bg-brand-orange group-hover:text-white rounded-full font-bold text-xs text-navy tracking-wide uppercase transition-all duration-300 gap-2">
                <span>sales@digigrowth.com</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Live Chat */}
            <motion.a 
              variants={itemVariants}
              href="https://www.intercom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between bg-white rounded-custom-lg border border-neutral-200/50 p-8 sm:p-10 shadow-sm hover:shadow-premium transition-all duration-400 overflow-hidden"
            >
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f87446e69ac0e28ec4e4e_help-and-support-contact-image-bg-digigrowth-webflow-template.png')` }}
              ></div>
              <div className="absolute top-[10%] left-[50%] -translate-x-[50%] w-[180px] h-[180px] rounded-full bg-brand-pink/5 blur-[35px] group-hover:scale-125 transition-transform duration-700"></div>

              <div className="z-10 flex flex-col items-center text-center">
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f8743e384d9d157c0f1f8_live-chat-contact-image-digigrowth-webflow-template.png" 
                  alt="Live Chat" 
                  className="w-full max-w-[200px] object-contain mb-8 group-hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">Live chat</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed mb-6">
                  Duis sit non vivamus sem in eget pellentesque adipiscing massa enim fusce.
                </p>
              </div>
              <div className="z-10 w-full inline-flex items-center justify-center py-3 bg-neutral-100 group-hover:bg-brand-pink group-hover:text-white rounded-full font-bold text-xs text-navy tracking-wide uppercase transition-all duration-300 gap-2">
                <span>Live chat with us</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 2. COLLABORATE FORM SECTION */}
      <section className="py-24 px-6 w-full max-w-[1256px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Info Side Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-navy mb-4 tracking-tight leading-tight"
              >
                Let’s collaborate
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-neutral-600 text-sm md:text-base leading-relaxed mb-8 max-w-[400px]"
              >
                Lorem ipsum dolor sit amet consectetur lacinia a odio vitae a viverra massa id blandit ullamcorper in tempor.
              </motion.p>
              
              {/* Social icons */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 mb-12"
              >
                {[
                  { icon: <FaFacebookF className="w-4 h-4" />, href: "https://www.facebook.com/" },
                  { icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/" },
                  { icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/" },
                  { icon: <FaLinkedinIn className="w-4 h-4" />, href: "http://linkedin.com/" }
                ].map((social, sIdx) => (
                  <a 
                    key={sIdx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-navy hover:text-white hover:bg-navy hover:border-navy transition-all duration-300 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-4">
              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                href="mailto:info@digigrowth.com"
                className="group flex items-center gap-5 p-5 bg-white border border-neutral-200/50 rounded-custom-sm shadow-sm hover:shadow-premium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-custom-sm bg-brand-pink-light/40 flex items-center justify-center text-brand-pink transition-transform duration-300 group-hover:scale-105 shadow-badge-pink">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-neutral-400 uppercase tracking-wide">Send us an email</div>
                  <div className="text-[15px] font-bold text-navy group-hover:text-brand-pink transition-colors duration-200 flex items-center gap-1.5 mt-0.5">
                    <span>info@digigrowth.com</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </motion.a>

              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                href="tel:(123)456-7890"
                className="group flex items-center gap-5 p-5 bg-white border border-neutral-200/50 rounded-custom-sm shadow-sm hover:shadow-premium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-custom-sm bg-brand-orange-light/40 flex items-center justify-center text-brand-orange transition-transform duration-300 group-hover:scale-105 shadow-badge-orange">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-neutral-400 uppercase tracking-wide">Give us a call</div>
                  <div className="text-[15px] font-bold text-navy group-hover:text-brand-orange transition-colors duration-200 flex items-center gap-1.5 mt-0.5">
                    <span>(123) 456 - 7890</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-neutral-100 border border-neutral-200/50 rounded-custom-lg p-8 sm:p-12 shadow-sm"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Top inputs: Name, Email, Company, Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[15px] font-bold text-navy">What’s your name?</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Carter"
                          required 
                          className="w-full bg-white border border-neutral-200 rounded-custom-sm px-6 py-4 text-navy text-[15px] focus:outline-none focus:border-brand-orange transition-colors duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[15px] font-bold text-navy">What’s your email address?</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@youremail.com"
                          required 
                          className="w-full bg-white border border-neutral-200 rounded-custom-sm px-6 py-4 text-navy text-[15px] focus:outline-none focus:border-brand-orange transition-colors duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="company" className="text-[15px] font-bold text-navy">What’s your company?</label>
                        <input 
                          type="text" 
                          id="company" 
                          name="company" 
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Corp Company"
                          required 
                          className="w-full bg-white border border-neutral-200 rounded-custom-sm px-6 py-4 text-navy text-[15px] focus:outline-none focus:border-brand-orange transition-colors duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="budget" className="text-[15px] font-bold text-navy">What’s your budget?</label>
                        <input 
                          type="text" 
                          id="budget" 
                          name="budget" 
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="ex. $2,000 - $5,000"
                          required 
                          className="w-full bg-white border border-neutral-200 rounded-custom-sm px-6 py-4 text-navy text-[15px] focus:outline-none focus:border-brand-orange transition-colors duration-200"
                        />
                      </div>
                    </div>

                    {/* Checkboxes Grid */}
                    <div className="space-y-4">
                      <label className="text-[15px] font-bold text-navy block">Service you’re interested on:</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {servicesList.map((service) => {
                          const isSelected = selectedServices.includes(service.id)
                          return (
                            <button
                              type="button"
                              key={service.id}
                              onClick={() => toggleService(service.id)}
                              className={`group relative flex items-center justify-between p-4 bg-white border-2 rounded-custom-sm transition-all duration-300 cursor-pointer select-none text-left focus:outline-none ${
                                isSelected 
                                  ? 'border-brand-orange shadow-md' 
                                  : 'border-neutral-200/50 shadow-sm hover:border-neutral-400'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Service Icon */}
                                <div className="w-10 h-10 rounded-custom-sm border border-neutral-100 flex items-center justify-center p-1.5 bg-neutral-50 relative overflow-hidden flex-shrink-0">
                                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}></div>
                                  <img src={service.icon} alt="" className="w-6 h-6 object-contain z-10" />
                                </div>
                                <span className="text-[14px] font-bold text-navy">{service.label}</span>
                              </div>

                              {/* Custom Styled Checkbox Checkmark */}
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-brand-orange border-brand-orange text-white' 
                                  : 'border-neutral-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-[15px] font-bold text-navy">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message here..."
                        rows="5"
                        className="w-full bg-white border border-neutral-200 rounded-custom-sm px-6 py-4 text-navy text-[15px] focus:outline-none focus:border-brand-orange transition-colors duration-200 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative inline-flex items-center justify-center overflow-hidden px-10 py-4.5 rounded-full font-bold text-[15px] text-white bg-navy border border-navy hover:text-navy group transition-all duration-300 cursor-pointer shadow-premium w-full sm:w-auto"
                    >
                      <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-white"></span>
                      <span className="flex items-center gap-2">
                        {loading ? 'Sending...' : 'Send message'}
                        {!loading && <Send className="w-4 h-4" />}
                      </span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="bg-white border border-neutral-200 rounded-custom-lg p-10 sm:p-14 shadow-premium text-center flex flex-col items-center"
                >
                  {/* Success Icon */}
                  <div className="w-16 h-16 rounded-custom-sm bg-brand-orange-light/30 flex items-center justify-center text-brand-orange shadow-badge-orange mb-8">
                    <img 
                      src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689a44525a98af7587ab86c7_success-message-icon-top-digigrowth-webflow-template.png" 
                      alt="Success" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4 tracking-tight leading-tight">
                    Thank you! We’ll get back to you soon
                  </h3>
                  <p className="text-neutral-500 text-[15px] leading-relaxed max-w-[500px]">
                    We have received your message and will get back to you as soon as possible. Our team is dedicated to providing the best support and we appreciate your patience.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', company: '', budget: '', message: '' })
                      setSelectedServices([])
                    }}
                    className="relative inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-bold text-[14px] text-white bg-navy hover:text-navy border border-navy group transition-all duration-300 mt-8 cursor-pointer"
                  >
                    <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-white"></span>
                    <span>Send another message</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <FAQ />

    </div>
  )
}
