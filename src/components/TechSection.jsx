import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TECH_DATA, techResources } from '../data/techResources';
import { useTilt } from '../hooks/useTilt';

const getResKey = (title) =>
  Object.keys(techResources).find(k => title.startsWith(k) || k.startsWith(title));

function TechCard({ t, resKey, accentColor, tint, onOpenModal }) {
  const tiltRef = useTilt(6);
  return (
    <div
      ref={tiltRef}
      className="tcard tilt-card"
      style={{ '--tcard-tint': tint }}
      onClick={() => { if (resKey) onOpenModal(resKey); }}
    >
      <div className="tcard-top" style={{ background: accentColor }}/>
      <span className="tcard-icon">{t.icon}</span>
      <h3 className="tcard-title">{t.title}</h3>
      <p className="tcard-desc">{t.desc}</p>
      <button className="tcard-cta" style={{ color: accentColor }}>View Questions →</button>
    </div>
  );
}

export default function TechSection({ onOpenModal }) {
  const hdrRef = useScrollReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        grid.querySelectorAll('.tcard').forEach((c, i) =>
          setTimeout(() => c.classList.add('in'), i * 110)
        );
        io.disconnect();
      }
    }, { threshold: 0.1 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="tech-section" id="tech">
      <div className="parallax-grid parallax-grid-slow" aria-hidden="true" />
      <div className="tech-inner">
        <div className="tech-hdr reveal" ref={hdrRef}>
          <p className="sec-label">Technology Topics</p>
          <h2 className="sec-title">Prepare by Technology</h2>
          <p className="sec-sub">Master the tools that every Azure Data Engineer needs. Pick a technology and dive deep.</p>
        </div>
        <div className="tech-grid" id="techGrid" ref={gridRef}>
          {TECH_DATA.map(t => {
            const resKey = getResKey(t.title);
            const accentColor = resKey ? techResources[resKey].accentColor : t.accent;
            // Convert hex accent to rgba for the subtle card tint
            const hex = accentColor.replace('#', '');
            const r = parseInt(hex.slice(0,2), 16);
            const g = parseInt(hex.slice(2,4), 16);
            const b = parseInt(hex.slice(4,6), 16);
            const tint = `linear-gradient(145deg, rgba(${r},${g},${b},0.03) 0%, rgba(${r},${g},${b},0.07) 100%)`;
            return (
              <TechCard
                key={t.title}
                t={t}
                resKey={resKey}
                accentColor={accentColor}
                tint={tint}
                onOpenModal={onOpenModal}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
