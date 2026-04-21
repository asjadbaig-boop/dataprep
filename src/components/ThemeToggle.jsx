import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../context/ThemeContext'
import '../styles/themetoggle.css'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
    >
      <motion.div
        className="toggle-track"
        animate={{
          background: isDark
            ? 'linear-gradient(135deg, #1e3a5f, #0d1b2e)'
            : 'linear-gradient(135deg, #87CEEB, #FDB813)'
        }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence>
          {isDark && (
            <motion.div
              className="toggle-stars"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="star s1">·</span>
              <span className="star s2">·</span>
              <span className="star s3">·</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isDark && (
            <motion.div
              className="toggle-clouds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="cloud c1">☁</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="toggle-thumb"
          animate={{
            x: isDark ? 28 : 2,
            background: isDark
              ? 'linear-gradient(135deg, #d4d4d4, #a0aec0)'
              : 'linear-gradient(135deg, #FFD700, #FFA500)'
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
            mass: 0.8
          }}
        >
          <motion.span
            animate={{ rotate: isDark ? 0 : 360 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '0.7rem', lineHeight: 1 }}
          >
            {isDark ? '🌙' : '☀️'}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
