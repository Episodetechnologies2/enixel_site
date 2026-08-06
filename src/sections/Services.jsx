import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const services = [
  {
    title: "SEO / GEO / AEO",
    description:
      "Boost your visibility across traditional search engines, AI-generated results, and answer engines with strategies designed for how people search today.",
    items: [
      "SEO Audits & Strategy",
      "GEO & AEO Optimization",
      "Keyword Research"
    ],
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f64fbe7acb5c606d5448f_social-media-advertising-card-image-digigrowth-webflow-template.png",
    gradient: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a3677c591e6558d0a8dc5e_social-media-advertising-card-image-gradient-digigrowth-webflow-template.png",
    check: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83cd39b500e1d9872058_pink-check-digigrowth-webflow-template.svg"
  },
  {
    title: "Digital Marketing",
    description:
      "Build a stronger digital presence across every channel with data-driven marketing strategies that increase brand awareness and drive measurable business growth.",
    items: [
      "Brand Awareness Campaigns",
      "Multi-Channel Execution",
      "Performance Tracking & Reporting"
    ],
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f681fb5ba1977065f1709_seo-optimization-card-image-digigrowth-webflow-template.png",
    gradient: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a3677cd1fd053362f265da_seo-optimization-card-image-gradient-digigrowth-webflow-template.png",
    check: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83ce821634441d5cf397_orange-check-digigrowth-webflow-template.svg"
  },
  {
    title: "Content Management",
    description:
      "Create and manage consistent, high-quality content that strengthens your brand, engages your audience, and supports every stage of the customer journey.",
    items: [
      "Website Content Management",
      "Content Planning & Publishing",
      "Brand Messaging & Copywriting"
    ],
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f64fb49c5e52c54530752_advanced-analytics-card-image-digigrowth-webflow-template.png",
    gradient: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a367fc222bd7047524ab88_advanced-analytics-card-image-gradient-digigrowth-webflow-template.png",
    check: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83cd39b500e1d9872058_pink-check-digigrowth-webflow-template.svg"
  },
  {
   title: "Social Media Management",
    description:
      "Maintain a professional and engaging social media presence through strategic planning, optimized profiles, and meaningful audience interactions.",
    items: [
      "Content Calendar Planning",
      "Profile Setup & Optimization",
      "Community Engagement"
    ],
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f64fbd6d3427e4b201249_funnel-optimization-card-image-digigrowth-webflow-template.png",
    gradient: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a3677ca9fdef94afdb8e2d_funnel-optimization-card-image-gradient-digigrowth-webflow-template.png",
    check: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83ce821634441d5cf397_orange-check-digigrowth-webflow-template.svg"
  },
  {
    title: "Social Media Marketing",
    description:
      "Accelerate engagement and business growth with targeted social campaigns that connect with the right audience and convert attention into results.",
    items: [
      "Campaign Strategy",
      "Audience Targeting",
      "Engagement & Growth Strategy"
    ],
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f64fb725050393dd4650f_paid-advertising-card-image-digigrowth-webflow-template.png",
    gradient: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a3677c8d27b59ea5e0d6f1_paid-advertising-card-image-gradient-digigrowth-webflow-template.png",
    check: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83cd39b500e1d9872058_pink-check-digigrowth-webflow-template.svg"
  },
  {
    title: "Paid Advertising",
    description:
      "Launch and optimize high-performing paid advertising campaigns that maximize visibility, generate qualified leads, and deliver measurable ROI.",
    items: [
      "PPC / SEM",
      "Meta & Google Ads",
      "Ads A/B Testing"
    ],
    image: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/689f64fbbe47a7bedbc8aded_content-marketing-card-image-digigrowth-webflow-template.png",
    gradient: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68a3686489662b8e52c88dff_content-marketing-card-image-gradient-digigrowth-webflow-template.png",
    check: "https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/684c83ce821634441d5cf397_orange-check-digigrowth-webflow-template.svg"
  }
]

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section className="py-24 px-6 bg-white max-w-[1256px] mx-auto w-full">
      {/* Title Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-[40px] font-bold text-navy mb-4 tracking-tight"
        >
          Powering Your Digital Growth Journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-neutral-500 text-base md:text-lg max-w-[550px] mx-auto leading-relaxed"
        >
          From strategy to execution, we help businesses build a strong online presence and achieve sustainable growth.
        </motion.p>
      </div>

      {/* Services Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group flex flex-col h-full bg-neutral-100 rounded-custom-md overflow-hidden shadow-sm hover:shadow-premium border border-neutral-200/50 hover:border-brand-orange/40 transition-all duration-300 cursor-pointer"
          >
            {/* CARD IMAGE HEADER */}
            <div className="relative overflow-hidden aspect-[4/3] bg-neutral-300 w-full">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <img 
                src={service.gradient} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 pointer-events-none"
              />
            </div>

            {/* CARD BODY */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-navy mb-3 tracking-tight group-hover:text-brand-orange transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-[14px] md:text-[15px] text-neutral-600 mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>
              
              {/* Checkmark List */}
              <div className="space-y-3.5 pt-4 border-t border-neutral-200">
                {service.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start space-x-3">
                    <img 
                      src={service.check} 
                      alt="List icon checkmark" 
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-[14px] font-semibold text-navy leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button talk Row */}
      <div className="flex justify-center mt-12">
        <Link 
          to="/contact" 
          className="relative inline-flex items-center justify-center overflow-hidden px-10 py-4.5 rounded-full font-semibold text-[16px] text-white bg-navy border border-navy hover:text-navy group transition-all duration-300 shadow-premium"
        >
          <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-[-1] bg-white"></span>
          Let's talk
        </Link>
      </div>
    </section>
  )
}
