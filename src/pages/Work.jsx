import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Sparkles, Filter, Award, Target, TrendingUp } from 'lucide-react'

// Case studies data for digital marketing projects
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
      strategy: 'We created the "Food Heritage Chronicles" story series on Instagram & TikTok, showcasing slow-cooking processes and historical spice recipes. Simultaneously, we deployed hyper-targeted meta-lead ads to dinner-goers within a 15km radius of Coimbatore.',
      results: 'Ranked top 3 for "best restaurant Coimbatore" on Google Maps, grew Instagram followers from 0 to 18k in 4 weeks, and generated a sustained 45% increase in weekend reservations.',
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
      strategy: 'We executed a comprehensive keyword cluster campaign targeting complex enterprise intelligence searches. We launched a weekly data engineering publication on their site and automated internal linking networks.',
      results: 'Secured #1 positions for 18 high-intent commercial terms, increasing search click-throughs by 320% and generating over 800 premium organic signups.',
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
      strategy: 'We built a high-speed video production system testing 40+ ad hooks weekly. Using Meta’s Advantage+ app campaigns and TikTok smart bidding, we optimized spend toward high-engagement users.',
      results: 'Aired viral video ad clips with over 6.5M total views, generated 120,000 active app signups in 60 days, and decreased Average CPI by 38% below benchmark.',
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
      strategy: 'We positioned Zircle as a premium, ad-free photography sanctuary. We ran a gated waitlist invite campaign and seeded early access to 50 key visual storytellers who posted exclusive teaser content.',
      results: 'Gained 15,000 waitlist signups in 14 days, generating 2.4 million views on launch hashtags and making Zircle a trending design topic on Twitter.',
      testimonial: {
        text: 'Enixel understood our vision for a clean visual community. Their branding strategy made Zircle feel premium and exclusive from day one.',
        author: 'David Wu',
        role: 'Head of Product, Zircle'
      }
    }
  }
]

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [projectsList, setProjectsList] = useState([])
  const [categoriesList, setCategoriesList] = useState(['All'])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Load projects and categories from API with static fallback
  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const [projRes, catRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/categories')
        ]);
        if (!projRes.ok || !catRes.ok) throw new Error('API request failed');

        const projData = await projRes.json();
        const catData = await catRes.json();

        if (active) {
          // Hide drafts on the public Work page
          const published = projData.filter(p => p.status !== 'draft');
          setProjectsList(published);
          setCategoriesList(['All', ...catData]);
        }
      } catch (err) {
        console.warn("Failed to load CMS data, falling back to static content:", err);
        if (active) {
          setProjectsList(DEFAULT_PROJECTS);
          setCategoriesList(['All', 'SEO & Content', 'Performance Marketing', 'Social Growth', 'Branding']);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, [])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All'
    ? projectsList
    : projectsList.filter(project => project.categories && project.categories.includes(selectedCategory))

  return (
    <div className="flex flex-col w-full bg-white relative">

      {/* 1. HERO SECTION (Styled exactly like the Home page Hero) */}
      <section className="relative w-full min-h-[50vh] md:min-h-[55vh] lg:min-h-[62vh] flex items-center justify-start overflow-hidden bg-gradient-to-br from-[#ffe7d6] via-[#ffa17c] to-[#ff5d57] rounded-b-[40px] md:rounded-b-[64px] pt-28 pb-16 lg:pb-0 px-6">

        <div className="max-w-[1256px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* HERO CARD LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 bg-white p-6 sm:p-10 md:p-14 rounded-custom-lg shadow-premium max-w-[440px]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-[34px] font-semibold leading-tight text-neutral-950 mb-2 tracking-tight text-balance"
            >
              Our Work & Performance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[14px] md:text-md text-neutral-600 mb-8 max-w-[500px]"
            >
              Discover how we blend creative branding with data-backed execution to drive measurable growth.
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
                Let's work together
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

      {/* 3. CASE STUDIES GRID WITH FILTERING */}
      <section className="py-24 px-6 bg-neutral-200 w-full relative z-10">
        <div className="max-w-[1256px] mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-navy mb-4 tracking-tight">
              Our work speaks louder
            </h2>
            <p className="text-neutral-500 text-[15px] md:text-base max-w-[500px] leading-relaxed mb-8">
              Explore how we have scaled organic traffic, cut user acquisition costs, and launched premium brand narratives.
            </p>

            {/* Dynamic Filters tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 cursor-pointer border ${selectedCategory === cat
                    ? 'bg-navy border-navy text-white shadow-premium'
                    : 'bg-white border-neutral-200 text-navy hover:bg-neutral-50 hover:border-neutral-300'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-neutral-500 text-sm font-semibold">Loading projects...</p>
            </div>
          ) : (
            /* GRID OF WORKS */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-custom-md border border-neutral-200/60 p-5 shadow-sm hover:shadow-premium hover:border-brand-orange/30 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                    onClick={() => navigate(`/work/${project.id}`)}
                  >
                    <div>
                      {/* Project Image */}
                      <div className="aspect-[4/3] w-full rounded-custom-sm overflow-hidden mb-5 bg-neutral-100 border border-neutral-200/20 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />

                        {/* Stat Badge Overlay */}
                        <div className="absolute top-3 right-3 bg-navy text-white text-[12px] font-bold px-3 py-1.5 rounded-full border border-neutral-800 shadow-premium flex items-center gap-1 z-10">
                          <span className="text-brand-orange-light">{project.stat}</span>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.categories && project.categories.map((c, idx) => (
                          <span
                            key={idx}
                            className="bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-navy mb-2 tracking-tight group-hover:text-brand-orange transition-colors duration-200">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-500 text-[13px] md:text-[14px] leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* View Case Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
                      <span className="text-[11px] font-bold text-neutral-400 group-hover:text-navy transition-colors">
                        {project.statLabel} Focus
                      </span>
                      <button
                        className="flex items-center space-x-1 text-brand-orange group-hover:text-brand-orange-light font-bold text-[13px] tracking-tight transition-colors duration-200"
                      >
                        <span>Case details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

    </div>
  )
}
