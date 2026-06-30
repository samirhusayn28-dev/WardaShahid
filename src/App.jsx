import React, { useEffect, useRef, useState, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'

const SECTIONS = ['Hero', 'About', 'Gallery', 'Contact']

export default function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const isScrollingRef = useRef(false)

  // Register each section element
  const setSectionRef = useCallback((el, idx) => {
    sectionsRef.current[idx] = el
  }, [])

  // Scroll to a specific section index
  const scrollToSection = useCallback((index) => {
    const el = sectionsRef.current[index]
    if (!el) return
    isScrollingRef.current = true
    el.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(index)
    setTimeout(() => {
      isScrollingRef.current = false
    }, 900)
  }, [])

  // Expose scrollToSection globally so Navbar can use it
  useEffect(() => {
    window.__scrollToSection = scrollToSection
    window.__getSections = () => SECTIONS
    return () => {
      delete window.__scrollToSection
      delete window.__getSections
    }
  }, [scrollToSection])

  // IntersectionObserver to track which section is active
  useEffect(() => {
    const observers = []
    sectionsRef.current.forEach((el, idx) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(idx)
            setIsAtEnd(idx === SECTIONS.length - 1)
          }
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gold dark:bg-ink transition-colors duration-300 overflow-hidden"
    >
      <Navbar />

      {/* ── Section Dots Indicator ── */}
      <div
        className={`section-dots-wrapper ${isAtEnd ? 'dots-horizontal' : 'dots-vertical'}`}
        aria-hidden="true"
      >
        {SECTIONS.map((_, idx) => (
          <span
            key={idx}
            className={`section-dot ${activeSection === idx ? 'dot-active' : ''}`}
          />
        ))}
      </div>

      {/* ── Sections ── */}
      <div className="sections-container">
        <section
          ref={(el) => setSectionRef(el, 0)}
          className="full-section"
          data-section="0"
        >
          <Hero />
        </section>

        <section
          ref={(el) => setSectionRef(el, 1)}
          className="full-section"
          data-section="1"
        >
          <About />
        </section>

        <section
          ref={(el) => setSectionRef(el, 2)}
          className="full-section"
          data-section="2"
        >
          <Gallery />
        </section>

        <section
          ref={(el) => setSectionRef(el, 3)}
          className="full-section"
          data-section="3"
        >
          <Contact />
        </section>
      </div>
    </div>
  )
}