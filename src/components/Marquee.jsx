import { FEATURED } from '../data/companies';

const PILLS = [...FEATURED, ...FEATURED, ...FEATURED];

export default function Marquee() {
  return (
    <section className="marquee-sec">
      <div className="marquee-hdr"><p>Trusted by engineers preparing for these companies</p></div>
      <div className="mwrap">
        <div className="mtrack">
          {PILLS.map((name, i) => (
            <div key={`${name}-${i}`} className="mpill2">{name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
