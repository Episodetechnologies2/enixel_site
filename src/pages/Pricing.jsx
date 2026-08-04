import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import FAQ from '../sections/FAQ'

export default function Pricing() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  }

  const plans = [
    {
      name: "Standard",
      icon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455aa2d1ac94b31e4aed_standard-icon-digigrowth-webflow-template.svg",
      iconBg: "bg-brand-pink-light/40",
      shadowClass: "shadow-badge-pink",
      description: "Lorem ipsum dolor sit amet consectetur.",
      price: "$2,500",
      period: "/per month",
      checkIcon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83cd39b500e1d9872058_pink-check-digigrowth-webflow-template.svg",
      features: [
        "Social Media Marketing",
        "SEO Optimization",
        "Paid Advertising",
        "Normal support"
      ],
      isPopular: false,
      ctaText: "Choose plan"
    },
    {
      name: "Premium",
      icon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455ab2f27c67a9567a0d_premium-icon-digigrowth-webflow-template.svg",
      iconBg: "bg-brand-orange-light/40",
      shadowClass: "shadow-badge-orange",
      description: "Lorem ipsum dolor sit amet consectetur.",
      price: "$5,500",
      period: "/per month",
      checkIcon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83ce821634441d5cf397_orange-check-digigrowth-webflow-template.svg",
      features: [
        "All in Standard Plan",
        "Content Marketing",
        "Advanced Analytics",
        "Premium support"
      ],
      isPopular: true,
      ctaText: "Choose plan"
    },
    {
      name: "Deluxe",
      icon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c455a17d36e0ee916ab6c_deluxe-icon-digigrowth-webflow-template.svg",
      iconBg: "bg-brand-pink-light/40",
      shadowClass: "shadow-badge-pink",
      description: "Lorem ipsum dolor sit amet consectetur.",
      price: "$10,500",
      period: "/per month",
      checkIcon: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83cd39b500e1d9872058_pink-check-digigrowth-webflow-template.svg",
      features: [
        "All in Premium Plan",
        "Conversion Optimization",
        "Custom Growth Marketing Plan",
        "Instant Response Support"
      ],
      isPopular: false,
      ctaText: "Choose plan"
    }
  ]

  return (
    <div className="flex flex-col w-full bg-white relative">
      
      {/* HERO & CARDS SECTION */}
      <section 
        className="relative w-full overflow-hidden bg-cover bg-center rounded-b-[40px] md:rounded-b-[64px] pt-32 md:pt-44 pb-24 px-6"
        style={{ backgroundImage: `url('https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/6851b3864895901b7a749af8_soft-gradient-background-v9-digigrowth-webflow-template.jpg')` }}
      >
        {/* Background Blur Ambient Glow Behind the Grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[35%] left-[50%] -translate-x-[50%] w-[600px] h-[600px] rounded-full bg-brand-orange-light/10 blur-[120px]"></div>
        </div>

        <div className="max-w-[1256px] mx-auto w-full relative z-10">
          {/* Header Text */}
          <div className="text-center mb-16 md:mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-navy tracking-tight leading-[1.1] mb-6"
            >
              Our pricing plans
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`relative flex flex-col justify-between bg-white rounded-custom-lg p-8 sm:p-10 shadow-sm hover:shadow-premium transition-all duration-400 group overflow-visible ${
                  plan.isPopular 
                    ? 'border-2 border-brand-orange' 
                    : 'border border-neutral-200/50'
                }`}
              >
                {/* Popular Card Accent Blur */}
                {plan.isPopular && (
                  <div className="absolute -inset-[1px] -z-10 rounded-custom-lg bg-gradient-to-br from-brand-orange/20 to-transparent blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}

                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 right-8 bg-brand-orange text-white text-[12px] font-extrabold uppercase px-4 py-1.5 rounded-full shadow-badge-orange tracking-wider">
                    Best choice
                  </div>
                )}

                {/* Content Top */}
                <div>
                  {/* Icon wrapper */}
                  <div className={`w-12 h-12 rounded-custom-sm ${plan.iconBg} ${plan.shadowClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 mb-6`}>
                    <img 
                      src={plan.icon} 
                      alt={`${plan.name} Icon`} 
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-[26px] font-bold text-navy tracking-tight mb-2">
                    {plan.name}
                  </h3>

                  {/* Plan Short Description */}
                  <p className="text-neutral-500 text-[15px] mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2 pb-6 mb-8 border-b border-neutral-200/60">
                    <span className="text-[44px] font-extrabold text-navy leading-none tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-[15px] font-bold text-neutral-500">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-neutral-800">
                        <img 
                          src={plan.checkIcon} 
                          alt="Check Icon" 
                          className="w-5 h-5 mt-0.5 object-contain flex-shrink-0"
                        />
                        <span className="text-[15px] leading-relaxed font-semibold text-neutral-800">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  {plan.isPopular ? (
                    <a 
                      href="#contact"
                      className="relative w-full inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-bold text-[15px] text-white bg-brand-orange border border-brand-orange hover:text-brand-orange group/btn transition-all duration-300 shadow-badge-orange cursor-pointer animate-none"
                    >
                      <span className="absolute inset-0 w-full h-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-white"></span>
                      {plan.ctaText}
                    </a>
                  ) : (
                    <a 
                      href="#contact"
                      className="relative w-full inline-flex items-center justify-center overflow-hidden px-8 py-3.5 rounded-full font-bold text-[15px] text-navy bg-white border border-neutral-200 hover:text-white hover:border-navy group/btn transition-all duration-300 shadow-sm hover:shadow-premium cursor-pointer animate-none"
                    >
                      <span className="absolute inset-0 w-full h-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-navy"></span>
                      {plan.ctaText}
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQ />

    </div>
  )
}
