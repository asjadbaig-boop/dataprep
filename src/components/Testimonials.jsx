import { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    quote: 'Finally found all Azure interview Qs in one place. Cleared 3 rounds at TCS without breaking a sweat. Highly recommend to anyone prepping.',
    name: 'Rahul M.',
    role: 'Data Engineer,TCS',
  },
  {
    quote: 'The Deloitte PDF was spot on. Got asked 4 exact questions from it in my panel round. This site saved me weeks of preparation time.',
    name: 'Priya K.',
    role: 'Azure Developer,Deloitte',
  },
  {
    quote: 'Used this for 2 weeks before my Microsoft interview. Well-organised and covers exactly the right Azure services. Nailed it.',
    name: 'Arjun S.',
    role: 'Data Analyst,Microsoft',
  },
];

export default function Testimonials() {
  const hdrRef = useScrollReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        grid.querySelectorAll('.tcard2').forEach((c, i) =>
          setTimeout(() => c.classList.add('in'), i * 140)
        );
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="testim-sec" id="testimonials">
      <div className="testim-inner">
        <div className="testim-hdr reveal" ref={hdrRef}>
          <p className="sec-label">What Engineers Say</p>
          <h2 className="sec-title">Trusted by Data Engineers</h2>
        </div>
        <div className="testim-grid" ref={gridRef}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="tcard2">
              <div className="tstars">★★★★★</div>
              <p className="tquote">{t.quote}</p>
              <div className="tauthor"><strong>{t.name}</strong>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
