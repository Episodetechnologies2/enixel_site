import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/About'
import Blog from './pages/Blog'
import Work from './pages/Work'
import WorkDetails from './pages/WorkDetails'
import Admin from './pages/Admin'
// import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  React.useEffect(() => {
    if (isAdmin) return;

    async function fetchSEOData() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const profile = await res.json();
          if (profile) {
            const siteTitle = `${profile.name || 'Askjey'} | ${profile.role || 'Administrator'}`;
            const siteDesc = profile.bio || '';
            const siteImage = profile.avatar 
              ? (profile.avatar.startsWith('http') ? profile.avatar : `${window.location.origin}${profile.avatar}`)
              : '';

            // Only override metadata on main static pages (not on work detail pages)
            const isMainPage = ['/', '/about', '/blog', '/work', '/contact'].includes(location.pathname);
            if (isMainPage) {
              document.title = siteTitle;

              const updateMeta = (selector, attr, val) => {
                const el = document.querySelector(selector);
                if (el) el.setAttribute(attr, val);
              };

              updateMeta('meta[name="title"]', 'content', siteTitle);
              updateMeta('meta[name="description"]', 'content', siteDesc);
              updateMeta('meta[property="og:title"]', 'content', siteTitle);
              updateMeta('meta[property="og:description"]', 'content', siteDesc);
              updateMeta('meta[property="og:image"]', 'content', siteImage);
              updateMeta('meta[property="og:image:secure_url"]', 'content', siteImage);
              updateMeta('meta[property="twitter:title"]', 'content', siteTitle);
              updateMeta('meta[property="twitter:description"]', 'content', siteDesc);
              updateMeta('meta[property="twitter:image"]', 'content', siteImage);
            }
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic SEO metadata:", err);
      }
    }
    fetchSEOData();
  }, [location.pathname, isAdmin]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<WorkDetails />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
