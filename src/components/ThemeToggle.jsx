import React from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const css = `
.themeToggle {
  color: #3a3a3a;
  width: 1.1em;
}
.st-sunMoonThemeToggleBtn {
  position: relative;
  cursor: pointer;
  display: block;
}
.st-sunMoonThemeToggleBtn .themeToggleInput {
  opacity: 0;
  width: 100%;
  aspect-ratio: 1;
  position: absolute;
  inset: 0;
  cursor: pointer;
  margin: 0;
}
.st-sunMoonThemeToggleBtn svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
  transform: rotate(40deg);
  pointer-events: none;
}
.st-sunMoonThemeToggleBtn svg .sunMoon {
  transform-origin: center center;
  transition: inherit;
  transform: scale(1);
}
.st-sunMoonThemeToggleBtn svg .sunRay {
  transform-origin: center center;
  transform: scale(0);
}
.st-sunMoonThemeToggleBtn svg mask > circle {
  transition: transform 0.64s cubic-bezier(0.41, 0.64, 0.32, 1.575);
  transform: translate(0px, 0px);
}
.st-sunMoonThemeToggleBtn svg .sunRay2 { animation-delay: 0.05s !important; }
.st-sunMoonThemeToggleBtn svg .sunRay3 { animation-delay: 0.1s !important; }
.st-sunMoonThemeToggleBtn svg .sunRay4 { animation-delay: 0.17s !important; }
.st-sunMoonThemeToggleBtn svg .sunRay5 { animation-delay: 0.25s !important; }
.st-sunMoonThemeToggleBtn svg .sunRay6 { animation-delay: 0.29s !important; }
.st-sunMoonThemeToggleBtn .themeToggleInput:checked ~ svg {
  transform: rotate(90deg);
}
.st-sunMoonThemeToggleBtn .themeToggleInput:checked ~ svg mask > circle {
  transform: translate(16px, -3px);
}
.st-sunMoonThemeToggleBtn .themeToggleInput:checked ~ svg .sunMoon {
  transform: scale(0.55);
}
.st-sunMoonThemeToggleBtn .themeToggleInput:checked ~ svg .sunRay {
  animation: showRay1832 0.4s ease 0s 1 forwards;
}
@keyframes showRay1832 {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
.theme-pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tp-size, 40px);
  height: var(--tp-size, 40px);
  border-radius: 999px;
  background: rgba(255,255,255,0.55);
  box-shadow: 0 1px 8px rgba(0,0,0,0.08);
  flex-shrink: 0;
  transition: background 0.3s ease, box-shadow 0.3s ease, width 0.5s ease, height 0.5s ease;
}
.theme-pill:hover {
  background: rgba(255,255,255,0.8);
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
}
`

export default function ThemeToggle({ scrolled }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const size = scrolled ? 36 : 40
  const iconSize = scrolled ? 16 : 17

  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div className="theme-pill" style={{ '--tp-size': `${size}px` }}>
      <label htmlFor="themeToggle" className="themeToggle st-sunMoonThemeToggleBtn">
        <input
          type="checkbox"
          id="themeToggle"
          className="themeToggleInput"
          checked={isDark}
          onChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="currentColor" stroke="none">
          <mask id="moon-mask">
            <rect x="0" y="0" width="20" height="20" fill="white" />
            <circle cx="11" cy="3" r="8" fill="black" />
          </mask>
          <circle className="sunMoon" cx="10" cy="10" r="8" mask="url(#moon-mask)" />
          <g>
            <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5" />
            <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5" />
            <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5" />
            <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5" />
            <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5" />
            <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5" />
          </g>
        </svg>
      </label>
    </div>
  )
}