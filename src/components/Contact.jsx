import React, { useState, useEffect, useMemo, useRef } from 'react'
import emailjs from '@emailjs/browser'

/* ────────────────────────────────────────
   EmailJS config
──────────────────────────────────────── */
const EMAILJS_SERVICE_ID = 'service_g9jzxok'
const EMAILJS_OWNER_TEMPLATE_ID = 'template_aa9bm4n'   // sends notification TO Warda
const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_hrs32za' // sends confirmation TO sender
const EMAILJS_PUBLIC_KEY = 'nptbsV1mphfUL6bHW'

const buildCss = () => `
  @keyframes ctFadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .ct-section {
    padding: 80px 64px 100px;
  }
  .ct-inner {
    max-width: 1160px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.45fr;
    gap: 64px;
    align-items: start;
  }

  /* ── Left ── */
  .ct-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ct-eyebrow-line {
    display: block;
    width: 28px;
    height: 1.5px;
    background: var(--accent);
    border-radius: 999px;
  }
  .ct-heading {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(1.5rem, 2.8vw, 2.4rem);
    font-weight: 700;
    line-height: 1.3;
    margin: 0 0 20px;
    letter-spacing: 0.02em;
    color: #0D0D0D;
  }
  .dark .ct-heading {
    color: #F5F7FA;
  }
  .ct-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14.5px;
    font-weight: 300;
    line-height: 1.85;
    margin-bottom: 36px;
    max-width: 340px;
    color: rgba(13,13,13,0.62);
  }
  .dark .ct-desc {
    color: rgba(245,247,250,0.65);
  }
  .ct-sketch {
    width: 100%;
    max-width: 340px;
    margin-bottom: 40px;
    opacity: 0.88;
  }
  .ct-sketch img {
    width: 100%;
    height: auto;
    display: block;
    filter: sepia(0.12) contrast(0.95);
  }

  /* contact info — desktop */
  .ct-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    max-width: 380px;
  }
  .ct-info-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .ct-info-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(13,13,13,0.06);
    color: var(--accent);
  }
  .dark .ct-info-icon {
    background: rgba(245,247,250,0.08);
  }
  .ct-info-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2px;
    color: rgba(13,13,13,0.45);
  }
  .dark .ct-info-label {
    color: rgba(245,247,250,0.45);
  }
  .ct-info-val {
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #0D0D0D;
  }
  .dark .ct-info-val {
    color: #F5F7FA;
  }

  /* ── Right ── */
  .ct-right {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ────────────────────────────────────────
     GLASSMORPHISM — shared base for cards / buttons / tiles
  ──────────────────────────────────────── */
  .ct-glass {
    position: relative;
    overflow: hidden;
    background: rgba(57,62,70,0.80);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: none;
    box-shadow: 0 2px 16px rgba(0,0,0,0.30);
    transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }
  .ct-glass::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
    transform: translateX(-100%);
    transition: transform 0.65s ease;
    pointer-events: none;
  }
  .ct-glass:hover::after {
    transform: translateX(100%);
  }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .ct-glass {
      background: rgba(40,44,50,0.97);
    }
  }

  /* form card — big card, blur(28px) */
  .ct-card {
    border-radius: 18px;
    padding: 32px;
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
  }
  .ct-card:hover {
    background: rgba(74,80,90,0.92);
    box-shadow: 0 10px 30px rgba(0,0,0,0.45);
  }
  .ct-card-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.05em;
    color: #F5F7FA;
  }
  .ct-card-title-line {
    flex: 1;
    height: 1px;
    background: rgba(245,247,250,0.25);
  }

  .ct-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .ct-field { margin-bottom: 14px; }
  .ct-field:last-of-type { margin-bottom: 0; }

  .ct-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    display: block;
    margin-bottom: 7px;
    letter-spacing: 0.01em;
    color: rgba(245,247,250,0.65);
  }
  .ct-input,
  .ct-textarea {
    width: 100%;
    border-radius: 10px;
    padding: 11px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 300;
    border: none;
    outline: none;
    transition: box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
    background: rgba(245,247,250,0.08);
    color: #F5F7FA;
  }
  .ct-textarea {
    resize: vertical;
    min-height: 130px;
  }
  .ct-input::placeholder,
  .ct-textarea::placeholder {
    color: rgba(245,247,250,0.35);
  }
  .ct-input:focus,
  .ct-textarea:focus {
    box-shadow: 0 0 0 2px rgba(245,247,250,0.25);
    background: rgba(245,247,250,0.12);
  }
  .ct-input:disabled,
  .ct-textarea:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* Glassmorphism Button */
  .ct-btn {
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.01em;
    will-change: transform;
    color: #F5F7FA;
  }
  .ct-btn:hover {
    background: rgba(74,80,90,0.92);
    box-shadow: 0 10px 30px rgba(0,0,0,0.45);
    transform: translateY(-3px);
  }
  .ct-btn:active { transform: translateY(-1px); }
  .ct-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  .ct-btn:disabled:hover {
    background: rgba(57,62,70,0.80);
    box-shadow: 0 2px 16px rgba(0,0,0,0.30);
  }

  .ct-spinner {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid rgba(245,247,250,0.35);
    border-top-color: #F5F7FA;
    animation: ct-spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes ct-spin {
    to { transform: rotate(360deg); }
  }

  .ct-status {
    margin-top: 14px;
    font-family: 'Inter', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    border-radius: 10px;
    padding: 10px 14px;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  .ct-status.ct-status-show {
    opacity: 1;
    transform: translateY(0);
  }
  .ct-status-success {
    background: rgba(74,160,110,0.20);
    color: #BCE8CE;
  }
  .ct-status-error {
    background: rgba(200,80,80,0.20);
    color: #F3C2C2;
  }

  /* quote card */
  .ct-quote-card {
    border-radius: 16px;
    padding: 24px 28px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .ct-quote-card:hover {
    background: rgba(74,80,90,0.92);
    box-shadow: 0 10px 30px rgba(0,0,0,0.45);
    transform: translateX(4px);
  }
  .ct-quote-mark {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    line-height: 0.7;
    flex-shrink: 0;
    margin-top: 4px;
    color: #F5F7FA;
  }
  .ct-quote-text {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 15px;
    line-height: 1.75;
    color: rgba(245,247,250,0.78);
  }

  /* ────────────────────────────────────────
     BENTO — mobile only (info tiles)
  ──────────────────────────────────────── */
  .ct-bento-grid { display: none; }

  /* ── Tablet (≤ 860px) ── */
  @media (max-width: 860px) {
    .ct-section { padding: 60px 32px 80px; }
    .ct-inner   { grid-template-columns: 1fr; gap: 48px; }
    .ct-sketch  { max-width: 260px; }
    .ct-row     { grid-template-columns: 1fr; }
    .ct-card    { padding: 28px; }
  }

  /* ── Mobile L (≤ 480px) — bento activates ── */
  @media (max-width: 480px) {
    .ct-section { padding: 48px 18px 64px; }
    .ct-inner   { gap: 36px; }
    .ct-heading { font-size: clamp(1.25rem, 6vw, 1.6rem); margin-bottom: 14px; }
    .ct-desc    { font-size: 14px; margin-bottom: 24px; max-width: 100%; }
    .ct-sketch  { max-width: 200px; margin-bottom: 24px; }

    /* hide normal info list, show bento */
    .ct-info-grid  { display: none; }
    .ct-bento-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 10px;
      width: 100%;
    }

    /* tile base */
    .ct-bento-tile {
      border-radius: 16px;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ct-bento-tile:active {
      transform: scale(0.97);
      background: rgba(74,80,90,0.92);
    }

    /* location tile spans full width */
    .ct-bento-tile--wide {
      grid-column: 1 / -1;
      flex-direction: row;
      align-items: center;
      gap: 14px;
    }

    .ct-bento-tile-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba(245,247,250,0.22);
      color: #F5F7FA;
    }
    .ct-bento-tile-label {
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 3px;
      color: rgba(245,247,250,0.78);
    }
    .ct-bento-tile-val {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 400;
      word-break: break-all;
      color: #F5F7FA;
    }

    /* form */
    .ct-card    { padding: 20px 16px; border-radius: 14px; }
    .ct-card-title { font-size: 12px; margin-bottom: 18px; }
    .ct-input,
    .ct-textarea { font-size: 13px; padding: 10px 12px; }
    .ct-textarea { min-height: 110px; }
    .ct-btn     { width: 100%; justify-content: center; padding: 13px 20px; }

    /* quote */
    .ct-quote-card { padding: 18px 16px; border-radius: 12px; gap: 10px; }
    .ct-quote-mark { font-size: 2.4rem; }
    .ct-quote-text { font-size: 13.5px; line-height: 1.7; }
  }

  /* ── Mobile S (≤ 360px) ── */
  @media (max-width: 360px) {
    .ct-section { padding: 40px 14px 56px; }
    .ct-heading { font-size: 1.2rem; }
    .ct-card    { padding: 16px 14px; }
    .ct-bento-tile { padding: 14px 12px; border-radius: 14px; }
    .ct-bento-tile-icon { width: 30px; height: 30px; border-radius: 8px; }
    .ct-bento-tile-val  { font-size: 12px; }
  }
`

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const LocationIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const InstaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const PencilIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const statusTimer = useRef(null)

  const cssText = useMemo(() => buildCss(), [])

  useEffect(() => {
    const el = document.createElement('style')
    el.textContent = cssText
    document.head.appendChild(el)
    return () => document.head.removeChild(el)
  }, [cssText])

  useEffect(() => () => clearTimeout(statusTimer.current), [])

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      clearTimeout(statusTimer.current)
      statusTimer.current = setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('sending')

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject || '(no subject)',
      message: form.message,
      to_email: form.email,
    }

    try {
      // 1) Notify the owner (Warda) that someone reached out
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_OWNER_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      // 2) Auto-reply confirmation back to the sender
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    } finally {
      clearTimeout(statusTimer.current)
      statusTimer.current = setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const isSending = status === 'sending'

  return (
    <section
      id="contact"
      className="ct-section bg-surface-light dark:bg-surface-dark transition-colors duration-300"
    >
      <div className="ct-inner">

        {/* ── LEFT ── */}
        <div>
          <div className="ct-eyebrow">
            <span className="ct-eyebrow-line" />
            Get In Touch
          </div>
          <h2 className="ct-heading">
            Let's Create<br />Something Beautiful
          </h2>
          <p className="ct-desc">
            Have a project in mind or want to collaborate?<br />
            I'd love to hear from you. Drop me a message<br />
            and I'll get back to you soon.
          </p>

          <div className="ct-sketch">
            <img src="/src/assets/contact-sketch.png" alt="pencil sketch" loading="lazy" />
          </div>

          {/* Desktop info list */}
          <div className="ct-info-grid">
            <div className="ct-info-item">
              <span className="ct-info-icon"><MailIcon /></span>
              <div>
                <p className="ct-info-label">Email</p>
                <p className="ct-info-val">wardashahidarts@gmail.com</p>
              </div>
            </div>
            <div className="ct-info-item">
              <span className="ct-info-icon"><InstaIcon /></span>
              <div>
                <p className="ct-info-label">Instagram</p>
                <p className="ct-info-val">@shii_warda07</p>
              </div>
            </div>
            <div className="ct-info-item">
              <span className="ct-info-icon"><LocationIcon /></span>
              <div>
                <p className="ct-info-label">Location</p>
                <p className="ct-info-val">Gujranwala, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Mobile bento tiles — glassmorphism */}
          <div className="ct-bento-grid">

            {/* Email tile */}
            <div className="ct-bento-tile ct-glass">
              <span className="ct-bento-tile-icon"><MailIcon size={17} /></span>
              <div>
                <p className="ct-bento-tile-label">Email</p>
                <p className="ct-bento-tile-val">wardashahidarts@gmail.com</p>
              </div>
            </div>

            {/* Instagram tile */}
            <div className="ct-bento-tile ct-glass">
              <span className="ct-bento-tile-icon"><InstaIcon size={17} /></span>
              <div>
                <p className="ct-bento-tile-label">Instagram</p>
                <p className="ct-bento-tile-val">@shii_warda07</p>
              </div>
            </div>

            {/* Location tile — full width */}
            <div className="ct-bento-tile ct-bento-tile--wide ct-glass">
              <span className="ct-bento-tile-icon"><LocationIcon size={17} /></span>
              <div>
                <p className="ct-bento-tile-label">Location</p>
                <p className="ct-bento-tile-val">Gujranwala, Pakistan</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="ct-right">

          <form className="ct-card ct-glass" onSubmit={handleSubmit} noValidate>
            <div className="ct-card-title">
              <PencilIcon />
              Send a Message
              <div className="ct-card-title-line" />
            </div>

            <div className="ct-row">
              <div>
                <label className="ct-label" htmlFor="ct-name">Your Name</label>
                <input
                  id="ct-name"
                  name="name"
                  className="ct-input"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  disabled={isSending}
                />
              </div>
              <div>
                <label className="ct-label" htmlFor="ct-email">Email Address</label>
                <input
                  id="ct-email"
                  name="email"
                  className="ct-input"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  disabled={isSending}
                />
              </div>
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-subject">Subject</label>
              <input
                id="ct-subject"
                name="subject"
                className="ct-input"
                placeholder="Enter subject"
                value={form.subject}
                onChange={handleChange}
                disabled={isSending}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-message">Message</label>
              <textarea
                id="ct-message"
                name="message"
                className="ct-textarea"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                disabled={isSending}
              />
            </div>

            <button type="submit" className="ct-btn ct-glass" disabled={isSending}>
              {isSending ? <span className="ct-spinner" /> : <SendIcon />}
              {isSending ? 'Sending…' : 'Send Message'}
            </button>

            <div
              className={`ct-status ${status === 'success' ? 'ct-status-success ct-status-show' : ''} ${status === 'error' ? 'ct-status-error ct-status-show' : ''}`}
              role="status"
              aria-live="polite"
            >
              {status === 'success' && "Your message has arrived safely. I'll be in touch soon — a little confirmation note is on its way to your inbox."}
              {status === 'error' && "Hmm, that didn't quite land. Please double-check the fields and send it my way again."}
            </div>
          </form>

          <div className="ct-quote-card ct-glass">
            <span className="ct-quote-mark" aria-hidden="true">"</span>
            <p className="ct-quote-text">
              Every sketch starts with a line,<br />
              and every great connection starts with a message.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}