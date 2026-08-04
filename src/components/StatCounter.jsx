import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function StatCounter({ value, decimals = 0, suffix = '' }) {
  const counterRef = useRef(null)

  useEffect(() => {
    const el = counterRef.current
    if (!el) return

    const targetVal = parseFloat(value) || 0

    // GSAP ScrollTrigger timeline animation
    const anim = gsap.fromTo(el, 
      { textContent: 0 }, 
      { 
        textContent: targetVal, 
        duration: 2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: function () {
          const raw = parseFloat(el.textContent) || 0
          el.textContent = raw.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          })
        }
      }
    )

    // Cleanup animation and triggers on unmount
    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill()
      anim.kill()
    }
  }, [value, decimals])

  return (
    <span className="inline-flex items-center">
      <span ref={counterRef} className="count-up-number-animation tabular-nums">0</span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}
