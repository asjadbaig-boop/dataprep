import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CAT_DATA } from '../data/companies';
import { ParallaxParticles } from './ParallaxEffects';
import { useTilt } from '../hooks/useTilt';
import CompanyModal from './CompanyModal';

function catCountUp(el, target) {
  let val = 0;
  const step = target / (800 / 16);
  const timer = setInterval(() => {
    val += step;
    if (val >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = Math.floor(val); }
  }, 16);
}

function CatBlock({ type, data, onOpen }) {
  const blockRef = useRef(null);
  const tiltRef = useTilt(6);
  const direction = type === 'service' ? 'from-left' : 'from-right';

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in');
        el.querySelectorAll('.cat-stat-num[data-target]').forEach(statEl => {
          catCountUp(statEl, +statEl.dataset.target);
        });
        setTimeout(() => el.classList.remove('from-left', 'from-right'), 650);
        io.unobserve(el);
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`cat-block ${type} ${direction}`} ref={blockRef}>
      {/* tilt-card wraps decorative content only — button is outside */}
      <div className="tilt-card" ref={tiltRef} style={{ width: '100%' }}>
        <div className="cat-top-row">
          <span className="cat-icon">{data.icon}</span>
          <span className={`cat-pill ${type}`}>{type === 'service' ? 'Service Based' : 'Product Based'}</span>
        </div>
        <div>
          <h3 className="cat-title">{data.title}</h3>
          <p className="cat-sub">{type === 'service' ? 'Consulting, IT services & outsourcing giants' : 'Tech-first companies building their own products'}</p>
        </div>
        <div className="cat-stats">
          <div className="cat-stat">
            <span className="cat-stat-num" data-target={data.count}>0</span>
            <span className="cat-stat-lbl">Companies</span>
          </div>
          <div className="cat-stat-div"/>
          <div className="cat-stat">
            <span className="cat-stat-num" data-target={data.count}>0</span>
            <span className="cat-stat-lbl">PDFs</span>
          </div>
        </div>
        <div>
          <div className="cat-preview">
            <div className="cat-preview-row">{data.previewRow1}</div>
            <div className="cat-preview-row">{data.previewRow2}</div>
          </div>
          <p className="cat-preview-hint">👁 Click to view all companies</p>
        </div>
      </div>

      {/* Button lives OUTSIDE tilt-card so no 3D wrapper interferes */}
      <div style={{ width: '100%' }}>
        <button
          type="button"
          className="cat-dl-btn"
          onPointerDown={(e) => {
            e.stopPropagation();
            console.log(`${type} button clicked`);
            onOpen(type);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(type);
          }}
          style={{
            isolation: 'isolate',
            touchAction: 'manipulation',
            position: 'relative',
            zIndex: 9999,
            pointerEvents: 'all',
          }}
        >
          <span className="cat-dl-arrow">⬇</span>&ensp;Download PDFs
        </button>
        <div className="cat-reassure">
          <span>✅ Free</span>
          <span>📥 Instant</span>
          <span>🔓 No sign-up</span>
        </div>
      </div>
    </div>
  );
}

export default function CompaniesSection() {
  const hdrRef = useScrollReveal();
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    console.log('openModal called with:', type);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <section className="companies-section" id="companies">
      <ParallaxParticles />
      <div className="companies-inner">
        <div className="companies-hdr reveal" ref={hdrRef}>
          <p className="sec-label">Interview Question Bank</p>
          <h2 className="sec-title">Companies by Type</h2>
          <p className="sec-sub">Real interview questions from actual hiring rounds. Pick your company type, download the pack and start preparing.</p>
        </div>
        <div className="cat-grid">
          <CatBlock type="service" data={CAT_DATA.service} onOpen={openModal} />
          <CatBlock type="product" data={CAT_DATA.product} onOpen={openModal} />
        </div>
      </div>
      {modalType && (
        <CompanyModal type={modalType} onClose={closeModal} />
      )}
    </section>
  );
}
