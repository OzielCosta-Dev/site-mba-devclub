import { Fragment, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import NavSaberItem from './NavSaberItem'

// Mirrors NavSaberItem's own box model (w-7 h-7 icon slot + gap-2 +
// label-sized spacer) so decorative pieces land on the exact same
// vertical center as the real icons, with zero magic-number guessing.
function IconSlot({ children }) {
  return (
    <div className="flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
      <div className="w-7 h-7 flex items-center justify-center">{children}</div>
      <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 select-none">
        ·
      </span>
    </div>
  )
}

function Hilt() {
  return (
    <IconSlot>
      <div className="w-8 h-2.5 rounded-[1px] bg-surface-2 border border-muted/40 flex items-center justify-center gap-[3px]">
        <span className="w-px h-1.5 bg-muted/50" />
        <span className="w-px h-1.5 bg-muted/50" />
        <span className="w-px h-1.5 bg-muted/50" />
        <span className="w-px h-1.5 bg-muted/50" />
      </div>
    </IconSlot>
  )
}

// Sits only in the gap between two icons — never behind an icon's own
// artwork — so it never competes with icon legibility. Off by default
// (scale-x-0 / opacity-0); NavSaber below decides which ones ignite.
function Segment() {
  return (
    <IconSlot>
      <div className="relative w-8 h-px">
        <div className="saber-glow absolute -top-1 inset-x-0 h-2 bg-signal blur-[5px] opacity-0" />
        <div className="saber-blade absolute top-0 left-0 h-[1.5px] w-full bg-signal/70 origin-left scale-x-0" />
      </div>
    </IconSlot>
  )
}

export default function NavSaber({ items }) {
  const scope = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useGSAP(
    () => {
      const blades = gsap.utils.toArray('.saber-blade')
      const glows = gsap.utils.toArray('.saber-glow')

      blades.forEach((blade, i) => {
        const lit = hoveredIndex !== null && i <= hoveredIndex
        gsap.to(blade, {
          scaleX: lit ? 1 : 0,
          duration: lit ? 0.28 : 0.18,
          ease: lit ? 'power2.out' : 'power2.in',
        })
        gsap.to(glows[i], {
          opacity: lit ? 1 : 0,
          duration: lit ? 0.32 : 0.15,
        })
      })
    },
    { dependencies: [hoveredIndex], scope }
  )

  return (
    <div ref={scope} className="flex items-center" onMouseLeave={() => setHoveredIndex(null)}>
      <Hilt />
      {items.map((item, i) => (
        <Fragment key={item.href}>
          <Segment />
          <NavSaberItem
            href={item.href}
            label={item.label}
            Icon={item.Icon}
            onHoverStart={() => setHoveredIndex(i)}
          />
        </Fragment>
      ))}
      <Segment />
    </div>
  )
}
