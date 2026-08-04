import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[55vh] lg:min-h-[65vh] flex items-center justify-start overflow-hidden bg-gradient-to-br from-[#ffe7d6] via-[#ffa17c] to-[#ff5d57] rounded-b-[40px] md:rounded-b-[64px] pt-28  lg:pb-0 px-6">
      
      <div className="max-w-[1256px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* HERO CARD LEFT */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 bg-white p-6 sm:p-10 md:p-14 rounded-custom-lg shadow-premium max-w-[420px]"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-[34px] font-semibold leading-tight text-neutral-950 mb-2 tracking-tight text-balance"
          >
            Your new dedicated growth team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[14px] md:text-md text-neutral-600 mb-8 max-w-[500px]"
          >
            Lorem ipsum dolor sit amet consectetur neque blandit sit iaculis rhoncus in ac volutpat a tortor nulla donec.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[15px] text-white bg-[#090909] hover:bg-neutral-800 transition-colors duration-300 shadow-premium"
            >
              Let's talk
            </Link>
          </motion.div>
        </motion.div>

        {/* HERO IMAGE RIGHT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-6 flex justify-center lg:justify-end lg:self-end lg:translate-y-10 lg:translate-x-54"
        >
          <img 
            src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68928ba1e9cf542c89273cb6_home-v1-hero-bg-image-digigrowth-webflow-template.png" 
            alt="Rebuilt Growth Team hero overlay graphics" 
            className="w-full max-w-[500px] lg:max-w-none lg:w-[850px] object-contain drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  )
}
