import React from 'react'
import { FaGoogle, FaStripe, FaSlack, FaSpotify, FaMicrosoft } from 'react-icons/fa'
import { SiAirtable } from 'react-icons/si'

const partners = [
  { name: 'Google', icon: FaGoogle },
  { name: 'Stripe', icon: FaStripe },
  { name: 'Slack', icon: FaSlack },
  { name: 'Spotify', icon: FaSpotify },
  { name: 'Airtable', icon: SiAirtable },
  { name: 'Microsoft', icon: FaMicrosoft }
]

export default function TrustedCompanies() {
  return (
    <section className="bg-neutral-200 py-12 border-y border-neutral-300/60 overflow-hidden w-full">
      <div className="max-w-[1256px] mx-auto px-6 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
          Trusted by next-generation industry giants
        </p>
      </div>
      <div className="flex overflow-hidden relative w-full">
        {/* Infinite Scrolling Row */}
        <div className="marquee-scroll flex items-center space-x-16 pr-16 select-none">
          {/* Loop twice for seamless scrolling */}
          {[...partners, ...partners, ...partners].map((p, idx) => (
            <div 
              key={idx} 
              className="flex items-center space-x-3 text-neutral-500 hover:text-navy transition-colors duration-300"
            >
              <p.icon className="w-7 h-7" />
              <span className="text-lg font-semibold tracking-tight">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
