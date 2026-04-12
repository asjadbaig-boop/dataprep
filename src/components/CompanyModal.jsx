import { useEffect, useRef } from 'react';
import { CAT_DATA } from '../data/companies';

export default function CompanyModal({ type, onClose }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  const data = type ? CAT_DATA[type] : null;

  useEffect(() => {
    if (!type) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    // Chip stagger
    const chips = overlay.querySelectorAll('.mchip');
    chips.forEach((chip, i) => {
      setTimeout(() => chip.classList.add('in'), 60 + i * 18);
    });

    // Pulse download button
    const dlBtn = overlay.querySelector('.modal-dl-btn');
    if (dlBtn) {
      dlBtn.classList.remove('pulse');
      void dlBtn.offsetWidth;
      dlBtn.classList.add('pulse');
    }

    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [type]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.classList.remove('active', 'closing');
      document.body.style.overflow = '';
      onClose();
    }, 200);
  };

  if (!data) return null;

  return (
    <div
      className="modal-overlay"
      id="company-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-hdr-title"
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div className="modal-card">
        <div className="modal-hdr">
          <div className="modal-hdr-left">
            <span className="modal-hdr-icon">{data.icon}</span>
            <h3 className="modal-hdr-title" id="modal-hdr-title">{data.title}</h3>
          </div>
          <button className="modal-close" ref={closeBtnRef} aria-label="Close" onClick={handleClose}>×</button>
        </div>
        <div className="modal-subhdr">
          <span className="modal-subhdr-stat">📁 {data.count} companies included</span>
          <span className="modal-subhdr-dot">·</span>
          <span className="modal-subhdr-stat">📄 {data.count} PDFs ready to download</span>
        </div>
        <div className="modal-body">
          <p className="modal-chips-label">Included Companies</p>
          <div className="modal-chips">
            {data.companies.map(name => (
              <span key={name} className="mchip">{name}</span>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <a
            className="modal-dl-btn"
            href={data.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in Google Drive"
          >
            ⬇ Download PDFs
          </a>
          <div className="modal-reassure">
            <span>✅ Free</span>
            <span>📥 Instant</span>
            <span>🔓 No sign-up</span>
          </div>
        </div>
      </div>
    </div>
  );
}
