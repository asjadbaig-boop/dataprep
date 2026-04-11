import { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import StatsStrip from './components/StatsStrip';
import CompaniesSection from './components/CompaniesSection';
import CompanyModal from './components/CompanyModal';
import TechSection from './components/TechSection';
import TechModal from './components/TechModal';
import HowItWorks from './components/HowItWorks';
import Marquee from './components/Marquee';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  const [companyModalType, setCompanyModalType] = useState(null);
  const [techModalKey, setTechModalKey] = useState(null);

  // Back-to-top button visibility
  useEffect(() => {
    const btn = document.getElementById('backTop');
    if (!btn) return;
    const onScroll = () => btn.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Canvas favicon
  useEffect(() => {
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0078D4';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(0, 0, 32, 32, 6);
    else ctx.rect(0, 0, 32, 32);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Az', 16, 17);
    let link = document.querySelector("link[rel*='icon']");
    if (!link) { link = document.createElement('link'); document.head.appendChild(link); }
    link.rel = 'icon';
    link.href = c.toDataURL();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Mission />
      <StatsStrip />
      <CompaniesSection onOpenModal={setCompanyModalType} />
      <TechSection onOpenModal={setTechModalKey} />
      <HowItWorks />
      <Marquee />
      <Testimonials />
      <Footer />

      <a href="#mission" id="freeBadge">🚀 Free Forever</a>
      <button id="backTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
        </svg>
      </button>

      {companyModalType && (
        <CompanyModal type={companyModalType} onClose={() => setCompanyModalType(null)} />
      )}
      {techModalKey && (
        <TechModal techKey={techModalKey} onClose={() => setTechModalKey(null)} />
      )}
    </>
  );
}
