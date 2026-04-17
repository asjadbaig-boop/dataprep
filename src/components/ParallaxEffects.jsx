import { useEffect, useRef } from 'react'

// Floating orbs that move at different speeds on scroll
export const ParallaxOrbs = ({ section = 'hero' }) => {
  const orbsRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const orbs = orbsRef.current?.querySelectorAll('.parallax-orb')
    if (!orbs) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          orbs.forEach((orb, i) => {
            const speed = parseFloat(orb.dataset.speed || 0.15)
            const direction = i % 2 === 0 ? 1 : -1
            orb.style.transform =
              `translateY(${scrollY * speed * direction}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={orbsRef}
      className="parallax-orbs-container"
      aria-hidden="true"
    >
      <div className="parallax-orb orb-1" data-speed="0.12" />
      <div className="parallax-orb orb-2" data-speed="0.08" />
      <div className="parallax-orb orb-3" data-speed="0.18" />
      <div className="parallax-orb orb-4" data-speed="0.06" />
    </div>
  )
}

// Floating particles
export const ParallaxParticles = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    if (!container) return

    const particles = Array.from({ length: 18 }, (_, i) => {
      const el = document.createElement('div')
      el.className = 'parallax-particle'
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        opacity: ${Math.random() * 0.4 + 0.1};
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${Math.random() * 6 + 6}s;
      `
      el.dataset.speed = (Math.random() * 0.2 + 0.05).toFixed(2)
      el.dataset.dir = Math.random() > 0.5 ? '1' : '-1'
      container.appendChild(el)
      return el
    })

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          particles.forEach(p => {
            const speed = parseFloat(p.dataset.speed)
            const dir = parseFloat(p.dataset.dir)
            p.style.transform =
              `translateY(${scrollY * speed * dir}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="parallax-particles-container"
      aria-hidden="true"
    />
  )
}

// Scroll progress bar at top of page
export const ScrollProgressBar = () => {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight
          - window.innerHeight
        const progress = (scrollTop / docHeight) * 100
        bar.style.width = `${progress}%`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}

// Text that reveals on scroll
export const ParallaxText = ({ children, className = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('text-revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`parallax-text ${className}`}>
      {children}
    </div>
  )
}

export default ParallaxOrbs
