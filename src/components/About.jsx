import React, { useEffect, useRef, useState } from 'react'
import { Paintbrush, Frame as EaselIcon, Award, Eye, Heart, Sprout } from 'lucide-react'

const QUOTES = [
  { text: "I don't paint what I see — I paint what stays with me long after I've looked away.", attr: '— Warda Shahid' },
  { text: 'Art is not what you see, but what you make others see.', attr: '— Edgar Degas' },
  { text: 'Every artist dips his brush in his own soul, and paints his own nature into his pictures.', attr: '— Henry Ward Beecher' },
  { text: 'To draw, you must close your eyes and sing.', attr: '— Pablo Picasso' },
]

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400&family=IM+Fell+English:ital@0;1&family=Inter:wght@300;400;500&display=swap');

@keyframes abt-up {
  from { opacity: 0; transform: translate3d(0,24px,0); }
  to   { opacity: 1; transform: translate3d(0,0,0); }
}
@keyframes abt-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes q-enter {
  from { opacity: 0; transform: translate3d(0,18px,0); }
  to   { opacity: 1; transform: translate3d(0,0,0); }
}
@keyframes q-exit {
  from { opacity: 1; transform: translate3d(0,0,0); }
  to   { opacity: 0; transform: translate3d(0,-18px,0); }
}
@keyframes abt-float {
  0%, 100% { transform: translate3d(0,0,0); }
  50%      { transform: translate3d(0,-4px,0); }
}

@media (prefers-reduced-motion: reduce) {
  .abt-quote-inner.q-entering,
  .abt-quote-inner.q-exiting,
  .abt-philo-icon,
  [class*="abt-"][style*="animation"] {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

.abt-div-wrap { position: relative; display: flex; align-items: center; }
.abt-div { height: 0.5px; background: var(--border); flex: 1; }
.abt-div-icon {
  width: 26px; height: 26px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  opacity: 0.6;
}

/* ---------- QUOTE CAROUSEL ---------- */
.abt-quote-sec {
  text-align: center; padding: 100px 0 56px; min-height: 220px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
@media (max-width: 768px) {
  .abt-quote-sec { padding: 60px 0 36px; min-height: 170px; }
}
@media (max-width: 480px) {
  .abt-quote-sec { padding: 44px 0 28px; min-height: 150px; }
}

.abt-quote-inner { transition: none; will-change: opacity, transform; }
.abt-quote-inner.q-entering { animation: q-enter 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
.abt-quote-inner.q-exiting  { animation: q-exit  0.6s cubic-bezier(0.4,0,0.6,1)   forwards; }

.abt-q-text {
  font-family: 'IM Fell English', serif;
  font-style: italic;
  font-size: clamp(1.05rem, 4.2vw, 1.55rem);
  color: var(--accent);
  line-height: 1.75;
  margin: 0 auto 16px;
  max-width: 760px;
  padding: 0 10px;
}

.abt-q-attr {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.5;
}

.abt-q-dots { display: flex; gap: 8px; justify-content: center; margin-top: 28px; }
.abt-q-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--border);
  transition: background 0.3s ease;
}
.abt-q-dot.active { background: var(--accent); }

/* ---------- MAIN GRID ---------- */
.abt-main-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0 56px;
  padding: 72px 0 100px;
  align-items: start;
}
@media (max-width: 900px) {
  .abt-main-grid { grid-template-columns: 1fr; gap: 48px 0; padding: 48px 0 64px; }
}
@media (max-width: 480px) {
  .abt-main-grid { padding: 36px 0 48px; gap: 40px 0; }
}

/* ---------- LEFT COLUMN ---------- */
.abt-left-col { display: flex; flex-direction: column; gap: 0; }
.abt-about-text { flex: 1; min-width: 0; }

.abt-label {
  font-family: 'Inter', sans-serif;
  font-size: 11.5px; font-weight: 500;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent);
  opacity: 0.8;
  display: block; margin-bottom: 14px;
}
@media (max-width: 480px) {
  .abt-label { font-size: 10px; margin-bottom: 8px; }
}

.abt-heading {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(1.4rem, 5.5vw, 2.15rem);
  font-weight: 400; letter-spacing: 0.03em;
  color: var(--accent); margin: 0 0 16px; line-height: 1.25;
}
@media (max-width: 768px) {
  .abt-heading { font-size: 1.3rem; max-width: none; margin-bottom: 10px; }
}
@media (max-width: 380px) {
  .abt-heading { font-size: 1.12rem; }
}

.abt-squiggle { display: block; margin-bottom: 28px; opacity: 0.5; color: var(--accent); }
@media (max-width: 768px) {
  .abt-squiggle { margin-bottom: 14px; }
}

.abt-body {
  font-family: 'Inter', sans-serif;
  font-size: 15px; font-weight: 300; line-height: 2.05;
  color: var(--accent);
  opacity: 0.85;
  margin: 0 0 20px;
}
.abt-body:last-of-type { margin-bottom: 28px; }
@media (max-width: 768px) {
  .abt-body { font-size: 13px; line-height: 1.7; max-width: none; margin-bottom: 12px; }
  .abt-body:last-of-type { margin-bottom: 16px; }
}
@media (max-width: 380px) {
  .abt-body { font-size: 12.5px; }
}

.abt-signature { display: flex; align-items: center; gap: 10px; }
.abt-signature-text {
  font-family: 'IM Fell English', serif;
  font-style: italic; font-size: 1.5rem; color: var(--accent);
}
@media (max-width: 480px) {
  .abt-signature-text { font-size: 1.15rem; }
}
.abt-signature-line { flex: 1; height: 1px; background: var(--border); max-width: 90px; }
.abt-signature-sparkle { color: var(--accent); flex-shrink: 0; }

/* ---------- RIGHT COLUMN ---------- */
.abt-right-col { display: flex; flex-direction: column; gap: 44px; }
@media (max-width: 768px) {
  .abt-right-col { gap: 32px; }
}

/* ---------- STATS CARD — theme-aware glassmorphism ---------- */
.abt-stats-card {
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  background: var(--glass-fill);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: none;
  border-radius: 22px;
  padding: 30px 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  will-change: transform, opacity;
  position: relative;
  overflow: hidden;
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.abt-stats-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
  transform: translateX(-100%);
  transition: transform 0.65s ease;
  pointer-events: none;
}
@media (hover: hover) and (pointer: fine) {
  .abt-stats-card:hover {
    background: rgba(74,80,90,0.92);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
  }
  .abt-stats-card:hover::after {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .abt-stats-card {
    display: flex;
    justify-content: center;
    align-items: stretch;
    background: var(--glass-fill);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: none;
    border-radius: 18px;
    padding: 20px 0;
    gap: 0;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 0 transparent;
  }
}

.abt-stat { text-align: center; padding: 0 6px; display: flex; flex-direction: column; align-items: center; }
@media (max-width: 768px) {
  .abt-stat { flex: 1; padding: 0 14px; position: relative; }
  .abt-stat + .abt-stat::before {
    content: '';
    position: absolute;
    left: 0; top: 4px; bottom: 4px;
    width: 1px;
    background: rgba(245,247,250,0.18);
  }
}
@media (max-width: 380px) {
  .abt-stat { padding: 0 8px; }
}

.abt-stat-icon { color: #F5F7FA; margin-bottom: 12px; }
@media (max-width: 768px) {
  .abt-stat-icon { margin-bottom: 8px; }
}

.abt-stat-num { font-family: 'Cinzel Decorative', serif; font-size: 1.65rem; color: #F5F7FA; margin-bottom: 4px; }
@media (max-width: 480px) {
  .abt-stat-num { font-size: 1.3rem; }
}

.abt-stat-label {
  font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: #F5F7FA; opacity: 0.85; margin-bottom: 4px;
}
@media (max-width: 380px) {
  .abt-stat-label { font-size: 9px; letter-spacing: 0.06em; }
}

.abt-stat-sub {
  font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 300;
  color: #F5F7FA; opacity: 0.65; line-height: 1.4;
}
@media (max-width: 768px) {
  .abt-stat-sub { display: none; }
}

/* ---------- PHILOSOPHY — theme-aware glassmorphism ---------- */
.abt-philo-label {
  font-family: 'Inter', sans-serif;
  font-size: 11.5px; font-weight: 500;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); opacity: 0.8; display: block; margin-bottom: 18px;
}
@media (max-width: 768px) {
  .abt-philo-label { text-align: center; }
}

.abt-philo-list { display: flex; flex-direction: column; gap: 12px; }
@media (max-width: 768px) {
  .abt-philo-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}

.abt-philo-item {
  display: flex; gap: 18px; align-items: flex-start;
  padding: 22px;
  background: var(--glass-fill-soft);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  will-change: transform, opacity;
  transform: translateZ(0);
  position: relative;
  overflow: hidden;
}
.abt-philo-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
  transform: translateX(-100%);
  transition: transform 0.65s ease;
  pointer-events: none;
}
@media (hover: hover) and (pointer: fine) {
  .abt-philo-item:hover {
    transform: translateY(-3px) translateX(4px);
    background: rgba(74,80,90,0.92);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
  }
  .abt-philo-item:hover::after {
    transform: translateX(100%);
  }
}
.abt-philo-item:active { transform: scale(0.97); }

@media (max-width: 768px) {
  .abt-philo-item {
    padding: 16px;
    border-radius: 16px;
    gap: 12px;
  }
  .abt-philo-item:nth-child(1) {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
  .abt-philo-item:nth-child(2),
  .abt-philo-item:nth-child(3) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
}

.abt-philo-icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(245,247,250,0.10);
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  display: flex; align-items: center; justify-content: center;
  color: #F5F7FA; flex-shrink: 0;
  animation: abt-float 4.5s ease-in-out infinite;
}
@media (max-width: 768px) {
  .abt-philo-icon { width: 42px; height: 42px; }
  .abt-philo-item:nth-child(2) .abt-philo-icon { animation-delay: 0.6s; }
  .abt-philo-item:nth-child(3) .abt-philo-icon { animation-delay: 1.2s; }
}

.abt-philo-title {
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
  color: #F5F7FA; margin: 0 0 6px; letter-spacing: 0.01em;
}
@media (max-width: 768px) {
  .abt-philo-title { font-size: 13.5px; margin-bottom: 4px; }
}

.abt-philo-desc {
  font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 300;
  line-height: 1.8; color: #F5F7FA; opacity: 0.78; margin: 0;
}
@media (max-width: 768px) {
  .abt-philo-desc { font-size: 11.5px; line-height: 1.55; }
}
`

const philosophy = [
  { Icon: Eye,    title: 'Observe Deeply', desc: 'I study the world closely — its quiet details, its stillness, the stories hidden in ordinary moments — before a single line is ever drawn.' },
  { Icon: Heart,  title: 'Feel Honestly',  desc: 'Every stroke carries something I actually felt. If it doesn\'t come from somewhere real, it doesn\'t make it onto the page.' },
  { Icon: Sprout, title: 'Create Kindly',  desc: 'I don\'t just want to make art — I want to make work that lingers, that makes someone feel a little less alone.' },
]

const stats = [
  { Icon: Paintbrush, num: '6+',  label: 'Years',       sub: 'of creative journey' },
  { Icon: EaselIcon,  num: '15+', label: 'Exhibitions', sub: '& features' },
  { Icon: Award,      num: '50+', label: 'Artworks',    sub: 'created' },
]

function Sparkle({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c.6 5.6 1.4 9.4 4 12 2.6 2.6 6.4 3.4 12 4-5.6.6-9.4 1.4-12 4-2.6 2.6-3.4 6.4-4 12-.6-5.6-1.4-9.4-4-12-2.6-2.6-6.4-3.4-12-4 5.6-.6 9.4-1.4 12-4 2.6-2.6 3.4-6.4 4-12z" />
    </svg>
  )
}

function useInView(threshold = 0.08) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function Section({ children, threshold }) {
  const [ref, visible] = useInView(threshold)
  return <div ref={ref}>{children(visible)}</div>
}

function QuoteCarousel() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('entering')

  useEffect(() => {
    const idleTimer = setTimeout(() => setPhase('idle'), 800)
    return () => clearTimeout(idleTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'idle') return
    const exitTimer = setTimeout(() => setPhase('exiting'), 3800)
    return () => clearTimeout(exitTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exiting') return
    const switchTimer = setTimeout(() => {
      setIndex(i => (i + 1) % QUOTES.length)
      setPhase('entering')
    }, 600)
    return () => clearTimeout(switchTimer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'entering') return
    const idleTimer = setTimeout(() => setPhase('idle'), 800)
    return () => clearTimeout(idleTimer)
  }, [phase, index])

  const cls = phase === 'entering' ? 'q-entering' : phase === 'exiting' ? 'q-exiting' : ''

  return (
    <div className="abt-quote-sec">
      <div className={`abt-quote-inner ${cls}`}>
        <p className="abt-q-text">{QUOTES[index].text}</p>
        <span className="abt-q-attr">{QUOTES[index].attr}</span>
      </div>
      <div className="abt-q-dots">
        {QUOTES.map((_, i) => (
          <div key={i} className={`abt-q-dot${i === index ? ' active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default function About() {
  useEffect(() => {
    const existing = document.getElementById('abt-styles')
    if (existing) return
    const style = document.createElement('style')
    style.id = 'abt-styles'
    style.textContent = css
    document.head.appendChild(style)
    return () => {
      const tag = document.getElementById('abt-styles')
      if (tag) document.head.removeChild(tag)
    }
  }, [])

  const up = (visible, d) => ({
    opacity: 0,
    animation: visible ? `abt-up 0.7s cubic-bezier(0.22,1,0.36,1) ${d}s forwards` : 'none',
  })
  const fi = (visible, d) => ({
    opacity: 0,
    animation: visible ? `abt-in 0.6s ease ${d}s forwards` : 'none',
  })

  return (
    <div
      className="bg-surface-light dark:bg-surface-dark transition-colors duration-300"
      id="about"
      style={{
        // Same solid grey glass treatment as the Explore button / social icons
        '--glass-fill': 'rgba(57,62,70,0.80)',
        '--glass-fill-soft': 'rgba(57,62,70,0.80)',
        '--glass-border': 'rgba(245,247,250,0.18)',
        '--glass-border-soft': 'rgba(245,247,250,0.15)',
        '--glass-highlight': 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 md:px-10">

        <QuoteCarousel />

        <div className="abt-div-wrap">
          <div className="abt-div" />
          <div className="abt-div-icon"><Sparkle size={14} /></div>
          <div className="abt-div" />
        </div>

        <Section threshold={0.08}>
          {(visible) => (
            <div className="abt-main-grid">

              <div className="abt-left-col">
                <div className="abt-about-text">
                  <span className="abt-label" style={fi(visible, 0.1)}>About</span>
                  <h2 className="abt-heading" style={up(visible, 0.15)}>The Artist &amp; Her World</h2>
                  <svg className="abt-squiggle" width="48" height="10" viewBox="0 0 48 10" style={fi(visible, 0.2)}>
                    <path d="M1 5 Q9 1, 17 5 T33 5 T47 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  </svg>

                 <p className="abt-body" style={up(visible, 0.25)}>
  My journey as an artist began with nothing more than a pencil and a blank page — and the quiet conviction that graphite could hold as much feeling as colour ever could.
</p>
<p className="abt-body" style={up(visible, 0.32)}>
  I work primarily in fine-line sketching and monochrome portraiture, drawn to the way shadow and restraint can say more than detail ever does. Every piece begins as an observation — a glance, a gesture, a moment I couldn't look away from.
</p>
<p className="abt-body" style={up(visible, 0.39)}>
  Over the years my work has found its way into a handful of exhibitions and quiet corners of the internet where strangers have told me a sketch made them feel something. That, more than anything, is why I keep drawing.
</p>
<p className="abt-body" style={up(visible, 0.46)}>
  This isn't just a craft to me — it's how I process the world, one careful line at a time.
</p>
                  <div className="abt-signature" style={fi(visible, 0.52)}>
                    <span className="abt-signature-text">artist</span>
                    <span className="abt-signature-line" />
                    <span className="abt-signature-sparkle"><Sparkle size={14} /></span>
                  </div>
                </div>
              </div>

              <div className="abt-right-col">
                <div className="abt-stats-card" style={up(visible, 0.2)}>
                  {stats.map(({ Icon, num, label, sub }) => (
                    <div key={label} className="abt-stat">
                      <Icon size={22} strokeWidth={1.4} className="abt-stat-icon" />
                      <span className="abt-stat-num">{num}</span>
                      <span className="abt-stat-label">{label}</span>
                      <span className="abt-stat-sub">{sub}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="abt-philo-label" style={fi(visible, 0.3)}>My Philosophy</span>
                  <div className="abt-philo-list">
                    {philosophy.map(({ Icon, title, desc }, i) => (
                      <div key={title} className="abt-philo-item" style={up(visible, 0.35 + i * 0.08)}>
                        <span className="abt-philo-icon"><Icon size={18} strokeWidth={1.5} /></span>
                        <div>
                          <p className="abt-philo-title">{title}</p>
                          <p className="abt-philo-desc">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}
        </Section>

      </div>
    </div>
  )
}