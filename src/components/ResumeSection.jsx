import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import { resumeCategories } from "../data/resumes"
import "../styles/resume.css"

const ResumeCard = ({ category, index }) => {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`resume-card ${visible ? "visible" : ""}`}
      style={{
        "--accent": category.accentColor,
        "--accent-rgb": category.accentRgb,
        transitionDelay: `${index * 0.12}s`
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.4, 0, 0.2, 1]
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Background orb */}
      <div className="resume-card-orb" />

      {/* Top row */}
      <div className="resume-card-top">
        <motion.span
          className="resume-card-icon"
          animate={hovered
            ? { scale: 1.2, rotate: -6 }
            : { scale: 1, rotate: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15
          }}
        >
          {category.icon}
        </motion.span>

        <span
          className="resume-card-badge"
          style={{
            background: category.badgeBg,
            color: category.badgeColor,
            borderColor: category.badgeBorder
          }}
        >
          {category.badge}
        </span>
      </div>

      {/* Experience level pill */}
      <div className="resume-level-pill">
        <span className="resume-level-dot" />
        {category.level}
      </div>

      {/* Title + subtitle */}
      <h3 className="resume-card-title">{category.title}</h3>
      <p className="resume-card-subtitle">{category.subtitle}</p>

      {/* Stats */}
      <div className="resume-stats-row">
        <div className="resume-stat">
          <span className="resume-stat-number">
            {category.stats.resumes}
          </span>
          <span className="resume-stat-label">Resumes</span>
        </div>
        <div className="resume-stat-divider" />
        <div className="resume-stat">
          <span className="resume-stat-number"
            style={{ fontSize: "1rem", paddingTop: "4px" }}>
            {category.stats.formats}
          </span>
          <span className="resume-stat-label">Format</span>
        </div>
      </div>

      {/* Feature list */}
      <ul className="resume-features">
        {category.features.map((f, i) => (
          <motion.li
            key={i}
            className="resume-feature-item"
            initial={{ opacity: 0, x: -10 }}
            animate={visible
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -10 }
            }
            transition={{
              delay: index * 0.12 + i * 0.07 + 0.3,
              ease: "easeOut"
            }}
          >
            <span className="resume-feature-dot" />
            {f}
          </motion.li>
        ))}
      </ul>

      {/* Divider */}
      <div className="resume-card-divider" />

      {/* Download button */}
      <motion.a
        href={category.driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="resume-download-btn"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 15
        }}
      >
        <span className="resume-btn-shimmer" />
        <span className="resume-btn-arrow">⬇</span>
        Download Resumes
      </motion.a>

      {/* Assurance row */}
      <div className="resume-assurance-row">
        <span>✅ Free</span>
        <span>📥 Instant</span>
        <span>🔓 No sign-up</span>
      </div>
    </motion.div>
  )
}

const ResumeSection = () => {
  return (
    <section className="resume-section" id="resumes">
      {/* Section header */}
      <div className="resume-section-header">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
        >
          SAMPLE RESUMES
        </motion.div>

        <motion.h2
          className="section-heading resume-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Resume Templates by Experience
        </motion.h2>

        <motion.p
          className="section-subtext resume-subtext"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          ATS-optimised Azure Data Engineering resumes
          crafted for every career stage.
          Download, customise, and get noticed.
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="resume-grid">
        {resumeCategories.map((cat, i) => (
          <ResumeCard key={cat.id} category={cat} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        className="resume-bottom-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        💡 All resumes are tailored for Azure Data Engineering roles
        and follow current ATS standards
      </motion.p>
    </section>
  )
}

export default ResumeSection
