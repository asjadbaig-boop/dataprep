import { smoothScrollTo } from '../utils/smoothScroll';

export default function Footer() {
  const nav = (e, id) => { e.preventDefault(); smoothScrollTo(id); };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="flogo">
            <div className="flogo-box">
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <rect x="2" y="2" width="7" height="7" rx="1" fill="white"/>
                <rect x="11" y="2" width="7" height="7" rx="1" fill="rgba(255,255,255,.6)"/>
                <rect x="2" y="11" width="7" height="7" rx="1" fill="rgba(255,255,255,.6)"/>
                <rect x="11" y="11" width="7" height="7" rx="1" fill="rgba(255,255,255,.8)"/>
              </svg>
            </div>
            <span className="flogo-name">DataPrep</span>
          </div>
          <p className="ftagline">Azure Data Engineering Interview Hub<br/>Free resources for every data professional.</p>
          <div className="flinks">
            <h4>Quick Links</h4>
            <a href="#hero"      onClick={e => nav(e, 'hero')}>Home</a>
            <a href="#companies" onClick={e => nav(e, 'companies')}>Companies</a>
            <a href="#tech"      onClick={e => nav(e, 'tech')}>Technologies</a>
            <a href="#how"       onClick={e => nav(e, 'how')}>How it Works</a>
          </div>
        </div>
        <div className="fcol">
          <h4>Our Mission</h4>
          <p>This website was built with one goal. To help data engineering aspirants prepare smarter, not harder. No platform hopping, no paywalls, just clean resources.</p>
          <div className="fpills">
            <span className="fpill">Free Forever</span>
            <span className="fpill">No Login</span>
            <span className="fpill">No Payments</span>
          </div>
        </div>
        <div className="fcol">
          <h4>Made By</h4>
          <p className="fcredit">Built with ❤️ by <span className="cname">Asjad</span></p>
          <a
            href="https://www.linkedin.com/in/asjad-baig/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-linkedin"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Connect on LinkedIn →
          </a>
          <p className="fcredit-sub">If this helped you, share it with a fellow job seeker.</p>
        </div>
      </div>
      <div className="footer-bar">
        © 2026 DataPrep by <strong>Asjad</strong> &nbsp;·&nbsp; Made for the community &nbsp;·&nbsp; Free forever 🚀
      </div>
    </footer>
  );
}
