import React, { useEffect, useState, useRef, memo } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const SUBTITLE_LINES = [
  { text: 'sketch artist', duration: 1800 },
  { text: 'making pretty things ✦', duration: 2000 },
  { text: 'dark academia era ✧', duration: 2000 },
  { text: 'paint & chaos ☽', duration: 1800 },
  { text: 'art is my villain origin', duration: 2200 },
  { text: 'soft girl. dark art.', duration: 2000 },
  { text: 'romanticizing the canvas', duration: 2200 },
  { text: 'brushstrokes & bad decisions', duration: 2200 },
  { text: 'aesthetics over everything ✦', duration: 2000 },
  { text: 'certified art gremlin', duration: 1800 },
]

const NAME_ANIM_START = 700
const NAME_ANIM_TOTAL = 1850
const SUBTITLE_DELAY = 2600

const sleep = ms => new Promise(res => setTimeout(res, ms))

function useTypewriterLoop(lines, startDelay = 0) {
  const [display, setDisplay] = useState('')
  const cancelRef = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => {
      cancelRef.current = false
      async function run() {
        let idx = 0
        while (!cancelRef.current) {
          const { text, duration } = lines[idx % lines.length]
          for (let i = 1; i <= text.length; i++) {
            if (cancelRef.current) return
            setDisplay(text.slice(0, i))
            await sleep(60 + Math.random() * 35)
          }
          await sleep(duration)
          for (let i = text.length; i >= 0; i--) {
            if (cancelRef.current) return
            setDisplay(text.slice(0, i))
            await sleep(32)
          }
          await sleep(300)
          idx++
        }
      }
      run()
    }, startDelay)
    return () => { clearTimeout(t); cancelRef.current = true }
  }, [startDelay])
  return display
}

function useNameTyping(startDelay = 0) {
  const [warda, setWarda] = useState('')
  const [shahid, setShahid] = useState('')
  const [wardaDone, setWardaDone] = useState(false)
  const cancelRef = useRef(false)
  useEffect(() => {
    cancelRef.current = false
    async function run() {
      await sleep(startDelay)
      const w = 'WARDA'
      for (let i = 1; i <= w.length; i++) {
        if (cancelRef.current) return
        setWarda(w.slice(0, i))
        await sleep(120 + Math.random() * 60)
      }
      setWardaDone(true)
      await sleep(200)
      const s = 'SHAHID'
      for (let i = 1; i <= s.length; i++) {
        if (cancelRef.current) return
        setShahid(s.slice(0, i))
        await sleep(120 + Math.random() * 60)
      }
    }
    run()
    return () => { cancelRef.current = true }
  }, [startDelay])
  return { warda, shahid, wardaDone }
}

function Cursor() {
  return <span className="hero-cursor" />
}

const DecorativeStars = memo(() => (
  <>
    {[
      { cls: 'lg', style: { top: '16%', left: '5%',     animationDelay: '0s'   } },
      { cls: 'md', style: { top: '30%', right: '2%',    animationDelay: '0.8s' } },
      { cls: 'sm', style: { bottom: '30%', left: '3%',  animationDelay: '1.3s' } },
      { cls: 'md', style: { bottom: '18%', right: '4%', animationDelay: '1.9s' } },
      { cls: 'sm', style: { top: '58%', left: '10%',    animationDelay: '2.4s' } },
    ].map(({ cls, style }, i) => (
      <div key={i} className="absolute pointer-events-none" style={style}>
        <span
          className={`text-on-light dark:text-on-dark/40 ${cls === 'lg' ? 'text-[18px]' : cls === 'md' ? 'text-[11px]' : 'text-[7px]'}`}
          style={{ animation: 'twinkle 3s ease-in-out infinite', animationDelay: style.animationDelay }}
        >✦</span>
      </div>
    ))}
  </>
))

const FloatingCircles = memo(() => (
  <>
    {[
      { size: 55, style: { top: '16%',    left: '6%',  animationDelay: '0s' } },
      { size: 36, style: { bottom: '26%', right: '1%', animationDelay: '2s' } },
      { size: 72, style: { top: '66%',    left: '3%',  animationDelay: '4s' } },
    ].map(({ size, style }, i) => (
      <div key={i}
        className="absolute rounded-full border border-on-light/60 dark:border-on-dark/15 pointer-events-none"
        style={{ width: size, height: size, ...style, animation: 'floatY 7s ease-in-out infinite', animationDelay: style.animationDelay }}
      />
    ))}
  </>
))

const SparkDots = memo(() => (
  <>
    {[...Array(6)].map((_, i) => (
      <div key={i}
        className="absolute w-1 h-1 rounded-full bg-on-light dark:bg-on-dark/50 pointer-events-none"
        style={{
          top:  `${18 + (i * 13) % 62}%`,
          left: `${10 + (i * 17) % 82}%`,
          opacity: 0,
          animation: `sparkle 3s ease-in-out ${(i * 0.5).toFixed(1)}s infinite`,
        }}
      />
    ))}
  </>
))

const SOCIALS = [
  {
    label: 'GitHub', username: '@Warda-Shahid07', delay: '1.7s',
    url: 'https://github.com/Warda-Shahid07',
    icon: (w, h) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={w} height={h}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.75c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  },
  {
    label: 'Pinterest', username: '@wardashahidarts', delay: '1.85s',
    url: 'https://pin.it/3Eo3EpgIG',
    icon: (w, h) => <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width={w} height={h}><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>,
  },
  {
    label: 'LinkedIn', username: '@Warda Shahid', delay: '2.0s',
    url: 'https://www.linkedin.https://www.linkedin.com/in/warda-shahid-44090b405?utm_source=share_via&utm_content=profile&utm_medium=member_android/in/warda-shahid-44090b405?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    icon: (w, h) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={w} height={h}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    label: 'Instagram', username: '@shii_warda07', delay: '2.15s',
    url: 'https://www.instagram.com/shii_warda07',
    icon: (w, h) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={w} height={h}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
]
// ── Social button: glassmorphism circle, hover grows + tooltip popup shows username ──
function SocialBtn({ label, username, icon, delay, url, size = 'md', isDark }) {
  const [hovered, setHovered] = useState(false)
  const baseSize = size === 'sm' ? 42 : 56
  const iconPx = size === 'sm' ? 18 : 24
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {/* Tooltip */}
      <span
        style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: hovered ? 'translate(-50%, -8px)' : 'translate(-50%, 0px)',
          marginBottom: 6,
          padding: '7px 14px',
          borderRadius: 10,
          fontSize: '0.85rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          background: isDark ? 'rgba(15,15,15,0.92)' : 'rgba(13,13,13,0.92)',
          color: '#F5F7FA',
          boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          zIndex: 20,
        }}
      >
        {username}
        <span
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `6px solid ${isDark ? 'rgba(15,15,15,0.92)' : 'rgba(13,13,13,0.92)'}`,
          }}
        />
      </span>

      <a
       href={url}
  target="_blank"
  rel="noopener noreferrer"
  title={label}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  style={{
          animation: `fadeUp 0.5s ease ${delay} both`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: baseSize,
          height: baseSize,
          borderRadius: '50%',
          flexShrink: 0,
          textDecoration: 'none',
          cursor: 'pointer',
          background: hovered ? 'rgba(74,80,90,0.80)' : 'rgba(57,62,70,0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: hovered
            ? '1px solid rgba(245,247,250,0.5)'
            : '1px solid rgba(245,247,250,0.15)',
          color: '#F5F7FA',
          boxShadow: hovered
            ? '0 10px 30px rgba(0,0,0,0.5)'
            : '0 2px 14px rgba(0,0,0,0.35)',
          transform: hovered ? 'translateY(-5px) scale(1.32)' : 'translateY(0) scale(1)',
          transition: 'background 0.25s ease, border 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {icon(iconPx, iconPx)}
      </a>
    </div>
  )
}

const SocialBar = memo(({ isDark }) => (
  <div style={{ borderTop: isDark ? '1px solid rgba(245,247,250,0.15)' : '1px solid rgba(13,13,13,0.18)' }}
    className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-10 pb-6 sm:pb-10 pt-4 sm:pt-6 flex justify-center items-center gap-3 sm:gap-4 transition-colors duration-500">
    {SOCIALS.map(({ label, username, icon, delay, url }) => (
      <SocialBtn key={label} label={label} username={username} icon={icon} delay={delay} url={url} size="md" isDark={isDark} />
    ))}
  </div>
))

const MobileSocialRow = memo(({ isDark }) => (
  <div className="flex items-center justify-center gap-2" style={{ animation: 'fadeUp 0.6s ease 1.5s both' }}>
    <span style={{ color: isDark ? 'rgba(245,247,250,0.25)' : 'rgba(13,13,13,0.25)', fontSize: 8 }}>✦</span>
    {SOCIALS.map(({ label, username, icon, delay, url }) => (
      <SocialBtn key={label} label={label} username={username} icon={icon} delay={delay} url={url} size="sm" isDark={isDark} />
    ))}
    <span style={{ color: isDark ? 'rgba(245,247,250,0.25)' : 'rgba(13,13,13,0.25)', fontSize: 8 }}>✦</span>
  </div>
))

function OrnamentLine({ direction, className = '' }) {
  const fwd = direction === 'ltr'
  return (
    <svg viewBox="0 0 220 28" xmlns="http://www.w3.org/2000/svg" className={`flex-1 overflow-visible ${className}`}>
      <line stroke="currentColor" strokeWidth="2"   strokeLinecap="round" fill="none" strokeDasharray="300" strokeDashoffset="300"
        x1={fwd?5:215} y1="14" x2={fwd?190:30} y2="14"
        style={{animation:`${fwd?'drawFwd':'drawRev'} 1.0s cubic-bezier(0.4,0,0.2,1) 0.4s forwards`}} />
      <line stroke="currentColor" strokeWidth="1"   strokeLinecap="round" fill="none" strokeDasharray="300" strokeDashoffset="300"
        x1={fwd?5:215} y1="9" x2={fwd?165:55} y2="9"
        style={{animation:`${fwd?'drawFwd':'drawRev'} 1.2s cubic-bezier(0.4,0,0.2,1) 0.55s forwards`}} />
      <line stroke="currentColor" strokeWidth="1"   strokeLinecap="round" fill="none" strokeDasharray="300" strokeDashoffset="300"
        x1={fwd?5:215} y1="19" x2={fwd?165:55} y2="19"
        style={{animation:`${fwd?'drawFwd':'drawRev'} 1.4s cubic-bezier(0.4,0,0.2,1) 0.65s forwards`}} />
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="60" strokeDashoffset="60"
        d={fwd?'M 182 14 L 192 8 L 202 14 L 192 20 Z':'M 38 14 L 28 8 L 18 14 L 28 20 Z'}
        style={{animation:`${fwd?'drawFwd':'drawRev'} 0.5s ease 1.3s forwards`}} />
      <circle cx={fwd?5:215} cy="14" r="2.5" fill="currentColor" opacity="0"
        style={{animation:'ornDot 0.4s ease 1.5s forwards'}} />
    </svg>
  )
}

const MobileCodeSnippet = memo(() => (
  <div
    className="font-mono font-semibold leading-[1.9] tracking-wide text-on-light/[0.50] dark:text-on-dark/[0.45] select-none pointer-events-none"
    style={{ fontSize: '0.6rem', animation: 'fadeUp 0.8s ease 1.3s both' }}
  >
    {[
      { n: '01', code: <><span className="text-on-light/60 dark:text-on-dark/55">&lt;section </span><span className="text-on-light/40 dark:text-on-dark/35">class=</span><span className="text-on-light/75 dark:text-on-dark/65">"intro"</span><span className="text-on-light/60 dark:text-on-dark/55">&gt;</span></> },
      { n: '02', indent: true, code: <><span className="text-on-light/40 dark:text-on-dark/35">&lt;h1&gt;</span><span className="text-on-light/60 dark:text-on-dark/55">Warda</span><span className="text-on-light/40 dark:text-on-dark/35">&lt;/h1&gt;</span></> },
      { n: '03', indent: true, code: <><span className="text-on-light/40 dark:text-on-dark/35">&lt;p&gt;</span><span className="text-on-light/60 dark:text-on-dark/55">dark art.</span><span className="text-on-light/40 dark:text-on-dark/35">&lt;/p&gt;</span></> },
      { n: '04', code: <span className="text-on-light/60 dark:text-on-dark/55">&lt;/section&gt;</span> },
    ].map(({ n, code, indent }) => (
      <div key={n} className={`flex gap-1.5 ${indent ? 'ml-2' : ''}`}>
        <span className="opacity-40 font-normal w-3 shrink-0 pt-[2px]" style={{ fontSize: '0.5rem' }}>{n}</span>
        <span>{code}</span>
      </div>
    ))}
  </div>
))

// ── Explore button with proper glassmorphism ──
function ExploreButton({ mobile = false, isDark = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
  onClick={() => window.open('https://pin.it/5s1fqSTGG', '_blank', 'noopener,noreferrer')}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: mobile ? 8 : 'clamp(8px,1.5vw,12px)',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: mobile ? '0.18em' : 'clamp(0.18em,0.22em,0.22em)',
        fontSize: mobile ? '0.6rem' : 'clamp(0.6rem,1.8vw,0.78rem)',
        padding: mobile ? '0.55rem 1.3rem' : 'clamp(0.5rem,1.5vw,1rem) clamp(1rem,3vw,2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        color: '#F5F7FA',
        background: hovered ? 'rgba(74,80,90,0.80)' : 'rgba(57,62,70,0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: hovered
          ? '1px solid rgba(245,247,250,0.5)'
          : '1px solid rgba(245,247,250,0.18)',
        boxShadow: hovered
          ? '0 10px 30px rgba(0,0,0,0.45)'
          : '0 2px 16px rgba(0,0,0,0.30)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'background 0.25s ease, border 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>Explore My Work</span>
      <svg
        style={{
          position: 'relative',
          zIndex: 1,
          width: mobile ? 10 : 'clamp(10px,2vw,16px)',
          height: mobile ? 10 : 'clamp(10px,2vw,16px)',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          transition: 'transform 0.25s ease',
          flexShrink: 0,
        }}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      {/* shimmer */}
      <span style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
        transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
        transition: 'transform 0.65s ease',
        pointerEvents: 'none',
      }} />
    </button>
  )
}

export default function Hero() {
  const { warda, shahid, wardaDone } = useNameTyping(NAME_ANIM_START)
  const subtitle = useTypewriterLoop(SUBTITLE_LINES, SUBTITLE_DELAY)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="hero"
      className="relative overflow-hidden w-full min-h-screen flex flex-col transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#0D0D0D' : '#F5F7FA',
        color: isDark ? '#F5F7FA' : '#0D0D0D',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03] z-0" />

      {/* ── MOBILE top bar ── */}
      <div className="sm:hidden relative z-10 w-full flex flex-col items-center pt-20 pb-0 px-4">
        <div className="flex items-center w-full">
          <OrnamentLine direction="rtl" className="h-5" />
          <span
            className="font-gothic tracking-widest shrink-0 mx-3 text-[2rem]"
            style={{ animation: 'hiPop 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}
          >Hi</span>
          <OrnamentLine direction="ltr" className="h-5" />
        </div>
        <div className="flex justify-between w-full mt-1.5 px-1">
          <span className="font-body text-[0.55rem] tracking-[0.18em] uppercase text-on-light/65 dark:text-on-dark/70">Soft girl. Dark art.</span>
          <span className="font-body text-[0.55rem] tracking-[0.1em] uppercase text-on-light/65 dark:text-on-dark/70 text-right">Creative Dev</span>
        </div>
      </div>

      {/* ── DESKTOP top bar ── */}
      <div className="hidden sm:flex relative z-10 w-full max-w-[1500px] mx-auto items-center justify-between px-6 md:px-10 pt-28 pb-0">
        <span className="font-body text-[0.68rem] tracking-[0.28em] uppercase text-on-light/65 dark:text-on-dark/70">
          Soft girl. Dark art.
        </span>
        <div className="flex items-center gap-6 w-[46%] shrink-0">
          <OrnamentLine direction="rtl" className="h-8" />
          <span
            className="font-gothic tracking-widest shrink-0 text-[clamp(1.8rem,4vw,2.8rem)]"
            style={{ animation: 'hiPop 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}
          >Hi</span>
          <OrnamentLine direction="ltr" className="h-8" />
        </div>
        <span className="font-body text-[0.68rem] tracking-[0.15em] uppercase text-on-light/65 dark:text-on-dark/70 text-right leading-relaxed">
          Creative Developer<br />& Designer
        </span>
      </div>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="relative z-10 flex-1 flex sm:items-center w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 pt-3 sm:pt-6 pb-0">

        {/* ════ DESKTOP layout ════ */}
        <div className="hidden sm:flex w-full flex-row items-center gap-0">

          {/* Desktop Left: Text block */}
          <div className="flex-1 flex flex-col relative z-20 pr-2 sm:pr-4">
            <div className="leading-[0.86] mb-[3vw] sm:mb-10" style={{ animation: 'fadeUp 0.6s ease 0.3s both' }}>
              <span
                className="font-gothic block tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.2rem, 9vw, 11rem)', color: isDark ? '#F5F7FA' : '#0D0D0D', transition: 'color 0.5s ease' }}
              >
                {warda}
                {!wardaDone && warda.length > 0 && <Cursor />}
              </span>
              <span
                className="font-gothic block tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2.2rem, 9vw, 11rem)',
                  color: isDark ? '#F5F7FA' : '#0D0D0D',
                  transition: 'color 0.5s ease',
                  opacity: wardaDone ? undefined : 0,
                  animation: wardaDone ? 'fadeUp 0.5s 0.15s ease forwards' : 'none',
                }}
              >
                {shahid}
                {wardaDone && shahid.length < 6 && <Cursor />}
              </span>
            </div>

            <div className="min-h-[1.6rem] sm:min-h-[2.2rem] mb-[3vw] sm:mb-8">
              <span
                className="font-body font-light tracking-[0.15em] lowercase"
                style={{ fontSize: 'clamp(0.6rem, 2vw, 1.05rem)', color: isDark ? 'rgba(245,247,250,0.50)' : 'rgba(13,13,13,0.50)' }}
              >
                {subtitle}
                {subtitle.length > 0 && <Cursor />}
              </span>
            </div>

            <div style={{ animation: 'fadeUp 0.8s ease 1.1s both' }}>
              <ExploreButton isDark={isDark} />
            </div>

            <div
              style={{
                borderLeft: isDark ? '2px solid #F5F7FA' : '2px solid #0D0D0D',
                paddingLeft:   'clamp(0.75rem, 2vw, 1.5rem)',
                paddingTop:    'clamp(0.6rem, 1.5vw, 1.25rem)',
                paddingBottom: 'clamp(0.6rem, 1.5vw, 1.25rem)',
                marginTop:     'clamp(1rem, 3vw, 2.5rem)',
                animation:     'fadeUp 0.8s ease 1.2s both',
                transition: 'border-color 0.5s ease',
              }}
            >
              <p
                className="font-fell leading-[1.95] max-w-[400px]"
                style={{ fontSize: 'clamp(0.6rem, 1.8vw, 0.97rem)', color: isDark ? 'rgba(245,247,250,0.55)' : 'rgba(13,13,13,0.55)' }}
              >
                I design with emotion and intention —<br />
                where softness meets shadows.
              </p>
            </div>
          </div>

          {/* Desktop Center: Code snippet */}
          <div className="relative shrink-0 z-20 flex flex-col justify-center"
            style={{ width: 'clamp(120px, 15vw, 220px)', alignSelf: 'center' }}>
            <div
              className="font-mono font-semibold leading-[1.9] tracking-wide select-none pointer-events-none"
              style={{
                fontSize: 'clamp(0.55rem, 1.1vw, 0.88rem)',
                animation: 'fadeUp 0.8s ease 1.3s both',
                color: isDark ? 'rgba(245,247,250,0.45)' : 'rgba(13,13,13,0.45)',
              }}
            >
              {[
                { n:'01', code:<><span style={{color: isDark?'rgba(245,247,250,0.60)':'rgba(13,13,13,0.60)'}}>&lt;section </span><span style={{color: isDark?'rgba(245,247,250,0.35)':'rgba(13,13,13,0.35)'}}>class=</span><span style={{color: isDark?'rgba(245,247,250,0.75)':'rgba(13,13,13,0.75)'}}>"intro"</span><span style={{color: isDark?'rgba(245,247,250,0.60)':'rgba(13,13,13,0.60)'}}>&gt;</span></> },
                { n:'02', indent:true, code:<><span style={{color: isDark?'rgba(245,247,250,0.35)':'rgba(13,13,13,0.35)'}}>&lt;h1&gt;</span><span style={{color: isDark?'rgba(245,247,250,0.60)':'rgba(13,13,13,0.60)'}}>Warda Shahid</span><span style={{color: isDark?'rgba(245,247,250,0.35)':'rgba(13,13,13,0.35)'}}>&lt;/h1&gt;</span></> },
                { n:'03', indent:true, code:<><span style={{color: isDark?'rgba(245,247,250,0.35)':'rgba(13,13,13,0.35)'}}>&lt;p&gt;</span><span style={{color: isDark?'rgba(245,247,250,0.60)':'rgba(13,13,13,0.60)'}}>Soft girl. Dark art.</span><span style={{color: isDark?'rgba(245,247,250,0.35)':'rgba(13,13,13,0.35)'}}>&lt;/p&gt;</span></> },
                { n:'04', code:<span style={{color: isDark?'rgba(245,247,250,0.60)':'rgba(13,13,13,0.60)'}}>&lt;/section&gt;</span> },
              ].map(({ n, code, indent }) => (
                <div key={n} className={`flex gap-2 ${indent ? 'ml-3' : ''}`}>
                  <span style={{ opacity: 0.4, fontWeight: 400, width: 16, flexShrink: 0, paddingTop: 2, fontSize: 'clamp(0.45rem,0.9vw,0.7rem)' }}>{n}</span>
                  <span>{code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Right: Chandelier */}
          <div
            className="chandelier-wrap relative shrink-0 z-10"
            style={{
              opacity: 0,
              animation: `chandelierIn ${NAME_ANIM_TOTAL}ms cubic-bezier(0.4,0,0.2,1) ${NAME_ANIM_START}ms forwards`,
            }}
          >
            <img
              src="/src/assets/chandelier.png"
              alt=""
              className="w-full h-full object-contain pointer-events-none select-none"
              style={{
                filter: isDark
                  ? 'invert(1) brightness(1.2) contrast(1.2)'
                  : 'brightness(0.08) contrast(1.5)',
                transition: 'filter 0.5s ease',
              }}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* ════ MOBILE layout ════ */}
        <div className="sm:hidden w-full flex flex-col flex-1 justify-center gap-4 pb-4">

          {/* Row 1: Name + Chandelier */}
          <div className="relative flex flex-row items-flex-start w-full">
            <div className="flex flex-col z-20" style={{ width: '65%' }}>
              <div className="leading-[0.88]" style={{ animation: 'fadeUp 0.6s ease 0.3s both' }}>
                <span
                  className="font-gothic block tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(2.8rem, 13vw, 4rem)', color: isDark ? '#F5F7FA' : '#0D0D0D', transition: 'color 0.5s ease' }}
                >
                  {warda}
                  {!wardaDone && warda.length > 0 && <Cursor />}
                </span>
                <span
                  className="font-gothic block tracking-[-0.02em]"
                  style={{
                    fontSize: 'clamp(2.8rem, 13vw, 4rem)',
                    color: isDark ? '#F5F7FA' : '#0D0D0D',
                    transition: 'color 0.5s ease',
                    opacity: wardaDone ? undefined : 0,
                    animation: wardaDone ? 'fadeUp 0.5s 0.15s ease forwards' : 'none',
                  }}
                >
                  {shahid}
                  {wardaDone && shahid.length < 6 && <Cursor />}
                </span>
              </div>
              <div className="mt-2">
                <MobileCodeSnippet />
              </div>
            </div>

            <div
              className="mobile-chandelier-wrap absolute right-0 top-0 z-10 pointer-events-none"
              style={{
                opacity: 0,
                animation: `chandelierIn ${NAME_ANIM_TOTAL}ms cubic-bezier(0.4,0,0.2,1) ${NAME_ANIM_START}ms forwards`,
              }}
            >
              <img
                src="/src/assets/chandelier.png"
                alt=""
                className="w-full h-full object-contain select-none"
                style={{
                  filter: isDark
                    ? 'invert(1) brightness(1.2) contrast(1.2)'
                    : 'brightness(0.08) contrast(1.5)',
                  transition: 'filter 0.5s ease',
                }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Row 2: Subtitle */}
          <div className="min-h-[1.2rem]" style={{ animation: 'fadeUp 0.6s ease 0.8s both' }}>
            <span
              className="font-body font-light tracking-[0.15em] lowercase"
              style={{ fontSize: '0.72rem', color: isDark ? 'rgba(245,247,250,0.50)' : 'rgba(13,13,13,0.50)' }}
            >
              {subtitle}
              {subtitle.length > 0 && <Cursor />}
            </span>
          </div>

          {/* Row 3: CTA */}
          <div style={{ animation: 'fadeUp 0.8s ease 1.1s both' }}>
            <ExploreButton mobile isDark={isDark} />
          </div>

          {/* Row 4: Quote */}
          <div
            style={{
              borderLeft: isDark ? '2px solid #F5F7FA' : '2px solid #0D0D0D',
              paddingLeft: '0.85rem',
              paddingTop: '0.6rem',
              paddingBottom: '0.6rem',
              animation: 'fadeUp 0.8s ease 1.2s both',
              transition: 'border-color 0.5s ease',
            }}
          >
            <p className="font-fell leading-[1.85]" style={{ fontSize: '0.72rem', color: isDark ? 'rgba(245,247,250,0.55)' : 'rgba(13,13,13,0.55)' }}>
              I design with emotion and intention —<br />
              where softness meets shadows.
            </p>
          </div>

          {/* Row 5: Socials */}
          <MobileSocialRow isDark={isDark} />

          {/* Row 6: Bottom strip */}
          <div className="flex flex-col items-center gap-1.5 pt-6 mt-2"
            style={{ borderTop: isDark ? '1px solid rgba(245,247,250,0.15)' : '1px solid rgba(13,13,13,0.18)' }}>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(245,247,250,0.15)' : 'rgba(13,13,13,0.18)' }} />
              <span className="font-gothic shrink-0" style={{ fontSize: '0.5rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: isDark ? 'rgba(245,247,250,0.22)' : 'rgba(13,13,13,0.22)' }}>portfolio</span>
              <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(245,247,250,0.15)' : 'rgba(13,13,13,0.18)' }} />
            </div>
            <div className="flex items-center gap-3" style={{ color: isDark ? 'rgba(245,247,250,0.18)' : 'rgba(13,13,13,0.18)' }}>
              <span className="font-body" style={{ fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>art & design</span>
              <span style={{ fontSize: '0.4rem' }}>✦</span>
              <span className="font-body" style={{ fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>2026</span>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop Social Bar */}
      <div className="hidden sm:block">
        <SocialBar isDark={isDark} />
      </div>

      <DecorativeStars />
      <FloatingCircles />
      <SparkDots />

      <style>{`
        .chandelier-wrap {
          width:       clamp(130px, 38vw, 680px);
          height:      clamp(150px, 44vw, 780px);
          margin-left: clamp(-10px, -3vw, -80px);
          margin-top:  clamp(-10px, -3vw, -80px);
        }
        .mobile-chandelier-wrap {
          width:  min(52vw, 200px);
          height: min(58vw, 224px);
        }

        @keyframes drawFwd    { from{stroke-dashoffset:300}   to{stroke-dashoffset:0} }
        @keyframes drawRev    { from{stroke-dashoffset:-300}  to{stroke-dashoffset:0} }
        @keyframes ornDot     { from{opacity:0} to{opacity:1} }
        @keyframes hiPop      { 0%{opacity:0;transform:scale(0.7) translateY(-10px)} 60%{opacity:1;transform:scale(1.08) translateY(3px)} 80%{transform:scale(0.96) translateY(-1px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chandelierIn { from{opacity:0;transform:scale(0.92) translateY(-16px)} to{opacity:0.93;transform:scale(1) translateY(0)} }
        @keyframes twinkle    { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes floatY     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes sparkle    { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
        @keyframes blink      { 50%{opacity:0} }

        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 0.82em;
          background: currentColor;
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.85s step-start infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}