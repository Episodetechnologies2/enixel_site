import React from 'react'
import Hero from '../sections/Hero'
import TrustedCompanies from '../sections/TrustedCompanies'
import About from '../sections/About'
import Services from '../sections/Services'
import Workflow from '../sections/Workflow'
import CTA from '../sections/CTA'
import CaseStudies from '../sections/CaseStudies'
import Testimonials from '../sections/Testimonials'
import BlogNewsletter from '../sections/BlogNewsletter'
import FAQ from '../sections/FAQ'

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Landing */}
      <Hero />
      
      {/* 2. Core Business Services */}
      <Services />

      {/* 3. Highlighted Agency Statement */}
      <About />
      
      {/* 4. Process / Workflow Tabs */}
      <Workflow />
      
      {/* 5. Abstract CTA Banner */}
      <CTA />
      
      {/* 6. Slide Portfolio Cases */}
      <CaseStudies />
      
      {/* 7. Quote Client Reviews */}
      <Testimonials />
      
      {/* 8. Articles List & Newsletter Subscription Card */}
      <BlogNewsletter />
      
      {/* 9. FAQ Collapsible List */}
      <FAQ />
    </div>
  )
}
