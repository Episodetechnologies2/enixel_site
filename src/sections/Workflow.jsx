import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    id: 1,
    badge: "Step 01",
    tabLabel: "1. Discover & Plan",
    title: "Discover & Plan",
    description: "We start by understanding your business, your audience, and what “growth” actually means for you - then build a plan around that, not a generic template.",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68504cbc22019193684a4224_make-a-plan-digigrowth-webflow-template.png",
    icon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455a5047b59f559ad81b_make-a-plan-icon-digigrowth-webflow-template.svg",
    shadowClass: "shadow-[0_8px_24px_rgba(254,86,107,0.15)] bg-brand-pink-light"
  },
  {
    id: 2,
    badge: "Step 02",
    tabLabel: "2. Execute & Optimize",
    title: "Execute & Optimize",
    description: "Once the plan’s set, we get to work. Campaigns go live, content starts publishing, and every channel is built out properly - not rushed.",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68504cbcfa5c1b2873945495_launch-and-execute-digigrowth-webflow-template.png",
    icon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455a0e4202927ac76472_launch-and-execute-icon-digigrowth-webflow-template.svg",
    shadowClass: "shadow-[0_8px_24px_rgba(251,141,82,0.15)] bg-brand-orange-light"
  },
  {
    id: 3,
    badge: "Step 03",
    tabLabel: "3. Scale Your Growth",
    title: "Scale Your Growth",
    description: "We track what’s working, cut what isn’t, and double down on the channels driving real results. Growth isn’t a one-time launch - it's ongoing. ",
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68504cbc9a8c38175cec3fe5_grow-and-scale-digigrowth-webflow-template.png",
    icon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455a52ca8b0c3839e59f_chart-icon-digigrowth-webflow-template.svg",
    shadowClass: "shadow-[0_8px_24px_rgba(254,86,107,0.15)] bg-brand-pink-light"
  }
]

export default function Workflow() {
  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const currentStep = steps[activeStepIdx]

  return (
    <section className="py-24 px-6 bg-white max-w-[1256px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: TABS MENU & INTRO */}
        <div className="lg:col-span-4 flex flex-col h-full justify-center">
          <div className="max-w-[340px] mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-navy leading-none mb-4 tracking-tight">
              How We Actually Get Things Done
            </h2>
          </div>
          <p className="text-neutral-500 text-[15px] leading-relaxed mb-10">
            Every business has different goals. That's why we focus on a clear path from first call to real results.
          </p>
          
          {/* TAB BUTTONS LIST */}
          <div className="flex flex-col space-y-4">
            {steps.map((step, idx) => (
              <button 
                key={step.id}
                onClick={() => setActiveStepIdx(idx)}
                className={`w-full p-6 text-left rounded-custom-sm border flex items-center justify-between group transition-all duration-300 ${
                  activeStepIdx === idx 
                    ? 'bg-navy text-white border-navy shadow-premium' 
                    : 'bg-neutral-100 text-navy border-neutral-200/60 hover:bg-neutral-200/50'
                }`}
              >
                <span className="text-[16px] font-bold">{step.tabLabel}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activeStepIdx === idx 
                    ? 'bg-brand-orange text-navy' 
                    : 'bg-white text-navy group-hover:bg-navy group-hover:text-white'
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE TAB CONTENT */}
        <div className="lg:col-span-8 overflow-visible h-full flex items-center">
          <div className="w-full relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full bg-neutral-100 rounded-custom-md border border-neutral-200/60 flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-premium transition-shadow duration-300"
              >
                {/* Active Image visual */}
                <div className="md:w-1/2 aspect-[4/3] md:aspect-auto bg-neutral-300 relative">
                  <img 
                    src={currentStep.image} 
                    alt={currentStep.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Description */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-8">
                    {/* Step Icon */}
                    <div className={`w-12 h-12 rounded-full p-2.5 flex items-center justify-center ${currentStep.shadowClass}`}>
                      <img 
                        src={currentStep.icon} 
                        alt="" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* Badge */}
                    <span className="bg-white text-navy font-bold text-xs px-3.5 py-1.5 rounded-full border border-neutral-200/60 uppercase tracking-widest shadow-sm">
                      {currentStep.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4 tracking-tight">
                      {currentStep.title}
                    </h3>
                    <p className="text-[15px] text-neutral-600 mb-8 leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>

                  {/* Talk Trigger Button */}
                  <div>
                    <Link 
                      to="/contact" 
                      className="relative inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-semibold text-[15px] text-white bg-navy border border-navy hover:text-navy group transition-all duration-300 shadow-premium"
                    >
                      <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-white"></span>
                      Let's talk
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
