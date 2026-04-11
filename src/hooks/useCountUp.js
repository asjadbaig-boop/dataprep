import { useEffect, useRef } from 'react';

export function useCountUp(selector = '.stat-num[data-target]', duration = 1600, threshold = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    function countUp(el) {
      const target = +el.dataset.target;
      const sfx = el.dataset.sfx || '';
      const step = target / (duration / 16);
      let val = 0;
      const t = setInterval(() => {
        val += step;
        if (val >= target) { val = target; clearInterval(t); }
        el.textContent = Math.floor(val) + sfx;
      }, 16);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.querySelectorAll(selector).forEach(countUp);
          io.unobserve(container);
        }
      },
      { threshold }
    );
    io.observe(container);
    return () => io.disconnect();
  }, [selector, duration, threshold]);

  return ref;
}
