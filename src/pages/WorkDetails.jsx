import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Award, ShieldAlert, Sparkles, Send } from 'lucide-react'

// Hardcoded fallback data in case CMS is not reachable
const DEFAULT_PROJECTS = [
  {
    id: 'zamindar-kitchen',
    title: 'Zamindar Kitchen',
    category: 'Social Growth',
    categories: ['Social Growth', 'Branding'],
    tagline: 'Heritage Culinary Branding',
    stat: '+45%',
    statLabel: 'Reservations',
    statDetail: 'Increase in dining bookings within 30 days',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Blending Coimbatore’s rich culinary history with hyper-local social campaigns to drive dinner table bookings.',
    details: {
      client: 'Zamindar Kitchen F&B Group',
      services: ['Brand Identity & Tone', 'Local SEO & Citations', 'Social Content Strategy', 'Influencer Outreach'],
      challenge: 'Launching a traditional heritage-themed restaurant in Coimbatore’s competitive dining landscape, while standing out to digital-savvy food enthusiasts.',
      challengeImage: '',
      strategy: 'We created the "Food Heritage Chronicles" story series on Instagram & TikTok, showcasing slow-cooking processes and historical spice recipes. Simultaneously, we deployed hyper-targeted meta-lead ads to dinner-goers within a 15km radius of Coimbatore.',
      strategyImage: '',
      results: 'Ranked top 3 for "best restaurant Coimbatore" on Google Maps, grew Instagram followers from 0 to 18k in 4 weeks, and generated a sustained 45% increase in weekend reservations.',
      resultsImage: '',
      testimonial: {
        text: 'Enixel captured the soul of our heritage kitchen and translated it into a digital experience that had lines out our door from day one.',
        author: 'Chef Anand',
        role: 'Founder, Zamindar Kitchen'
      }
    }
  },
  {
    id: 'tentellect',
    title: 'Tentellect',
    category: 'SEO & Content',
    categories: ['SEO & Content'],
    tagline: 'B2B SaaS Authority',
    stat: '+320%',
    statLabel: 'Web Traffic',
    statDetail: 'Increase in B2B organic traffic and commercial signups',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Establishing domain authority for an enterprise-tier data intelligence platform through long-tail content hubs.',
    details: {
      client: 'Tentellect Intelligence Inc.',
      services: ['Technical SEO Audits', 'Keyword Mapping & Clustering', 'High-Authority Backlink Acquisition', 'Whitepaper Content Creation'],
      challenge: 'SaaS platforms face high ad costs. Tentellect needed to build a sustainable source of enterprise-level organic signups.',
      challengeImage: '',
      strategy: 'We executed a comprehensive keyword cluster campaign targeting complex enterprise intelligence searches. We launched a weekly data engineering publication on their site and automated internal linking networks.',
      strategyImage: '',
      results: 'Secured #1 positions for 18 high-intent commercial terms, increasing search click-throughs by 320% and generating over 800 premium organic signups.',
      resultsImage: '',
      testimonial: {
        text: 'Enixel didn’t just bring us traffic; they brought us the exact decision-makers we needed to scale our enterprise tier.',
        author: 'Jey Anand',
        role: 'CTO, Tentellect'
      }
    }
  },
  {
    id: 'odaka',
    title: 'Odaka',
    category: 'Performance Marketing',
    categories: ['Performance Marketing'],
    tagline: 'Paid Ads Optimization',
    stat: '+120k',
    statLabel: 'Users Acquired',
    statDetail: 'New app installs with a 38% reduction in CPI',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    description: 'Driving downloads for a digital culture portal using dynamic video creative testing and automated bid funnels.',
    details: {
      client: 'Odaka Media Portal',
      services: ['Paid Acquisition (TikTok & YouTube)', 'Mobile App Tracking Setup', 'Creative Production', 'Ad Spend Optimization'],
      challenge: 'Capturing Gen-Z/Millennial attention to download an entertainment app and keep acquisition costs below $1.50 per install.',
      challengeImage: '',
      strategy: 'We built a high-speed video production system testing 40+ ad hooks weekly. Using Meta’s Advantage+ app campaigns and TikTok smart bidding, we optimized spend toward high-engagement users.',
      strategyImage: '',
      results: 'Aired viral video ad clips with over 6.5M total views, generated 120,000 active app signups in 60 days, and decreased Average CPI by 38% below benchmark.',
      resultsImage: '',
      testimonial: {
        text: 'Our user acquisition numbers blew past our quarterly forecasts in the first few weeks thanks to Enixel’s creative campaigns.',
        author: 'Sarah Jenkins',
        role: 'Marketing Lead, Odaka'
      }
    }
  },
  {
    id: 'zircle',
    title: 'Zircle',
    category: 'Branding',
    categories: ['Branding', 'Social Growth'],
    tagline: 'Brand Launch Campaign',
    stat: '2.4M',
    statLabel: 'Video Views',
    statDetail: 'Organic impressions generated during launch week',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
    description: 'Coordinating an invite-only waitlist launch campaign for a creator-first photography and community application.',
    details: {
      client: 'Zircle Labs',
      services: ['Brand Identity & Style Guides', 'Beta Waitlist UI Consulting', 'Micro-Influencer Seeding', 'Organic Social Launch Campaign'],
      challenge: 'Launching a social network into a market saturated by Instagram and VSCO requires building elite brand desirability.',
      challengeImage: '',
      strategy: 'We positioned Zircle as a premium, ad-free photography sanctuary. We ran a gated waitlist invite campaign and seeded early access to 50 key visual storytellers who posted exclusive teaser content.',
      strategyImage: '',
      results: 'Gained 15,000 waitlist signups in 14 days, generating 2.4 million views on launch hashtags and making Zircle a trending design topic on Twitter.',
      resultsImage: '',
      testimonial: {
        text: 'Enixel understood our vision for a clean visual community. Their branding strategy made Zircle feel premium and exclusive from day one.',
        author: 'David Wu',
        role: 'Head of Product, Zircle'
      }
    }
  }
];

export default function WorkDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Enixel`;

      const updateMetaTag = (selector, attribute, value) => {
        let element = document.querySelector(selector);
        if (element) {
          element.setAttribute(attribute, value);
        } else {
          const meta = document.createElement('meta');
          if (selector.startsWith('meta[name=')) {
            const name = selector.split('"')[1];
            meta.setAttribute('name', name);
          } else if (selector.startsWith('meta[property=')) {
            const property = selector.split('"')[1];
            meta.setAttribute('property', property);
          }
          meta.setAttribute(attribute, value);
          document.head.appendChild(meta);
        }
      };

      const descriptionText = project.description || '';
      const imageUrl = project.image 
        ? (project.image.startsWith('http') ? project.image : `${window.location.origin}${project.image}`) 
        : '';

      updateMetaTag('meta[name="description"]', 'content', descriptionText);
      updateMetaTag('meta[name="title"]', 'content', `${project.title} | Enixel`);
      updateMetaTag('meta[property="og:title"]', 'content', `${project.title} | Enixel`);
      updateMetaTag('meta[property="og:description"]', 'content', descriptionText);
      updateMetaTag('meta[property="og:image"]', 'content', imageUrl);
      updateMetaTag('meta[property="og:image:secure_url"]', 'content', imageUrl);
      updateMetaTag('meta[property="og:url"]', 'content', window.location.href);
      updateMetaTag('meta[property="twitter:title"]', 'content', `${project.title} | Enixel`);
      updateMetaTag('meta[property="twitter:description"]', 'content', descriptionText);
      updateMetaTag('meta[property="twitter:image"]', 'content', imageUrl);
      updateMetaTag('meta[property="twitter:url"]', 'content', window.location.href);
    }
  }, [project])

  useEffect(() => {
    let active = true;
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Project not found on server');
        }
        const data = await response.json();
        if (active) {
          setProject(data);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Could not fetch project from server, attempting local fallback:", err);
        const fallbackProject = DEFAULT_PROJECTS.find(p => p.id === id);
        if (active) {
          if (fallbackProject) {
            setProject(fallbackProject);
            setLoading(false);
          } else {
            setError('Project not found');
            setLoading(false);
          }
        }
      }
    }

    fetchProject();
    return () => {
      active = false;
    };
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-navy font-bold">Loading case study...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 px-6 text-center">
        <ShieldAlert className="w-16 h-16 text-brand-red mb-4" />
        <h1 className="text-2xl font-bold text-navy mb-2">Project Not Found</h1>
        <p className="text-neutral-600 mb-6">The project you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/work')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-bold rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work</span>
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col w-full bg-white relative"
    >
      {/* HEADER HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#ffe7d6] via-[#ffa17c] to-[#ff5d57] rounded-b-[40px] md:rounded-b-[64px] pt-32 pb-20 px-6">
        <div className="max-w-[1256px] mx-auto w-full relative z-10">
          
          {/* Back Navigation */}
          <button
            onClick={() => navigate('/work')}
            className="inline-flex items-center gap-2 text-navy hover:text-brand-orange font-bold text-sm mb-8 transition-colors cursor-pointer bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-neutral-200/50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header info */}
            <div className="lg:col-span-7 text-navy">
              <span className="bg-white/30 backdrop-blur-sm border border-white/20 text-navy text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.1] mb-4 tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-neutral-800/80 font-medium mb-6 max-w-[600px] leading-relaxed">
                {project.tagline}
              </p>
              
              {/* Client & Stats Metadata Bar */}
              <div className="flex flex-wrap gap-4 items-center bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/30 max-w-[550px] shadow-sm">
                <div className="pr-6 border-r border-navy/10">
                  <span className="text-[10px] uppercase font-bold text-neutral-600 block mb-0.5">Client</span>
                  <span className="font-bold text-navy text-sm md:text-base">{project.details.client}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-brand-red leading-none font-tight">{project.stat}</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-600 block leading-tight">{project.statLabel}</span>
                    <span className="text-[11px] text-neutral-700 font-medium leading-none block">{project.statDetail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Header Thumbnail */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-custom-lg overflow-hidden border border-white/30 shadow-premium bg-white/20 p-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-custom-md"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CASE STUDY DETAIL LAYOUT (Interleaved Text & Photos) */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-[1100px] mx-auto">
          
          {/* Main Case Content */}
          <div className="flex flex-col space-y-24">
            
            {/* Section 1: Challenge */}
            {project.details.challenge && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-7 flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-brand-orange"></span>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-navy">The Challenge</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-relaxed text-justify">
                    {project.details.challenge}
                  </p>
                </div>
                
                {/* Photo In-Between */}
                <div className="md:col-span-5">
                  <div className="aspect-[4/3] rounded-custom-md overflow-hidden bg-neutral-200 border border-neutral-300/40 shadow-premium group">
                    {project.details.challengeImage ? (
                      <img
                        src={project.details.challengeImage}
                        alt="Challenge representation"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400 bg-neutral-200/50">
                        <Award className="w-12 h-12 mb-2 stroke-[1.5]" />
                        <span className="text-[12px] font-semibold uppercase tracking-wider">Heritage Launch Focus</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Strategy */}
            {project.details.strategy && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center md:flex-row-reverse">
                {/* Photo In-Between */}
                <div className="md:col-span-5 md:order-last">
                  <div className="aspect-[4/3] rounded-custom-md overflow-hidden bg-neutral-200 border border-neutral-300/40 shadow-premium group">
                    {project.details.strategyImage ? (
                      <img
                        src={project.details.strategyImage}
                        alt="Strategy representation"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400 bg-neutral-200/50">
                        <Sparkles className="w-12 h-12 mb-2 stroke-[1.5]" />
                        <span className="text-[12px] font-semibold uppercase tracking-wider">Strategic Campaign Execution</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-brand-pink"></span>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-navy">Our Strategy</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-relaxed text-justify">
                    {project.details.strategy}
                  </p>
                </div>
              </div>
            )}

            {/* Middle Metadata Block: Services list */}
            {project.details.services && project.details.services.length > 0 && (
              <div className="bg-white rounded-custom-md border border-neutral-200/60 p-8 sm:p-10 shadow-sm">
                <h3 className="text-lg font-bold text-navy uppercase tracking-wider mb-6">Services Provided</h3>
                <div className="flex flex-wrap gap-3">
                  {project.details.services.map((svc, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-700 text-[13px] font-bold px-4 py-2 rounded-full border border-neutral-200/30"
                    >
                      <Check className="w-4 h-4 text-brand-orange stroke-[3]" />
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Results */}
            {project.details.results && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-7 flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-brand-orange-light"></span>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-navy">Campaign Results</h2>
                  </div>
                  <p className="text-neutral-600 text-base leading-relaxed text-justify">
                    {project.details.results}
                  </p>
                </div>

                {/* Photo In-Between */}
                <div className="md:col-span-5">
                  <div className="aspect-[4/3] rounded-custom-md overflow-hidden bg-neutral-200 border border-neutral-300/40 shadow-premium group">
                    {project.details.resultsImage ? (
                      <img
                        src={project.details.resultsImage}
                        alt="Results representation"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400 bg-neutral-200/50">
                        <Send className="w-12 h-12 mb-2 stroke-[1.5]" />
                        <span className="text-[12px] font-semibold uppercase tracking-wider">Performance Metrics & ROI</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Client Testimonial Card */}
            {project.details.testimonial && project.details.testimonial.text && (
              <div className="mt-8 bg-navy text-white rounded-custom-lg p-8 sm:p-12 relative overflow-hidden border border-neutral-800 shadow-premium">
                {/* Background Glow */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-brand-orange/10 blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-brand-pink/5 blur-3xl"></div>

                <blockquote className="relative z-10 flex flex-col h-full justify-between">
                  <span className="text-5xl font-serif text-brand-orange-light/20 leading-none block mb-2">“</span>
                  <p className="text-base sm:text-lg italic leading-relaxed text-neutral-200 mb-8 max-w-[800px]">
                    {project.details.testimonial.text}
                  </p>
                  <cite className="not-italic flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-neutral-800/80 pt-6">
                    <span className="font-bold text-brand-orange-light text-base">
                      {project.details.testimonial.author}
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">
                      {project.details.testimonial.role}
                    </span>
                  </cite>
                </blockquote>
              </div>
            )}

          </div>

          {/* Bottom Call to Action */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/work')}
              className="px-8 py-3.5 rounded-full text-[14px] font-bold text-neutral-600 hover:text-navy border border-neutral-300 bg-white hover:bg-neutral-50 transition-all duration-300 cursor-pointer shadow-sm"
            >
              Back to Work
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[14px] text-white bg-brand-orange hover:bg-brand-orange-light shadow-badge-orange transition-colors duration-300"
            >
              Discuss a similar project
            </Link>
          </div>

        </div>
      </section>
    </motion.div>
  )
}
