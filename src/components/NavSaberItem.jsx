import { useRef } from 'react'
import gsap from 'gsap'

// Keep in sync with --color-signal in index.css.
const SIGNAL = '#00e676'
const LED_WHITE = '#ffffff'

export default function NavSaberItem({ href, label, Icon, onHoverStart }) {
  const contentRef = useRef(null)

  const handleEnter = () => {
    gsap.to(contentRef.current, { color: SIGNAL, duration: 0.25, ease: 'power2.out' })
    onHoverStart?.()
  }

  const handleLeave = () => {
    gsap.to(contentRef.current, { color: LED_WHITE, duration: 0.2, ease: 'power2.in' })
  }

  return (
    <a
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative z-10 flex flex-col items-center gap-2"
    >
      <span
        ref={contentRef}
        className="led-glow flex flex-col items-center gap-2"
        style={{ color: LED_WHITE }}
      >
        <Icon className="w-7 h-7" />
        <span className="font-mono text-[10px] uppercase tracking-widest">
          {label}
        </span>
      </span>
    </a>
  )
}
