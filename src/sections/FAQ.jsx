import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "How long does SEO take to show results?",
    answer: "SEO is a long-term strategy. Most businesses can see improvements within 3-6 months, depending on their competition. "
  },
  {
    question: "Do you run Google & Meta Ads?",
    answer: "Yes, we can also help with your Google & Meta Ads. We have the expertise to create and manage your campaigns to maximize your ROI."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with various industries. Whether you’re a startup, local business, restaurant, school, hospital, retail, or growing brands across all industries."
  },
  {
    question: "How do I get started?",
    answer: "Simply contact us through our website. We can discuss what you want to achieve and find out the best way to help you."
  }
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-24 px-6 bg-neutral-100 w-full">
      <div className="max-w-[846px] mx-auto">
        
        {/* Title Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-navy mb-4 tracking-tight">
            Have questions?
          </h2>
          <p className="text-neutral-500 text-[15px] md:text-base max-w-[420px] mx-auto leading-relaxed">
Here’s what most people ask before we get started.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div 
                key={idx}
                className="bg-white rounded-custom-sm border border-neutral-200/50 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300"
              >
                {/* Header click bar */}
                <button 
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6 cursor-pointer focus:outline-none select-none group"
                >
                  <h3 className="text-[17px] md:text-lg font-bold text-navy tracking-tight group-hover:text-brand-orange transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-navy text-white' : 'bg-neutral-100 text-navy group-hover:bg-neutral-200/60'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Expanding Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-[14px] md:text-[15px] text-neutral-600 leading-relaxed max-w-[650px]">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
