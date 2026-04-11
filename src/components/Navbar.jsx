import { useState, useEffect } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && navOpen) {
        setNavOpen(false);
        document.body.style.overflow = '';
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [navOpen]);

  useEffect(() => {
    const onClick = (e) => {
      const nav = document.getElementById('mobileNav');
      const ham = document.getElementById('hamburger');
      if (navOpen && nav && ham && !nav.contains(e.target) && !ham.contains(e.target)) {
        setNavOpen(false);
        document.body.style.overflow = '';
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
    if (navOpen) {
      setNavOpen(false);
      document.body.style.overflow = '';
    }
  };

  const toggleNav = (e) => {
    e.stopPropagation();
    const next = !navOpen;
    setNavOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-inner">
          <a className="nav-logo" href="#" onClick={e => handleNavClick(e, 'hero')}>
            <div className="nav-logo-box">
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1" fill="white"/>
                <rect x="11" y="2" width="7" height="7" rx="1" fill="rgba(255,255,255,.6)"/>
                <rect x="2" y="11" width="7" height="7" rx="1" fill="rgba(255,255,255,.6)"/>
                <rect x="11" y="11" width="7" height="7" rx="1" fill="rgba(255,255,255,.8)"/>
              </svg>
            </div>
            <span className="nav-logo-name">Data<span>Prep</span></span>
          </a>
          <ul className="nav-links">
            <li><a href="#hero"      onClick={e => handleNavClick(e, 'hero')}>Home</a></li>
            <li><a href="#companies" onClick={e => handleNavClick(e, 'companies')}>Companies</a></li>
            <li><a href="#tech"      onClick={e => handleNavClick(e, 'tech')}>Technologies</a></li>
            <li><a href="#how"       onClick={e => handleNavClick(e, 'how')}>How it Works</a></li>
            <li><a href="#companies" className="nav-cta" onClick={e => handleNavClick(e, 'companies')}>Start Preparing →</a></li>
          </ul>
          <button
            className={`hamburger${navOpen ? ' open' : ''}`}
            id="hamburger"
            aria-label="Menu"
            aria-expanded={String(navOpen)}
            onClick={toggleNav}
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <nav className={`mobile-nav${navOpen ? ' open' : ''}`} id="mobileNav">
        <a href="#hero"      onClick={e => handleNavClick(e, 'hero')}>Home</a>
        <a href="#companies" onClick={e => handleNavClick(e, 'companies')}>Companies</a>
        <a href="#tech"      onClick={e => handleNavClick(e, 'tech')}>Technologies</a>
        <a href="#how"       onClick={e => handleNavClick(e, 'how')}>How it Works</a>
        <a href="#companies" className="cta-mob" onClick={e => handleNavClick(e, 'companies')}>Start Preparing →</a>
      </nav>
    </>
  );
}
