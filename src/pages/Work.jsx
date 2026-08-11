import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Sparkles, Filter, Award, Target, TrendingUp } from 'lucide-react'



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
        console.warn("Failed to load CMS data:", err);
        if (active) {
          setProjectsList([]);
          setCategoriesList(['All']);
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
