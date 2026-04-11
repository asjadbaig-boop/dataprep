import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    document.body.style.cursor = 'none';

    const onMove = e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.classList.add('show');
    };
    const onLeave = () => cursor.classList.remove('show');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    function updateHoverTargets() {
      document.querySelectorAll('a, button, .tcard, .mpill').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('big'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
      });
    }
    updateHoverTargets();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.body.style.cursor = '';
    };
  }, []);
}
