import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-10 mx-auto w-full">
      <div className="bg-gradient-to-br from-[#ffe7d6] via-[#ffa17c] to-[#ff5d57] rounded-[40px] md:rounded-[48px] relative overflow-hidden pt-16 pb-12 lg:pb-0 px-8 md:px-16 lg:px-20 min-h-[480px] lg:min-h-[500px] flex items-center justify-between shadow-premium">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          
          {/* FLOATING 3D GRAPHIC ASSET (LEFT ON DESKTOP, SECOND ON MOBILE) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start lg:self-end lg:translate-y-12 lg:-translate-x-12 order-2 lg:order-1">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full max-w-[850px]"
            >
              <img 
                src="https://cdn.prod.website-files.com/684b4517ecc745a3c5d4f2ea/68504cbc75507a21fb9c3ef6_3d-abstract-bar-chart-digigrowth-webflow-template.png" 
                alt="3D Abstract Bar Chart illustration" 
                className="w-full object-contain filter drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* TEXT CONTENT CARD (RIGHT ON DESKTOP, FIRST ON MOBILE) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white p-6 sm:p-10 md:p-14 rounded-custom-lg shadow-premium max-w-[460px] text-neutral-950 flex flex-col items-start text-left"
            >
              <h2 className="text-neutral-950 text-2xl md:text-3xl lg:text-[34px] font-semibold leading-tight mb-4 tracking-tight">
                Need help on a project? Get in touch today
              </h2>
              <p className="text-neutral-600 text-[14px] md:text-md leading-relaxed mb-8 max-w-[400px]">
                Lorem ipsum dolor sit amet consectetur. Neque blandit sit iaculis rhoncus in ac volutpat a tortor nulla donec et dui at.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[15px] text-white bg-[#090909] hover:bg-neutral-800 transition-colors duration-300 shadow-premium"
              >
                Let's talk
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
