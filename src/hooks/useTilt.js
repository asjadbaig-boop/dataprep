import { useEffect, useRef } from 'react'

export function useTilt(strength = 8) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const el = ref.current
    if (!el) return

    el.style.pointerEvents = 'auto'

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform =
        `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`
    }

    const handleLeave = () => {
      el.style.transform =
        `perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)`
      el.style.transition =
        'transform 0.45s cubic-bezier(0.4,0,0.2,1)'
    }

    const handleEnter = () => {
      el.style.transition = 'transform 0.1s ease'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    el.addEventListener('mouseenter', handleEnter)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      el.removeEventListener('mouseenter', handleEnter)
    }
  }, [strength])

  return ref
}
