import { useCountUp } from '../hooks/useCountUp';

const STATS = [
  { target: 80,  sfx: '+', label: 'Companies Listed' },
  { target: 200, sfx: '+', label: 'Interview Questions' },
  { target: 15,  sfx: '+', label: 'Azure Services Covered' },
  { target: 100, sfx: '%', label: 'Free Access' },
];

export default function StatsStrip() {
  const ref = useCountUp('.stat-num[data-target]', 1600, 0.5);

  return (
    <section className="stats-strip" ref={ref}>
      <div className="stats-parallax-bg" aria-hidden="true">
        <div className="stats-stripe" />
      </div>
      <div className="stats-inner">
        {STATS.map(s => (
          <div key={s.label} className="stat-box">
            <div className="stat-num" data-target={s.target} data-sfx={s.sfx}>
              0{s.sfx}
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
