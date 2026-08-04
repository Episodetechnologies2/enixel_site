import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    id: 1,
    quote: "“A game-changing agency. Their strategies and creative execution drove our brand's success”",
    author: "Sandy Houston",
    role: "VP of Development at Linkora",
    avatar: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c53699847a8000d787428_sandy-houston-avatar-digigrowth-webflow-template.png"
  },
  {
    id: 2,
    quote: "“Exceeded our expectations with powerful brand strategies. Impressive creativity and top-tier execution”",
    author: "John Carter",
    role: "VP of Leads at Netspire",
    avatar: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c5369e2f8554dabf786e0_john-carter-avatar-digigrowth-webflow-template.png"
  },
  {
    id: 3,
    quote: "“They elevated our brand beyond expectations. Smart strategies with flawless creative execution”",
    author: "Sophie Moore",
    role: "VP of Marketing at Converra",
    avatar: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c536c8aaa2502ec6a42a6_sophie-moore-avatar-digigrowth-webflow-template.png"
  },
  {
    id: 4,
    quote: "“Our brand's growth was fueled by their exceptional strategies and flawless creative execution”",
    author: "Matt Cannon",
    role: "VP of Design at Bridgr",
    avatar: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c53699847a8000d787413_matt-cannon-avatar-digigrowth-webflow-template.png"
  },
  {
    id: 5,
    quote: "“A true creative force. Their innovative strategies and execution revolutionized our brand presence”",
    author: "Lilly Woods",
    role: "VP of Product at Vireon",
    avatar: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c53699a434183edad1028_lilly-woods-avatar-digigrowth-webflow-template.png"
  }
]

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(2) // Default to Sophie (index 2)
  const activeReview = reviews[activeIdx]

  return (
    <section className="py-24 px-6 bg-white w-full flex flex-col items-center justify-center">
      <div className="max-w-[850px] w-full mx-auto flex flex-col items-center">
        
        {/* QUOTE DISPLAY AREA */}
        <div className="min-h-[260px] md:min-h-[220px] flex items-center justify-center w-full mb-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center w-full"
            >
              <blockquote className="text-2xl md:text-3xl lg:text-[34px] font-semibold text-neutral-950 leading-snug tracking-tight mb-8 max-w-[800px] text-center">
                {activeReview.quote}
              </blockquote>
              <div className="text-base font-bold text-neutral-900 tracking-tight">
                {activeReview.author}
              </div>
              <div className="text-[14px] font-medium text-neutral-500 mt-1">
                {activeReview.role}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AVATAR TABS ROW */}
        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          {reviews.map((rev, idx) => {
            const isActive = activeIdx === idx
            return (
              <button 
                key={rev.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                  isActive 
                    ? 'w-16 h-16 md:w-20 md:h-20 bg-[#ff7c8f] scale-110 shadow-premium p-1.5' 
                    : 'w-11 h-11 md:w-14 md:h-14 bg-neutral-100 hover:bg-neutral-200/60 scale-90 opacity-60 hover:opacity-100 p-1'
                }`}
              >
                <img 
                  src={rev.avatar} 
                  alt={`${rev.author} Avatar`} 
                  className="w-full h-full rounded-full object-contain"
                />
              </button>
            )
          })}
        </div>

      </div>
    </section>
  )
}
