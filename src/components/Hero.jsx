import { motion } from 'motion/react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ParallaxOrbs } from './ParallaxEffects';

const MOCK_COMPANIES = [
  { initials: 'MS', name: 'Microsoft', bg: '#0078D4' },
  { initials: 'TC', name: 'TCS',       bg: '#2B88D8' },
  { initials: 'IN', name: 'Infosys',   bg: '#003A8C' },
  { initials: 'GS', name: 'Goldman',   bg: '#106EBE' },
  { initials: 'NF', name: 'Netflix',   bg: '#0063B1' },
  { initials: 'UB', name: 'Uber',      bg: '#00B4D8' },
];

const AzureLogo = ({ className }) => (
  <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="azureGrad1" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#114A8B"/>
        <stop offset="100%" stopColor="#0669BC"/>
      </linearGradient>
      <linearGradient id="azureGrad2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0078D4"/>
        <stop offset="100%" stopColor="#1490DF"/>
      </linearGradient>
      <linearGradient id="azureGrad3" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#1490DF"/>
        <stop offset="100%" stopColor="#0078D4" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <path d="M33.338 6.544h26.038L33.676 89.1a4.167 4.167 0 0 1-3.946 2.9H8.35a4.167 4.167 0 0 1-3.942-5.533l23-66.938a4.167 4.167 0 0 1 3.942-2.8l2-.185z" fill="url(#azureGrad1)"/>
    <path d="M71.17 60.681H38.33l-11.666 32.187A4.167 4.167 0 0 0 30.609 98h56.04a4.167 4.167 0 0 0 3.942-5.533L71.17 60.681z" fill="url(#azureGrad2)"/>
    <path d="M33.338 6.544a4.145 4.145 0 0 0-3.935 2.852L4.422 76.053a4.167 4.167 0 0 0 3.93 5.548h20.958a4.47 4.47 0 0 0 3.43-2.586l5.062-14.92 18.086 17.35a4.167 4.167 0 0 0 2.868 1.156h25.064L59.376 6.544z" fill="url(#azureGrad3)"/>
  </svg>
);

const HERO_HEADING = 'Crack Your Data Engineering Interview.'

export default function Hero() {
  const handleClick = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  const words = HERO_HEADING.split(' ')

  return (
    <section className="hero" id="hero">
      {/* Large faded background logo */}
      <AzureLogo className="hero-bg-logo" />

      {/* Parallax background layer */}
      <div className="hero-parallax-bg">
        <ParallaxOrbs section="hero" />
        <div className="hero-watermark" aria-hidden="true">A</div>
      </div>

      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-label">
            <AzureLogo className="hero-label-icon" />
            Azure Data Engineering
          </p>
          <h1 className="hero-h1">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="hero-word"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08 + 0.3,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="hero-sub">Real interview questions from 80+ top companies. Organised, searchable and completely free. Built for Azure Data Engineers.</p>
          <div className="hero-btns">
            <a href="#companies" className="btn-primary" onClick={e => handleClick(e, 'companies')}>Browse Companies →</a>
            <a href="#how"       className="btn-outline"  onClick={e => handleClick(e, 'how')}>How it works</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="mockup hero-mockup">
            <div className="mockup-bar">
              <div className="dot r"/><div className="dot y"/><div className="dot g"/>
              <span className="url-bar">dataprep.io/companies</span>
            </div>
            <div className="mockup-body">
              <div className="azure-logo-card">
                <AzureLogo className="azure-logo-svg" />
                <div className="azure-logo-label">
                  <span className="azure-logo-label-top">MICROSOFT AZURE</span>
                  <span className="azure-logo-label-sub">Data Engineering</span>
                </div>
              </div>
              <div className="mockup-label">Browse Companies</div>
              <div className="mockup-grid">
                {MOCK_COMPANIES.map(c => (
                  <div key={c.initials} className="m-card">
                    <div className="m-av" style={{ background: c.bg }}>{c.initials}</div>
                    <div className="m-name">{c.name}</div>
                    <div className="m-badge">1 PDF</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
