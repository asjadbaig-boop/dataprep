import { useScrollReveal } from '../hooks/useScrollReveal';
import { ParallaxOrbs } from './ParallaxEffects';

export default function Mission() {
  const ref = useScrollReveal();

  return (
    <section className="mission" id="mission">
      <ParallaxOrbs section="mission" />
      <div className="mission-inner reveal" ref={ref}>
        <h2 className="mission-h2">No more LinkedIn hopping.<br/>No more YouTube rabbit holes.</h2>
        <p className="mission-p">
          This site exists for one reason. To give fellow data engineering job seekers everything they need in one place.
          Real interview questions from real companies, organised by company and technology.
          Download. Prepare. Get hired. That's it.<br/><br/>
          <strong>No payments. No subscriptions. No strings attached. Ever.</strong>
        </p>
        <div className="mission-pills">
          <span className="mpill">✅ 100% Free</span>
          <span className="mpill">📥 Direct Download</span>
          <span className="mpill">🚫 No Sign-up</span>
        </div>
      </div>
    </section>
  );
}
