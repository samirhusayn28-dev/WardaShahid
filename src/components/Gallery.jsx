import React, { useState, useEffect, useRef, useCallback } from 'react'

const artworks = [
  { src: 'https://i.pinimg.com/736x/b6/01/0d/b6010d89190c3312a654891f779e521a.jpg' },
  { src: 'https://i.pinimg.com/736x/79/06/56/790656effdbb04cb32b26d3228a7e351.jpg' },
  { src: 'https://i.pinimg.com/736x/e7/ac/42/e7ac42d5aa126da07245503f57d3e1d6.jpg' },
  { src: 'https://i.pinimg.com/736x/cc/48/9b/cc489bf64f906e0ec7d3a722523df194.jpg' },
  { src: 'https://i.pinimg.com/736x/e6/b9/d4/e6b9d40c5ecf2f92892f6a262935e400.jpg' },
  { src: 'https://i.pinimg.com/736x/56/d1/4b/56d14b480414ea954485264236d7a47a.jpg' },
  { src: 'https://i.pinimg.com/736x/d9/bf/8f/d9bf8fc08beb41c0b50505c75beccc4f.jpg' },
  { src: 'https://i.pinimg.com/736x/3f/c8/bc/3fc8bc4f41dff70b8fddfcce3872b89f.jpg' },
]

const GAP = 8

function makeLayout(cols, rows, defs) {
  return { cols, rows, slots: defs.map(([c,r,cw,rh]) => ({c,r,cw,rh})) }
}

function toPixelRect({c,r,cw,rh}, cellW, cellH) {
  return {
    x: c  * (cellW + GAP),
    y: r  * (cellH + GAP),
    w: cw * cellW  + (cw-1) * GAP,
    h: rh * cellH  + (rh-1) * GAP,
  }
}

const LAYOUTS = [
  makeLayout(12, 6, [
    [0, 0, 7, 3], [7, 0, 5, 2], [7, 2, 3, 1], [10, 2, 2, 1],
    [0, 3, 3, 3], [3, 3, 3, 3], [6, 3, 3, 3], [9, 3, 3, 3],
  ]),
  makeLayout(12, 6, [
    [0,  0, 12, 2], [0,  2,  4, 2], [4,  2,  4, 2],
    [8,  2,  4, 2], [0,  4,  3, 2], [3,  4,  3, 2], [6,  4,  3, 2], [9,  4,  3, 2],
  ]),
  makeLayout(12, 6, [
    [0,  0,  5, 4], [5,  0,  4, 2], [9,  0,  3, 2],
    [5,  2,  4, 2], [9,  2,  3, 2], [0,  4,  4, 2], [4,  4,  4, 2], [8,  4,  4, 2],
  ]),
  makeLayout(12, 6, [
    [0,  0,  3, 3], [3,  0,  6, 3], [9,  0,  3, 3],
    [0,  3,  3, 3], [9,  3,  3, 3], [3,  3,  2, 3], [5,  3,  2, 3], [7,  3,  2, 3],
  ]),
]

const MLAYOUTS = [
  makeLayout(6, 8, [
    [0, 0, 6, 2], [0, 2, 3, 2], [3, 2, 3, 2],
    [0, 4, 3, 2], [3, 4, 3, 2], [0, 6, 2, 2], [2, 6, 2, 2], [4, 6, 2, 2],
  ]),
  makeLayout(6, 8, [
    [0, 0, 3, 2], [3, 0, 3, 2], [0, 2, 6, 2],
    [0, 4, 3, 2], [3, 4, 3, 2], [0, 6, 2, 2], [2, 6, 2, 2], [4, 6, 2, 2],
  ]),
  makeLayout(6, 8, [
    [0, 0, 3, 4], [3, 0, 3, 2], [3, 2, 3, 2],
    [0, 4, 3, 2], [3, 4, 3, 2], [0, 6, 2, 2], [2, 6, 2, 2], [4, 6, 2, 2],
  ]),
]

const PAIRS = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
  [0,3],[1,4],[2,5],[3,6],[4,7],[0,6],[1,5],[2,7],
]

const css = `
  @keyframes fadeUp {
    from{opacity:0;transform:translate3d(0,18px,0)}
    to{opacity:1;transform:translate3d(0,0,0)}
  }
  @keyframes lbIn {
    from{opacity:0;transform:scale(0.94)}
    to{opacity:1;transform:scale(1)}
  }
  @keyframes overlayIn{from{opacity:0}to{opacity:1}}

  @media(prefers-reduced-motion:reduce){
    .gal-eyebrow,.gal-heading,.gal-subtitle,.gal-ornament,.gal-more-wrap,
    .gal-lb,.gal-lb-box,.gal-card{
      animation:none!important;transition:none!important;
      opacity:1!important;transform:none!important;
    }
  }

  .gal-section{padding:80px 48px 90px;position:relative}
  .gal-inner{max-width:1160px;margin:0 auto}
  @media(max-width:1024px){.gal-section{padding:64px 32px 76px}}
  @media(max-width:720px){.gal-section{padding:56px 18px 64px}}
  @media(max-width:480px){.gal-section{padding:44px 14px 52px}}

  .gal-eyebrow{
    text-align:center;font-family:'Cinzel Decorative',serif;
    font-size:9.5px;letter-spacing:0.38em;text-transform:uppercase;
    margin-bottom:16px;
    opacity:0;animation:fadeUp 0.6s ease 0.1s forwards
  }
  .gal-heading{
    text-align:center;font-family:'Cinzel Decorative',serif;
    font-size:clamp(1.6rem,3vw,2.6rem);font-weight:700;
    letter-spacing:0.03em;margin-bottom:14px;
    opacity:0;animation:fadeUp 0.6s ease 0.18s forwards
  }
  .gal-subtitle{
    text-align:center;font-family:'Inter',sans-serif;
    font-size:13.5px;line-height:1.75;margin-bottom:28px;
    opacity:0;animation:fadeUp 0.6s ease 0.24s forwards
  }
  @media(max-width:480px){.gal-subtitle{font-size:12.5px;margin-bottom:20px;padding:0 8px}}

  .gal-ornament{
    display:flex;align-items:center;justify-content:center;
    gap:12px;margin-bottom:48px;
    opacity:0;animation:fadeUp 0.5s ease 0.3s forwards
  }
  @media(max-width:480px){.gal-ornament{margin-bottom:32px}}
  .gal-orn-line{width:72px;height:1px;}
  .gal-orn-dot{width:5px;height:5px;transform:rotate(45deg);opacity:0.75}

  .gal-grid{position:relative;width:100%}

  .gal-card{
    position:absolute;border-radius:10px;overflow:hidden;cursor:zoom-in;
    opacity:0;
    transition:
      left   1.0s cubic-bezier(0.65,0,0.35,1),
      top    1.0s cubic-bezier(0.65,0,0.35,1),
      width  1.0s cubic-bezier(0.65,0,0.35,1),
      height 1.0s cubic-bezier(0.65,0,0.35,1),
      opacity 0.55s ease;
    will-change:left,top,width,height
  }
  .gal-card.gal-visible{opacity:1}

  .gal-card img{
    width:100%;height:100%;object-fit:cover;display:block;
    transition:transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.35s ease;
    filter:brightness(0.91) sepia(0.05);
    backface-visibility:hidden
  }

  .gal-shine{
    position:absolute;inset:0;
    background:linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%);
    transform:translateX(-120%);
    pointer-events:none;
    transition:transform 0.65s ease;
    z-index:2;
  }

  @media(hover:hover) and (pointer:fine){
    .gal-card:hover img{transform:scale(1.055);filter:brightness(1.02) sepia(0)}
    .gal-card:hover .gal-ring{box-shadow:inset 0 0 0 1.5px var(--border)}
    .gal-card:hover .gal-shine{transform:translateX(120%)}
  }
  .gal-card:active img{transform:scale(1.02)}
  .gal-ring{
    position:absolute;inset:0;border-radius:10px;
    transition:box-shadow 0.3s ease;pointer-events:none
  }

  .gal-more-wrap{
    text-align:center;margin-top:40px;
    opacity:0;animation:fadeUp 0.5s ease 0.5s forwards
  }

  .gal-more-btn{
    display:inline-flex;align-items:center;gap:8px;
    border-radius:999px;border:none;
    padding:11px 30px;font-family:'Cinzel Decorative',serif;
    font-size:9px;letter-spacing:0.2em;cursor:pointer;
    color:#F5F7FA;
    background:rgba(57,62,70,0.80);
    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);
    box-shadow:0 2px 16px rgba(0,0,0,0.30);
    position:relative;overflow:hidden;
    transition:background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  }
  .gal-more-btn::after{
    content:'';
    position:absolute;inset:0;
    background:linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
    transform:translateX(-100%);
    transition:transform 0.65s ease;
    pointer-events:none;
  }
  @media(hover:hover) and (pointer:fine){
    .gal-more-btn:hover{
      background:rgba(74,80,90,0.92);
      box-shadow:0 10px 30px rgba(0,0,0,0.45);
      transform:translateX(4px);
    }
    .gal-more-btn:hover::after{ transform:translateX(100%); }
  }
  @media(max-width:480px){.gal-more-btn{padding:10px 24px;font-size:8.5px}}

  .gal-lb{
    position:fixed;inset:0;z-index:9999;
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    display:flex;align-items:center;justify-content:center;padding:32px;
    animation:overlayIn 0.22s ease forwards
  }
  @media(max-width:480px){.gal-lb{padding:16px}}
  .gal-lb-box{
    max-width:680px;width:100%;border-radius:12px;overflow:hidden;
    animation:lbIn 0.28s cubic-bezier(0.34,1.1,0.64,1) forwards;
    box-shadow:0 40px 100px rgba(0,0,0,0.6),0 0 0 1px var(--border)
  }
  .gal-lb-box img{display:block;width:100%;height:auto;max-height:85vh;object-fit:contain}
  .gal-lb-close{
    position:fixed;top:20px;right:24px;border-radius:50%;
    width:40px;height:40px;font-size:14px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:background 0.2s
  }
  @media(max-width:480px){.gal-lb-close{top:12px;right:14px;width:36px;height:36px}}
`

export default function Gallery() {
  const [active, setActive]     = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [cellW, setCellW]       = useState(0)
  const [cellH, setCellH]       = useState(0)
  const [gridH, setGridH]       = useState(0)
  const [visible, setVisible]   = useState(Array(8).fill(false))
  const [assignments, setAssignments] = useState([0,1,2,3,4,5,6,7])
  const pairCursor = useRef(0)
  const gridRef    = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    if (document.getElementById('gal-styles')) return
    const el = document.createElement('style')
    el.id = 'gal-styles'; el.textContent = css
    document.head.appendChild(el)
    return () => document.getElementById('gal-styles')?.remove()
  }, [])

  const measure = useCallback(() => {
    const el = gridRef.current
    if (!el) return
    const cw = el.offsetWidth
    const mobile = cw < 640
    setIsMobile(mobile)

    if (mobile) {
      const cWpx = (cw - GAP * 5) / 6
      const cHpx = cWpx * 1.15
      setCellW(cWpx)
      setCellH(cHpx)
      setGridH(Math.round(8 * cHpx + 7 * GAP))
    } else {
      const cWpx = (cw - GAP * 11) / 12
      const cHpx = cWpx * 1.3
      setCellW(cWpx)
      setCellH(cHpx)
      setGridH(Math.round(6 * cHpx + 5 * GAP))
    }
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (gridRef.current) ro.observe(gridRef.current)
    return () => ro.disconnect()
  }, [measure])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const i = +e.target.dataset.idx
          setVisible(v => { const n=[...v]; n[i]=true; return n })
        }
      }),
      { threshold: 0.06 }
    )
    cardRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      const [a, b] = PAIRS[pairCursor.current % PAIRS.length]
      pairCursor.current++
      setAssignments(prev => {
        const next = [...prev]
        ;[next[a], next[b]] = [next[b], next[a]]
        return next
      })
    }, 2400)
    return () => clearInterval(t)
  }, [])

  const getRect = useCallback((cardIdx) => {
    if (cellW === 0) return { x:0, y:0, w:0, h:0 }
    const layout = (isMobile ? MLAYOUTS : LAYOUTS)[0]
    const slot   = assignments[cardIdx]
    const def    = layout.slots[slot]
    return toPixelRect(def, cellW, cellH)
  }, [cellW, cellH, isMobile, assignments])

  const closeLb = useCallback(() => setActive(null), [])
  useEffect(() => {
    if (!active) return
    const fn = e => { if (e.key==='Escape') closeLb() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [active, closeLb])
  useEffect(() => {
    if (!active) return
    const p = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = p }
  }, [active])

  return (
    <section
      className="gal-section bg-surface-light dark:bg-surface-dark transition-colors duration-300"
      id="gallery"
    >
      <div className="gal-inner">
        <p className="gal-eyebrow text-on-light dark:text-on-dark">Portfolio</p>
        <h2 className="gal-heading text-on-light dark:text-on-dark">My Works</h2>
        <p className="gal-subtitle text-on-light/60 dark:text-on-dark/60">
          A collection of my pencil sketches.<br/>
          Each piece reflects my passion for detail and creativity.
        </p>
        <div className="gal-ornament">
          <div className="gal-orn-line bg-gradient-to-r from-transparent to-on-light dark:to-on-dark"/>
          <div className="gal-orn-dot bg-on-light dark:bg-on-dark"/>
          <div className="gal-orn-line r bg-gradient-to-r from-on-light dark:from-on-dark to-transparent"/>
        </div>

        <div ref={gridRef} className="gal-grid" style={{ height: gridH || 'auto' }}>
          {artworks.map((art, i) => {
            const r = getRect(i)
            return (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                data-idx={i}
                className={`gal-card group${visible[i] ? ' gal-visible' : ''}`}
                onClick={() => setActive(art)}
                style={{ left:r.x, top:r.y, width:r.w, height:r.h }}
              >
                <img
                  src={art.src}
                  alt={`Sketch ${i+1}`}
                  draggable={false}
                  loading={i===0?'eager':'lazy'}
                  decoding="async"
                />
                <div className="gal-shine" />
                <div className="gal-ring"/>
              </div>
            )
          })}
        </div>

        <div className="gal-more-wrap">
  <button
    className="gal-more-btn"
    onClick={() => window.open('https://pin.it/1knTTPkTR', '_blank', 'noopener,noreferrer')}
  >
    View More Works &nbsp;→
  </button>
</div>

        
      </div>

      {active && (
        <div className="gal-lb bg-surface-dark/85" onClick={closeLb}>
          <button className="gal-lb-close border border-on-light/25 dark:border-on-dark/25 bg-surface-light dark:bg-surface-dark text-on-light dark:text-on-dark hover:bg-on-light/10 dark:hover:bg-on-dark/10" onClick={closeLb} aria-label="Close">✕</button>
          <div className="gal-lb-box shadow-2xl ring-1 ring-on-light/25 dark:ring-on-dark/25" onClick={e => e.stopPropagation()}>
            <img src={active.src} alt="Sketch" draggable={false}/>
          </div>
        </div>
      )}
    </section>
  )
}