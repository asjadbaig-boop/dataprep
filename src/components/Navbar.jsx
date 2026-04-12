import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { smoothScrollTo } from "../utils/smoothScroll"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen])

  const navLinks = [
    { label: "About",        id: "mission" },
    { label: "Companies",    id: "companies" },
    { label: "Technology",   id: "tech" },
    { label: "How It Works", id: "how" },
  ]

  const handleNavClick = (id) => {
    smoothScrollTo(id)
    setIsOpen(false)
  }

  return (
    <div className="navbar-wrapper">
      <motion.div
        className={`navbar-pill ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 200,
          delay: 0.1
        }}
      >
        {/* LOGO */}
        <motion.div
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
              <defs>
                <linearGradient id="navGrad1" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#ffffff"/>
                  <stop offset="100%" stopColor="#c8e6ff"/>
                </linearGradient>
              </defs>
              <path
                d="M33.338 6.544h26.038L33.676 89.1a4.167 4.167 0 0 1-3.946 2.9H8.35a4.167 4.167 0 0 1-3.942-5.533l23-66.938a4.167 4.167 0 0 1 3.942-2.8l2-.185z"
                fill="url(#navGrad1)"
              />
              <path
                d="M71.17 60.681H38.33l-11.666 32.187A4.167 4.167 0 0 0 30.609 98h56.04a4.167 4.167 0 0 0 3.942-5.533L71.17 60.681z"
                fill="white"
              />
              <path
                d="M33.338 6.544a4.145 4.145 0 0 0-3.935 2.852L4.422 76.053a4.167 4.167 0 0 0 3.93 5.548h20.958a4.47 4.47 0 0 0 3.43-2.586l5.062-14.92 18.086 17.35a4.167 4.167 0 0 0 2.868 1.156h25.064L59.376 6.544z"
                fill="rgba(255,255,255,0.6)"
              />
            </svg>
          </div>
          <span className="navbar-logo-text">DataPrep</span>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
        <nav className="navbar-links-desktop">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              className="navbar-link"
              onClick={() => handleNavClick(link.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <motion.a
          href="https://www.linkedin.com/in/asjad-baig/"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-cta-btn"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          Say hello →
        </motion.a>

        {/* MOBILE HAMBURGER */}
        <motion.button
          className="hamburger-btn"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen
            ? <X size={22} color="#1A1A2E" />
            : <Menu size={22} color="#1A1A2E" />
          }
        </motion.button>
      </motion.div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280
            }}
          >
            {/* Close button */}
            <motion.button
              className="mobile-menu-close"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <X size={24} color="#1A1A2E" />
            </motion.button>

            {/* Mobile logo */}
            <motion.div
              className="mobile-menu-logo"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="navbar-logo-icon">
                <svg viewBox="0 0 96 96" width="20" height="20">
                  <path d="M33.338 6.544h26.038L33.676 89.1a4.167 4.167 0 0 1-3.946 2.9H8.35a4.167 4.167 0 0 1-3.942-5.533l23-66.938a4.167 4.167 0 0 1 3.942-2.8l2-.185z" fill="white"/>
                  <path d="M71.17 60.681H38.33l-11.666 32.187A4.167 4.167 0 0 0 30.609 98h56.04a4.167 4.167 0 0 0 3.942-5.533L71.17 60.681z" fill="white"/>
                </svg>
              </div>
              <span className="navbar-logo-text" style={{ color: "#1A1A2E" }}>DataPrep</span>
            </motion.div>

            {/* Mobile nav links */}
            <div className="mobile-menu-links">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  className="mobile-menu-link"
                  onClick={() => handleNavClick(link.id)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.08 + 0.15 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                  <span className="mobile-link-arrow">→</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile CTA */}
            <motion.a
              href="https://www.linkedin.com/in/asjad-baig/"
          target="_blank"
          rel="noopener noreferrer"
              className="mobile-menu-cta"
              onClick={toggleMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.42 }}
              whileTap={{ scale: 0.97 }}
            >
              Say hello →
            </motion.a>

            {/* Bottom tagline */}
            <motion.p
              className="mobile-menu-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Azure Data Engineering Interview Hub
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
