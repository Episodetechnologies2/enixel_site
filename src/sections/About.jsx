import React, { useRef } from 'react'
import { Megaphone, Calendar } from 'lucide-react'
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

export default function About() {
  const containerRef = useRef(null)
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 45%"]
  })

  // Tokenize the paragraph to allow word-by-word color animation
  const tokens = [
    { type: 'word', text: "We’re" },
    { type: 'word', text: "a" },
    { type: 'word', text: "laid-back" },
    {
      type: 'icon',
      element: (
        <span key="megaphone" className="inline-flex items-center justify-center bg-brand-pink-light text-sys-red rounded-full p-2 mx-1.5 -translate-y-0.5 shadow-badge-pink shrink-0">
          <Megaphone className="w-4 h-4 md:w-5 md:h-5 fill-sys-red/10" />
        </span>
      )
    },
    { type: 'word', text: "marketing" },
    { type: 'word', text: "agency" },
    { type: 'word', text: "helping" },
    { type: 'word', text: "brands" },
    { type: 'word', text: "grow" },
    { type: 'word', text: "with" },
    { type: 'word', text: "heart," },
    { type: 'word', text: "creativity," },
    { type: 'word', text: "and" },
    { type: 'word', text: "real" },
    { type: 'word', text: "strategy." },
    { type: 'word', text: "This" },
    { type: 'word', text: "year," },
    { type: 'word', text: "we’re" },
    { type: 'word', text: "turning" },
    { type: 'word', text: "18" },
    {
      type: 'icon',
      element: (
        <span key="calendar" className="inline-flex items-center justify-center bg-brand-orange-light text-brand-orange rounded-full p-2 mx-1.5 -translate-y-0.5 shadow-badge-orange shrink-0">
          <Calendar className="w-4 h-4 md:w-5 md:h-5 fill-brand-orange/10" />
        </span>
      )
    },
    { type: 'word', text: "—" },
    { type: 'word', text: "and" },
    { type: 'word', text: "we’re" },
    { type: 'word', text: "celebrating" },
    { type: 'word', text: "nearly" },
    { type: 'word', text: "two" },
    { type: 'word', text: "decades" },
    { type: 'word', text: "of" },
    { type: 'word', text: "meaningful" },
    { type: 'word', text: "stories," },
    { type: 'word', text: "strong" },
    { type: 'word', text: "partnerships," },
    { type: 'word', text: "and" },
    { type: 'word', text: "campaigns" },
    { type: 'word', text: "that" },
    { type: 'word', text: "truly" },
    { type: 'word', text: "connect." }
  ]

  // Filter words to calculate range steps
  const words = tokens.filter(t => t.type === 'word')
  const totalWords = words.length
  const step = 1 / totalWords

  let wordCounter = 0

  return (
    <section ref={containerRef} className="bg-[#f2f3f4] py-24 md:py-24 px-6 rounded-[48px] overflow-hidden">
      <div className="max-w-[880px] mx-auto text-center">
        <div className="text-2xl md:text-3xl lg:text-[36px] font-semibold leading-relaxed tracking-tight flex flex-wrap justify-center items-center">
          {tokens.map((token, idx) => {
            if (token.type === 'word') {
              const currentIdx = wordCounter
              wordCounter++
              const start = currentIdx * step
              const end = Math.min(start + step * 5, 1) // Overlap steps for smoother text color transition
              return (
                <ScrollWord 
                  key={idx}
                  text={token.text}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              )
            } else {
              return token.element
            }
          })}
        </div>
      </div>
    </section>
  )
}


