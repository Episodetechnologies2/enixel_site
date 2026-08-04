import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import StatCounter from '../components/StatCounter'

const cases = [
  {
    id: 1,
    title: "How Converra grew course purchase conversions by 25% in 30 days",
    description: "Eget ipsum et tortor at vulputate ac quis arcu fermentum suspendisse in congue non habitant rhoncus.",
    statValue: 25,
    statLabel: "In conversions",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c647f91ebab16e9ae74c5_how-converra-grew-course-conversions-25-digigrowth-webflow-template.jpg"
  },
  {
    id: 2,
    title: "How we boosted Syncell’s app installs by 24% in 30 days",
    description: "Eget ipsum et tortor at vulputate ac quis arcu fermentum suspendisse in congue non habitant rhoncus.",
    statValue: 24,
    statLabel: "Increase in app installs",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c64344e5263b046b6cfdd_how-we-boosted-syncell-app-installs-24-digigrowth-webflow-template.jpg"
  },
  {
    id: 3,
    title: "How we helped Socium to increase their organic SEO traffic by 85%",
    description: "Eget ipsum et tortor at vulputate ac quis arcu fermentum suspendisse in congue non habitant rhoncus.",
    statValue: 85,
    statLabel: "Increase in organic traffic",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f322/684c63eb2a2ae1c60b9a4832_how-socium-increased-organic-seo-traffic-85-digigrowth-webflow-template.jpg"
  }
]

export default function CaseStudies() {
  const [currentIdx, setCurrentIdx] = useState(0)

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % cases.length)
  }

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + cases.length) % cases.length)
  }

  return (
    <section className="py-24 px-6 bg-neutral-100 w-full">
      <div className="max-w-[1000px] mx-auto">
        
        {/* HEADER AREA */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-navy mb-4 tracking-tight">
            Our work speaks louder
          </h2>
          <p className="text-neutral-500 text-[15px] md:text-base max-w-[470px] leading-relaxed mb-8">
            Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor nulla donec et dui at posuere.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="relative inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-semibold text-[15px] text-white bg-navy border border-navy hover:text-white group transition-all duration-300 shadow-premium"
            >
              <span className="absolute inset-0 w-full h-full scale-x-0   origin-left z-[-1] bg-white"></span>
              Let's talk
            </Link>
            <a 
              href="#portfolio" 
              className="relative inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-semibold text-[15px] text-navy bg-white border border-neutral-200 hover:text-navy group transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full scale-x-0   origin-left z-[-1] bg-navy"></span>
              Browse all cases
            </a>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative overflow-visible min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="bg-white rounded-custom-md border border-neutral-200/50 p-8 md:p-12 shadow-sm hover:shadow-premium transition-shadow duration-300"
            >
              {/* Card Header Link info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-navy max-w-[600px] leading-tight tracking-tight">
                  {cases[currentIdx].title}
                </h3>
                <a 
                  href="#case" 
                  className="flex items-center space-x-1 text-brand-orange hover:text-brand-orange-light font-bold text-sm tracking-tight transition-colors duration-250 flex-shrink-0"
                >
                  <span>Read case study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Card Main Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual stats info left */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-12">
                  <p className="text-neutral-500 text-[15px] leading-relaxed">
                    {cases[currentIdx].description}
                  </p>
                  <div>
                    <div className="text-4xl md:text-5xl lg:text-[64px] font-bold text-navy tracking-tight leading-none mb-1 flex items-baseline">
                      <StatCounter value={cases[currentIdx].statValue} suffix="%" />
                    </div>
                    <p className="text-[15px] font-semibold text-neutral-500 uppercase tracking-wider">
                      {cases[currentIdx].statLabel}
                    </p>
                  </div>
                </div>

                {/* Main image visual right */}
                <div className="lg:col-span-8 aspect-[16/10] bg-neutral-100 rounded-custom-sm overflow-hidden border border-neutral-200/50 shadow-inner">
                  <img 
                    src={cases[currentIdx].image} 
                    alt={cases[currentIdx].title} 
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Left Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white hover:bg-navy hover:text-white border border-neutral-200 text-navy rounded-full p-4 shadow-premium cursor-pointer transition-all duration-300 hidden md:block"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Slider Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white hover:bg-navy hover:text-white border border-neutral-200 text-navy rounded-full p-4 shadow-premium cursor-pointer transition-all duration-300 hidden md:block"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  )
}
