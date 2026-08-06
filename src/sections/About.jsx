import React, { useRef } from 'react'
import { Lightbulb, TrendingUp } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Child component to handle individual word colors and motion based on scroll progress
const ScrollWord = ({ text, progress, range }) => {
  const textColor = useTransform(progress, range, ["#a3a3a3", "#19213d"])
  const y = useTransform(progress, range, [6, 0])
  const opacity = useTransform(progress, range, [0.5, 1])

  return (
    <motion.span 
      style={{ color: textColor, y, opacity }} 
      className="inline-block mr-1.5 md:mr-2"
    >
      {text}
    </motion.span>
  )
}

// Child component to handle individual icon animations based on scroll progress
const ScrollIcon = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.5, 1])
  const scale = useTransform(progress, range, [0.9, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <motion.span 
      style={{ opacity, scale, y }} 
      className="inline-block"
    >
      {children}
    </motion.span>
  )
}

export default function About() {
  const containerRef = useRef(null)
  
  // Track scroll progress of the container
  // Start animating when top of container reaches the viewport center
  // Complete animation when bottom of container reaches the viewport center
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Tokenize the paragraph to allow word-by-word and icon animation
  const tokens = [
    { type: 'word', text: "We’re" },
    { type: 'word', text: "a" },
    { type: 'word', text: "passionate" },
    {
      type: 'icon',
      element: (
        <span key="lightbulb" className="inline-flex items-center justify-center bg-[#fef9c3] text-[#ca8a04] rounded-full p-2 mx-1.5 -translate-y-0.5 shadow-[0_8px_24px_rgba(202,138,4,0.15)] shrink-0">
          <Lightbulb className="w-4 h-4 md:w-5 md:h-5 fill-[#ca8a04]/10" />
        </span>
      )
    },
    { type: 'word', text: "marketing" },
    { type: 'word', text: "agency" },
    { type: 'word', text: "helping" },
    { type: 'word', text: "brands" },
    { type: 'word', text: "find" },
    { type: 'word', text: "their" },
    { type: 'word', text: "voice," },
    { type: 'word', text: "their" },
    { type: 'word', text: "audience," },
    { type: 'word', text: "and" },
    { type: 'word', text: "their" },
    { type: 'word', text: "growth." },
    { type: 'word', text: "Every" },
    { type: 'word', text: "business" },
    { type: 'word', text: "has" },
    { type: 'word', text: "a" },
    { type: 'word', text: "story" },
    {
      type: 'icon',
      element: (
        <span key="trending" className="inline-flex items-center">
          <span className="inline-flex items-center justify-center bg-[#dcfce7] text-[#16a34a] rounded-full p-2 mx-1.5 -translate-y-0.5 shadow-[0_8px_24px_rgba(22,163,74,0.15)] shrink-0">
            <TrendingUp className="w-4 h-4 md:w-7 md:h-7 fill-[#16a34a]/10" />
          </span>
          <span className="text-2xl md:text-3xl lg:text-[36px] font-semibold">.</span>
        </span>
      )
    },
    { type: 'word', text: "The" },
    { type: 'word', text: "right" },
    { type: 'word', text: "people" },
    { type: 'word', text: "just" },
    { type: 'word', text: "need" },
    { type: 'word', text: "to" },
    { type: 'word', text: "hear" },
    { type: 'word', text: "it," },
    { type: 'word', text: "and" },
    { type: 'word', text: "we’re" },
    { type: 'word', text: "here" },
    { type: 'word', text: "to" },
    { type: 'word', text: "turn" },
    { type: 'word', text: "that" },
    { type: 'word', text: "story" },
    { type: 'word', text: "into" },
    { type: 'word', text: "strategy," },
    { type: 'word', text: "creativity," },
    { type: 'word', text: "and" },
    { type: 'word', text: "campaigns" },
    { type: 'word', text: "that" },
    { type: 'word', text: "genuinely" },
    { type: 'word', text: "connect" },
    { type: 'word', text: "with" },
    { type: 'word', text: "the" },
    { type: 'word', text: "people" },
    { type: 'word', text: "who" },
    { type: 'word', text: "matter" },
    { type: 'word', text: "most" },
    { type: 'word', text: "to" },
    { type: 'word', text: "you." }
  ]

  const totalTokens = tokens.length
  const step = 1 / totalTokens

  return (
    <section ref={containerRef} className="bg-[#f2f3f4] py-24 md:py-24 px-6 rounded-[48px] overflow-hidden">
      <div className="max-w-[880px] mx-auto text-center">
        <div className="text-2xl md:text-3xl lg:text-[36px] font-semibold leading-relaxed tracking-tight flex flex-wrap justify-center items-center">
          {tokens.map((token, idx) => {
            const start = idx * step
            const end = Math.min(start + step * 5, 1) // Overlap steps for smoother text color transition
            
            if (token.type === 'word') {
              return (
                <ScrollWord 
                  key={idx}
                  text={token.text}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              )
            } else {
              return (
                <ScrollIcon
                  key={idx}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {token.element}
                </ScrollIcon>
              )
            }
          })}
        </div>
      </div>
    </section>
  )
}



