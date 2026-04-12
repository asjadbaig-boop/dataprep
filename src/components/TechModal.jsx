import { useEffect, useRef } from 'react';
import { techResources } from '../data/techResources';

export default function TechModal({ techKey, onClose }) {
  const overlayRef = useRef(null);

  const res = techKey ? techResources[techKey] : null;

  useEffect(() => {
    if (!techKey) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [techKey]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    onClose();
  };

  if (!res) return null;

  return (
    <div
      className="tech-overlay"
      id="techOverlay"
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div className="tech-modal" id="techModal" style={{ borderTopColor: res.accentColor }}>
        <div className="tmod-hdr">
          <div className="tmod-title-row">
            <span className="tmod-icon">{res.icon}</span>
            <h2 className="tmod-name">{techKey}</h2>
          </div>
          <button className="tmod-x" aria-label="Close" onClick={handleClose}>×</button>
        </div>
        <p className="tmod-desc">{res.description}</p>
        <div className="tmod-hr"/>
        <p className="tmod-res-label">Available Resources</p>
        {res.pdfs.map(pdf => (
          <div key={pdf.name} className="tpdf-row">
            <span className="tpdf-icon">📄</span>
            <span className="tpdf-name">{pdf.name}</span>
            <a
              className="tpdf-dl"
              href={res.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in Google Drive"
            >⬇ Download PDF</a>
          </div>
        ))}
        <div className="tmod-note">Free to download · No sign-up required · Share with fellow job seekers 🚀</div>
      </div>
    </div>
  );
}
