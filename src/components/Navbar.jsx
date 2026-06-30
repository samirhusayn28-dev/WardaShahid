import React, { useState, useEffect, useRef, useCallback } from 'react'
import ThemeToggle from './ThemeToggle.jsx'
import wslLogo from '../assets/wsl.png'


const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const css = `
@keyframes glint {
  0%   { opacity: 0; transform: scale(0.4); }
  40%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.4); }
}
@keyframes dl-check-pop {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.dl-slot {
  --dl-size: 44px;
  position: relative;
  flex-shrink: 0;
  width: var(--dl-size);
  height: var(--dl-size);
  z-index: 2;
  overflow: visible;
  transition: width 0.5s ease, height 0.5s ease;
}
.dl-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: var(--dl-size);
  height: var(--dl-size);
  background: #1f1f1f;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,0.18);
  text-decoration: none;
  opacity: 1;
  transform: scale(1);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s ease, border-radius 0.35s ease, box-shadow 0.3s ease, opacity 0.2s ease, transform 0.2s ease;
}
@media (hover: hover) {
  .dl-btn:not(.dl-busy):hover {
    width: 168px;
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.28);
  }
  .dl-btn:not(.dl-busy):hover .dl-icon-wrap {
    justify-content: flex-start;
    padding-left: 14px;
  }
  .dl-btn:not(.dl-busy):hover .dl-label {
    transform: translateX(0);
    opacity: 1;
  }
}
.dl-btn.dl-busy {
  opacity: 0;
  transform: scale(0.6);
  pointer-events: none;
}
.dl-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--dl-size);
  height: var(--dl-size);
  flex-shrink: 0;
  transition: justify-content 0.3s ease, padding 0.3s ease;
}
.dl-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.dl-label {
  position: absolute;
  right: 16px;
  transform: translateX(16px);
  opacity: 0;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.dl-progress-track {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scaleX(0);
  transform-origin: right;
  width: 168px;
  height: 7px;
  border-radius: 999px;
  background: rgba(0,0,0,0.12);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.dl-progress-track.dl-show {
  opacity: 1;
  transform: translateY(-50%) scaleX(1);
}
.dl-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0%;
  background: #1f1f1f;
  border-radius: 999px;
  transition: width 0.05s linear;
}
.dl-check-circle {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--dl-size);
  height: var(--dl-size);
  border-radius: 999px;
  background: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.5);
  pointer-events: none;
  transition: width 0.5s ease, height 0.5s ease;
}
.dl-check-circle.dl-show {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.5s ease, height 0.5s ease;
}
.dl-check-icon {
  animation: dl-check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Navbar responsive */
.navbar-root {
  position: fixed;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  width: 46vw;
}
@media (max-width: 1024px) {
  .navbar-root {
    width: 70vw;
    top: 28px;
  }
}
@media (max-width: 768px) {
  .navbar-root {
    width: calc(100vw - 32px);
    top: 16px;
  }
}

/* Hide nav links on very small screens, show hamburger instead */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 2px;
}
@media (max-width: 480px) {
  .navbar-links {
    display: none;
  }
  .navbar-hamburger {
    display: flex !important;
  }
}

.navbar-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

/* Mobile dropdown menu */
.navbar-mobile-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  overflow: hidden;
  transform-origin: top center;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.navbar-mobile-menu.menu-hidden {
  opacity: 0;
  transform: scaleY(0.85);
  pointer-events: none;
}
.navbar-mobile-menu.menu-visible {
  opacity: 1;
  transform: scaleY(1);
}
.navbar-mobile-link {
  display: block;
  padding: 13px 20px;
  font-size: 14px;
  font-weight: 400;
  color: #3a3a3a;
  text-decoration: none;
  border-bottom: 0.5px solid rgba(0,0,0,0.06);
  transition: background 0.2s ease;
}
.navbar-mobile-link:last-child {
  border-bottom: none;
}
.navbar-mobile-link:active,
.navbar-mobile-link.active {
  background: rgba(255,255,255,0.7);
  font-weight: 500;
}

@media (prefers-reduced-motion: reduce) {
  .dl-btn, .dl-icon-wrap, .dl-label, .dl-progress-track, .dl-check-circle,
  .navbar-mobile-menu {
    transition: none !important;
    animation: none !important;
  }
}
`

function Sparkle({ x, y }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        boxShadow: '0 0 4px 2px rgba(255,255,255,0.4)',
        animation: 'glint 0.8s ease-out forwards',
        pointerEvents: 'none',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function DownloadButton({ scrolled }) {
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const size = scrolled ? 36 : 40

  const triggerDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = 'https://drive.google.com/file/d/18tSnWM1Pm8hQ-pkKCdIM1hCoWu94q5D0/view?usp=drive_link'
    link.download = 'Warda-Shahid-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const handleClick = useCallback((e) => {
    e.preventDefault()
    if (status === 'busy') return

    setStatus('busy')
    setProgress(0)

    const start = Date.now()
    const duration = 1400

    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(timerRef.current)
        setStatus('done')
        triggerDownload()
        setTimeout(() => {
          setStatus('idle')
          setProgress(0)
        }, 1100)
      }
    }, 40)
  }, [status, triggerDownload])

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="dl-slot" style={{ '--dl-size': `${size}px` }}>
      <a
        href="#"
        onClick={handleClick}
        className={`dl-btn${status === 'busy' || status === 'done' ? ' dl-busy' : ''}`}
        aria-label="Download Resume"
      >
        <span className="dl-icon-wrap">
          <svg className="dl-icon" viewBox="0 0 512 512" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0c17.7 0 32 14.3 32 32V274.7l73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 274.7V32c0-17.7 14.3-32 32-32zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64z" />
          </svg>
        </span>
        <span className="dl-label">Download Resume</span>
      </a>

      <div className={`dl-progress-track${status === 'busy' ? ' dl-show' : ''}`}>
        <div className="dl-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className={`dl-check-circle${status === 'done' ? ' dl-show' : ''}`}>
        {status === 'done' && (
          <svg className="dl-check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [sparkles, setSparkles] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const sparkleId = useRef(0)
  const sparkleTimer = useRef(null)
  const styleRef = useRef(null)

  // Inject CSS once
  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style')
      style.textContent = css
      document.head.appendChild(style)
      styleRef.current = style
    }
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current)
        styleRef.current = null
      }
    }
  }, [])

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    function handleOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [menuOpen])

  // Sparkles — skip if reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    function spawnSparkle() {
      if (!navRef.current) return
      const x = `${8 + Math.random() * 84}%`
      const y = `${15 + Math.random() * 70}%`
      const id = sparkleId.current++

      setSparkles(prev => [...prev, { id, x, y }])
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id))
      }, 850)

      sparkleTimer.current = setTimeout(spawnSparkle, 600 + Math.random() * 1200)
    }

    sparkleTimer.current = setTimeout(spawnSparkle, 400 + Math.random() * 600)
    return () => clearTimeout(sparkleTimer.current)
  }, [])

  const handleNavClick = useCallback((label) => {
    setActive(label)
    setMenuOpen(false)
  }, [])

  const navStyle = {
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scrolled ? '6px 12px 6px 20px' : '7px 13px 7px 22px',
    borderRadius: '999px',
    border: '0.5px solid rgba(255,255,255,0)',
    backdropFilter: scrolled ? 'blur(8px) saturate(1.2)' : 'blur(28px) saturate(1.8)',
    WebkitBackdropFilter: scrolled ? 'blur(8px) saturate(1.2)' : 'blur(28px) saturate(1.8)',
    background: scrolled ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.62)',
    boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'background 0.65s ease, box-shadow 0.65s ease, padding 0.5s ease, backdrop-filter 0.65s ease',
  }

  return (
    <header className="navbar-root">
      <nav ref={navRef} style={navStyle}>
        {/* Sparkles */}
        {sparkles.map(s => (
          <Sparkle key={s.id} x={s.x} y={s.y} />
        ))}

        {/* Logo */}
        <a href="#hero" style={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <img
            src={wslLogo}
            alt="Warda Shahid Logo"
            style={{
              height: scrolled ? '30px' : '36px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 10px rgba(255,255,255,0.6))',
              transition: 'height 0.5s ease',
            }}
          />
        </a>

        {/* Desktop Nav links */}
        <div className="navbar-links">
          {navLinks.map((link) => {
            const isActive = active === link.label
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.label)}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.45)'
                    e.currentTarget.style.color = '#1a1a1a'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#3a3a3a'
                  }
                }}
                style={{
                  padding: scrolled ? '6px 12px' : '7px 13px',
                  borderRadius: '999px',
                  fontSize: scrolled ? '12.5px' : '13px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? '#F5F7FA' : '#3a3a3a',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  opacity: isActive ? 1 : 0.85,
                  background: isActive ? 'rgba(57,62,70,0.85)' : 'transparent',
                  backdropFilter: isActive ? 'blur(20px)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(20px)' : 'none',
                  boxShadow: isActive ? '0 2px 16px rgba(0,0,0,0.30)' : 'none',
                  transition: 'background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease, opacity 0.25s ease, padding 0.5s ease, font-size 0.5s ease',
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 2 }}>
          <DownloadButton scrolled={scrolled} />
          <ThemeToggle scrolled={scrolled} />

          {/* Hamburger — only on ≤480px */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2.2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`navbar-mobile-menu ${menuOpen ? 'menu-visible' : 'menu-hidden'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className={`navbar-mobile-link${active === link.label ? ' active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}