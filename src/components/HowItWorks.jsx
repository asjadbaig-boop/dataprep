import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS = [
  { num: '01', icon: '🔍', title: 'Find Your Company',        desc: 'Browse 80+ companies or search by name. Filter by alphabet to find what you need fast.' },
  { num: '02', icon: '📄', title: 'Download the Questions',   desc: 'Access curated PDF question sets sourced from real interview rounds at top data companies.' },
  { num: '03', icon: '🚀', title: 'Ace Your Interview',       desc: 'Practice with confidence knowing you\'ve studied the actual questions asked in the field.' },
];

export default function HowItWorks() {
  const hdrRef = useScrollReveal();
  const stepsRef = useRef(null);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.hstep').forEach((s, i) =>
          setTimeout(() => s.classList.add('in'), i * 170)
        );
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ArrowSvg = () => (
    <svg viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="0" y1="10" x2="52" y2="10"/>
      <polyline points="42,3 54,10 42,17"/>
    </svg>
  );

  return (
    <section className="how-section" id="how">
      <div className="how-inner">
        <div className="how-hdr reveal" ref={hdrRef}>
          <p className="sec-label">How it works</p>
          <h2 className="sec-title">Three Steps to Interview Success</h2>
        </div>
        <div className="how-steps" ref={stepsRef}>
          {STEPS.map((s, i) => (
            <>
              <div key={s.num} className="hstep">
                <div className="step-num">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-ttl">{s.title}</h3>
                <p className="step-dsc">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div key={`arrow-${i}`} className="harrow"><ArrowSvg/></div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
