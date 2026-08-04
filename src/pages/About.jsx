import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ArrowUpRight } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import AboutSection from '../sections/About'

// Partners data for the Loved By marquee
const partners = [
  { name: 'Vireon', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68509384881ebc0cc7a13e3d_vireon-icon-digigrowth-webflow-template.svg' },
  { name: 'Linkora', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68509384237c5517dc148e3a_linkora-icon-digigrowth-webflow-template.svg' },
  { name: 'Converra', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/685093841c17f3dadadf7c93_converra-icon-digigrowth-webflow-template.svg' },
  { name: 'Nexora', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6850938451f4de0cc662d6c1_nexora-icon-digigrowth-webflow-template.svg' },
  { name: 'Syncell', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6850938401c5043bfa928b39_syncell-icon-digigrowth-webflow-template.svg' },
  { name: 'Socium', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6850938480df25920b74db67_socium-icon-digigrowth-webflow-template.svg' },
  { name: 'Bridgr', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68509384499677219eff878d_bridgr-icon-digigrowth-webflow-template.svg' },
  { name: 'Netspire', logo: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6850938d8c6bdfd98c0bcb2a_netspire-icon-digigrowth-webflow-template.svg' }
]

// Team members data
const teamMembers = [
  {
    name: 'John Carter',
    role: 'CEO & Founder',
    avatar: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c6748dcbf019b69d208d3_john-carter-avatar-digigrowth-webflow-template.png',
    circleBg: '#ffb486',
    linkedin: 'https://linkedin.com/'
  },
  {
    name: 'Sophie Moore',
    role: 'CTO & Co-founder',
    avatar: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c6720339249b057f32a76_sophie-moore-avatar-digigrowth-webflow-template.png',
    circleBg: '#ff8694',
    linkedin: 'https://linkedin.com/'
  },
  {
    name: 'Matt Cannon',
    role: 'Creative Director',
    avatar: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c66f02464a89d3bf98c3b_matt-cannon-avatar-digigrowth-webflow-template.png',
    circleBg: '#ffb486',
    linkedin: 'https://linkedin.com/'
  },
  {
    name: 'Lilly Woods',
    role: 'Head of Strategy',
    avatar: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c66d703cddf375adf8988_lilly-woods-avatar-digigrowth-webflow-template.png',
    circleBg: '#ff8694',
    linkedin: 'https://linkedin.com/'
  }
]

const teamMembersBottom = [
  {
    name: 'Sandy Houston',
    role: 'Social Media Director',
    avatar: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c669da0637477f63eab8f_sandy-houston-avatar-digigrowth-webflow-template.png',
    circleBg: '#ff8694',
    linkedin: 'https://linkedin.com/'
  },
  {
    name: 'Andy Smith',
    role: 'Lead Designer',
    avatar: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c65d26f8049855edf0951_andy-smith-avatar-digigrowth-webflow-template.png',
    circleBg: '#ffb486',
    linkedin: 'https://linkedin.com/'
  }
]

// Core Values data
const coreValues = [
  {
    name: 'Accuracy',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c502e6b3c2c90903e43c1_accuracy-digigrowth-webflow-template.png',
    desc: 'Ornare leo pulvinar lobortis purus mauris massa nulla velit sagittis faucibus ipsum viverra congue mi.'
  },
  {
    name: 'Innovation',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c502e27825511c4af6630_innovation-digigrowth-webflow-template.png',
    desc: 'Ornare leo pulvinar lobortis purus mauris massa nulla velit sagittis faucibus ipsum viverra congue mi.'
  },
  {
    name: 'Speed',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c502ee0e607c045259c6c_speed-digigrowth-webflow-template.png',
    desc: 'Ornare leo pulvinar lobortis purus mauris massa nulla velit sagittis faucibus ipsum viverra congue mi.'
  },
  {
    name: 'Excellence',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c502ef8febf6f1383722d_excellence-digigrowth-webflow-template.png',
    desc: 'Ornare leo pulvinar lobortis purus mauris massa nulla velit sagittis faucibus ipsum viverra congue mi.'
  },
  {
    name: 'Efficiency',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c502e858148c5436697bd_efficiency-digigrowth-webflow-template.png',
    desc: 'Ornare leo pulvinar lobortis purus mauris massa nulla velit sagittis faucibus ipsum viverra congue mi.'
  },
  {
    name: 'Communication',
    icon: 'https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c50341feb252e84a639b2_communication-digigrowth-webflow-template.png',
    desc: 'Ornare leo pulvinar lobortis purus mauris massa nulla velit sagittis faucibus ipsum viverra congue mi.'
  }
]

// Open Positions data
const openPositions = [
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full time',
    desc: 'Lorem ipsum dolor sit amet consectetur et leo in placerat posuere ac vehicula libero turpis vivamus a tristique id at scelerisque eu sapien venenatis nibh.'
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Business',
    location: 'San Francisco, CA',
    type: 'Part time',
    desc: 'Lorem ipsum dolor sit amet consectetur et leo in placerat posuere ac vehicula libero turpis vivamus a tristique id at scelerisque eu sapien venenatis nibh.'
  },
  {
    title: 'Machine Learning Engineer',
    department: 'Development',
    location: 'New York, NY',
    type: 'Full time',
    desc: 'Lorem ipsum dolor sit amet consectetur et leo in placerat posuere ac vehicula libero turpis vivamus a tristique id at scelerisque eu sapien venenatis nibh.'
  }
]

export default function AboutPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col w-full bg-white relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-cover bg-center rounded-b-[40px] md:rounded-b-[64px] pt-32 md:pt-48 pb-20 px-6"
        style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6851b3864895901b7a749af8_soft-gradient-background-v9-digigrowth-webflow-template.jpg')` }}
      >
        <div className="max-w-[1256px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Card Left */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 bg-white p-8 sm:p-10 md:p-14 rounded-custom-lg shadow-premium max-w-[480px] w-full"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.1] text-navy mb-4 tracking-tight text-balance">
              Learn more about our marketing agency
            </h1>
            <p className="text-[15px] text-neutral-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor nulla donec dui at.
            </p>
            <div>
              <a 
                href="#open-positions" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[15px] text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300 shadow-premium"
              >
                Join our team
              </a>
            </div>
          </motion.div>

          {/* Hero Image Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center lg:justify-end self-end lg:translate-y-16"
          >
            <img 
              src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68967b58a8f9998b82bb9c9d_about-hero-image-digigrowth-webflow-template.png" 
              alt="About Our Marketing Agency" 
              className="w-full max-w-[480px] lg:max-w-none lg:w-[600px] object-contain drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. CULTIVATING VOICES & VIDEO INTRO SECTION */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1256px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Lightbox / Video Card Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative cursor-pointer group rounded-custom-lg overflow-hidden shadow-premium"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6851b38666c65cd4ddcb3d37_3d-pink-rocket-icon-digigrowth-webflow-template.jpg" 
                alt="3D Pink Rocket Video Preview" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-navy/20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-premium transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 sm:h-7 sm:w-7 text-navy fill-navy translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Right */}
          <div className="lg:col-span-6 max-w-[500px]">
            <h2 className="text-3xl md:text-[38px] font-bold text-navy mb-4 leading-tight">
              Cultivating a space where voices thrive
            </h2>
            <p className="text-[15px] text-neutral-600 mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur in sagittis ante mattis cursus dictumst aliquam convallis ut nam est donec et.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#open-positions"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-[14px] border border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-300"
              >
                Join our team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. USED AND LOVED BY MARQUEE */}
      <section className="py-16 bg-[#f8f9fa] border-y border-neutral-200/50 overflow-hidden w-full">
        <div className="max-w-[1256px] mx-auto px-6 mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
            Used and loved by
          </p>
        </div>
        <div className="flex overflow-hidden relative w-full">
          <div className="marquee-scroll flex items-center space-x-16 pr-16 select-none">
            {[...partners, ...partners, ...partners].map((p, idx) => (
              <div 
                key={idx} 
                className="flex items-center space-x-3 text-neutral-500 hover:text-navy transition-colors duration-300 shrink-0"
              >
                <img src={p.logo} alt={p.name} className="h-[38px] w-auto opacity-70 hover:opacity-100 transition-opacity duration-200" />
                <span className="text-[17px] font-semibold text-neutral-800 tracking-tight">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION STATEMENT (Reusing scroll-animated component) */}
      <div className="py-12 md:py-20 px-6 max-w-[1256px] mx-auto w-full">
        <AboutSection />
      </div>

      {/* 5. TEAM SECTION */}
      <section className="py-20 md:py-28 px-6 max-w-[1256px] mx-auto w-full">
        {/* Title area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="max-w-[500px]">
            <h2 className="text-3xl md:text-[40px] font-bold text-navy leading-tight">
              Meet the growing team behind us
            </h2>
          </div>
          <div className="max-w-[380px]">
            <p className="text-[15px] text-neutral-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor nulla donec et dui at posuere.
            </p>
          </div>
        </div>

        {/* Team Grid Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {teamMembers.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#f9f9f9] border border-neutral-200/40 p-8 rounded-custom-lg relative flex flex-col justify-between overflow-hidden group min-h-[290px] shadow-sm hover:shadow-premium transition-all duration-300"
            >
              {/* Card Header Actions */}
              <div className="z-10 flex justify-between items-center mb-6">
                <a 
                  href={m.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-full border border-neutral-300/60 bg-white flex items-center justify-center text-neutral-600 hover:text-navy hover:border-neutral-400 transition-colors duration-300"
                >
                  <FaLinkedin className="w-4 h-4 fill-current" />
                </a>
                <div className="w-10 h-10 rounded-md border border-neutral-300/60 bg-white flex items-center justify-center text-neutral-600 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Avatar & Text */}
              <div className="z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-premium overflow-hidden mb-4 relative">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-1 leading-tight">{m.name}</h3>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{m.role}</p>
              </div>

              {/* Circle avatar bg overlay */}
              <div 
                style={{ backgroundColor: m.circleBg }} 
                className="circle-avatar-bg z-0 transition-transform duration-500 ease-out absolute rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Team Grid Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CTA Card in the middle/spanning columns */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card cta-v2 col-span-1 sm:col-span-2 lg:col-span-2 bg-[#fdf8f5] p-8 md:p-10 rounded-custom-lg flex flex-col sm:flex-row justify-between items-center relative overflow-hidden border border-brand-orange/10 min-h-[290px]"
            style={{ 
              backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a8e99dee0dca57773db3f0_cta-card-bg-blur-v2-digigrowth-webflow-template.png')`,
              backgroundPosition: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 130%'
            }}
          >
            <div className="z-10 max-w-[280px] text-center sm:text-left flex flex-col justify-between h-full">
              <div>
                <h3 className="text-[22px] font-bold text-navy leading-[1.2] mb-3">
                  Want to be part of our team? Let’s talk.
                </h3>
                <p className="text-[14px] text-neutral-600 mb-6">
                  Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac.
                </p>
              </div>
              <div>
                <a 
                  href="#open-positions" 
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-[14px] text-white bg-brand-orange hover:bg-[#fa7b3b] transition-colors duration-300 shadow-premium"
                >
                  Join our team
                </a>
              </div>
            </div>
            
            <div className="relative mt-6 sm:mt-0 max-w-[140px] sm:max-w-none">
              <motion.img 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6851b3862b143539c9198503_3d-abstract-user-profile-digigrowth-webflow-template.png" 
                alt="3D avatar profile" 
                className="w-auto h-[180px] object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>

          {/* Remaining Team members */}
          {teamMembersBottom.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#f9f9f9] border border-neutral-200/40 p-8 rounded-custom-lg relative flex flex-col justify-between overflow-hidden group min-h-[290px] shadow-sm hover:shadow-premium transition-all duration-300"
            >
              <div className="z-10 flex justify-between items-center mb-6">
                <a 
                  href={m.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-full border border-neutral-300/60 bg-white flex items-center justify-center text-neutral-600 hover:text-navy hover:border-neutral-400 transition-colors duration-300"
                >
                  <FaLinkedin className="w-4 h-4 fill-current" />
                </a>
                <div className="w-10 h-10 rounded-md border border-neutral-300/60 bg-white flex items-center justify-center text-neutral-600 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-premium overflow-hidden mb-4 relative">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-1 leading-tight">{m.name}</h3>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">{m.role}</p>
              </div>

              <div 
                style={{ backgroundColor: m.circleBg }} 
                className="circle-avatar-bg z-0 transition-transform duration-500 ease-out absolute rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. VALUES SECTION */}
      <section className="py-20 md:py-28 px-6 bg-[#f9f9f9] rounded-b-[40px] md:rounded-b-[64px] max-w-[1256px] mx-auto w-full border border-neutral-200/50">
        <div className="max-w-[940px] mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-[38px] font-bold text-navy mb-4">
            What guides every step we take
          </h2>
          <p className="text-[15px] text-neutral-600 leading-relaxed max-w-[700px] mx-auto">
            Lorem ipsum dolor sit amet consectetur amet arcu proin nulla posuere ac suspendisse a diam neque sapien gravida fermentum ullamcorper ultrices in non tellus commodo donec.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-[1100px] mx-auto">
          {coreValues.map((v, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <img src={v.icon} alt={v.name} className="w-20 h-20 object-contain mb-6" />
              <h3 className="text-xl font-bold text-navy mb-2 leading-tight">{v.name}</h3>
              <p className="text-[14px] text-neutral-600 leading-relaxed max-w-[280px]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. OPEN POSITIONS SECTION */}
      <section id="open-positions" className="py-24 px-6 max-w-[1256px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <h2 className="text-3xl md:text-[36px] font-bold text-navy mb-4 leading-tight">
              Open positions
            </h2>
            <p className="text-[15px] text-neutral-600 mb-8 leading-relaxed max-w-[340px]">
              Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor.
            </p>
            <div>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-[14px] border border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-300"
              >
                Browse all positions
              </a>
            </div>
          </div>

          {/* Right Postings List */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6">
              {openPositions.map((pos, idx) => (
                <div 
                  key={idx}
                  className="bg-[#f9f9f9] border border-neutral-200/40 p-8 rounded-custom-md hover:shadow-premium hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-[20px] font-bold text-navy transition-colors duration-200 group-hover:text-brand-orange leading-tight">
                      {pos.title}
                    </h3>
                    <div className="w-10 h-10 rounded-md border border-neutral-300/60 bg-white flex items-center justify-center text-neutral-600 group-hover:bg-navy group-hover:text-white transition-colors duration-300 shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <p className="text-[14px] text-neutral-600 mb-6 leading-relaxed">
                    {pos.desc}
                  </p>

                  <div className="border-t border-neutral-200/50 pt-4 flex gap-4 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                    <span>{pos.department}</span>
                    <span>/</span>
                    <span>{pos.location}</span>
                    <span>/</span>
                    <span>{pos.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOLLOW OUR JOURNEY SECTION */}
      <section className="py-20 md:py-24 px-6 border-t border-neutral-200/50 bg-white overflow-hidden">
        <div className="max-w-[1256px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Social Links Collage */}
          <div className="lg:col-span-6 flex justify-center items-center w-full max-w-[648px] mx-auto relative min-h-[220px] sm:min-h-[280px]">
            {/* Collage Background Graphic */}
            <img 
              src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689e63b8e9133d008e12f28d_social-media-links-bg-digigrowth-webflow-template.png" 
              alt="Collage background pattern" 
              className="w-[78%] max-w-[500px] h-auto object-contain select-none"
            />
            {/* Floating Social Cards inside row */}
            <div className="absolute inset-0 flex justify-center items-center gap-2 sm:gap-4 px-4">
              <a 
                href="https://facebook.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-[22%] max-w-[130px] bg-white/80 border border-white rounded-custom-sm p-1.5 shadow-badge-orange backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 select-none -rotate-6 hover:rotate-0"
              >
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689a334ac29ac2a52fe746db_facebook-link-large-digigrowth-webflow-template.jpg" 
                  alt="Facebook Link" 
                  className="rounded-custom-sm w-full h-auto shadow-sm"
                />
              </a>
              <a 
                href="https://x.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-[22%] max-w-[130px] bg-white/80 border border-white rounded-custom-sm p-1.5 shadow-badge-pink backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 select-none rotate-3 hover:rotate-0"
              >
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689a334ade87200194f54c97_x-link-large-digigrowth-webflow-template.jpg" 
                  alt="X Link" 
                  className="rounded-custom-sm w-full h-auto shadow-sm"
                />
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-[22%] max-w-[130px] bg-white/80 border border-white rounded-custom-sm p-1.5 shadow-badge-orange backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 select-none -rotate-3 hover:rotate-0"
              >
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689a334a90393d561982e7ae_linkedin-link-large-digigrowth-webflow-template.jpg" 
                  alt="LinkedIn Link" 
                  className="rounded-custom-sm w-full h-auto shadow-sm"
                />
              </a>
              <a 
                href="https://tiktok.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-[22%] max-w-[130px] bg-white/80 border border-white rounded-custom-sm p-1.5 shadow-badge-pink backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 select-none rotate-6 hover:rotate-0"
              >
                <img 
                  src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689a334a25afef7f0cfcd650_tiktok-link-large-digigrowth-webflow-template.jpg" 
                  alt="TikTok Link" 
                  className="rounded-custom-sm w-full h-auto shadow-sm"
                />
              </a>
            </div>
          </div>

          {/* Right Follow Us Content */}
          <div className="lg:col-span-6 text-center lg:text-left max-w-[500px]">
            <h2 className="text-3xl md:text-[38px] font-bold text-navy mb-4 leading-tight">
              Follow our journey on social media
            </h2>
            <p className="text-[15px] text-neutral-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor.
            </p>
          </div>
        </div>
      </section>

      {/* 9. LIGHTBOX MODAL PORTAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/85 backdrop-blur-md p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative max-w-4xl w-full bg-black rounded-custom-md overflow-hidden aspect-video shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe 
                src="https://www.youtube.com/embed/FvOZsJVpYZg?autoplay=1" 
                title="Digigrowth Marketing Agency Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
