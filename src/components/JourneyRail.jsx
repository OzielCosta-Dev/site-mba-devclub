import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// The milestones map to the emotional stage of a student at each section.
// This is the page's signature element: a single thread that ties every
// section together into one journey, instead of six disconnected blocks.
const MILESTONES = [
  { pct: 0, label: 'curioso' },
  { pct: 20, label: 'decidiu' },
  { pct: 40, label: 'estudando' },
  { pct: 60, label: 'evoluindo' },
  { pct: 80, label: 'contratado' },
  { pct: 100, label: 'sua vez' },
]

export default function JourneyRail() {
  const fillRef = useRef(null)
  const glowRef = useRef(null)
  const dotRef = useRef(null)
  const markersRef = useRef([])

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        const pct = self.progress * 100
        gsap.set(fillRef.current, { height: `${pct}%` })
        gsap.set(glowRef.current, { height: `${pct}%` })
        gsap.set(dotRef.current, { top: `${pct}%` })

        markersRef.current.forEach((el, i) => {
          if (!el) return
          const reached = pct >= MILESTONES[i].pct - 2
          el.dataset.reached = reached ? 'true' : 'false'
        })
      },
    })
  }, [])

  return (
    <div
      className="fixed left-6 top-0 h-screen w-px z-40 hidden lg:block pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative h-[70vh] top-[15vh] w-px bg-surface-2">
        {/* hilt — same visual language as the header's saber, rotated
            for a vertical blade */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-2.5 h-7 rounded-[1px] bg-surface-2 border border-muted/40 flex flex-col items-center justify-center gap-[3px]">
          <span className="w-1.5 h-px bg-muted/50" />
          <span className="w-1.5 h-px bg-muted/50" />
          <span className="w-1.5 h-px bg-muted/50" />
        </div>

        <div
          ref={glowRef}
          className="absolute top-0 -left-[2.5px] w-[6px] bg-signal blur-[6px] opacity-70"
          style={{ height: '0%' }}
        />
        <div
          ref={fillRef}
          className="absolute top-0 left-0 w-px bg-signal shadow-[0_0_8px_var(--color-signal)]"
          style={{ height: '0%' }}
        />
        <div
          ref={dotRef}
          className="absolute -left-[3px] w-[7px] h-[7px] rounded-full bg-signal shadow-[0_0_10px_var(--color-signal)]"
          style={{ top: '0%' }}
        />

        {MILESTONES.map((m, i) => (
          <div
            key={m.label}
            ref={(el) => (markersRef.current[i] = el)}
            data-reached="false"
            className="group absolute -left-[2px] flex items-center gap-3"
            style={{ top: `${m.pct}%` }}
          >
            <span className="block w-[5px] h-[5px] rounded-full bg-surface-2 group-data-[reached=true]:bg-signal transition-colors duration-300" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-data-[reached=true]:text-signal transition-colors duration-300 -translate-y-1/2 mt-[2px]">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
