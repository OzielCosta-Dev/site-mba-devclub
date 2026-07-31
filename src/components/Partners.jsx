import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NetworkField from './NetworkField'

gsap.registerPlugin(ScrollTrigger)

const PARTNERS = [
  'Nubank',
  'iFood',
  'Stone',
  'Magalu',
  'Mercado Livre',
  'Loft',
  'QuintoAndar',
  'Creditas',
]

export default function Partners() {
  const scope = useRef(null)

  useGSAP(() => {
    gsap.from('.partners-track', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 80%',
      },
    })
  }, { scope })

  return (
    <section
      ref={scope}
      id="empresas"
      className="relative py-32 border-t border-surface-2 overflow-hidden"
    >
      <NetworkField />
      <div className="relative z-10 px-6 lg:pl-32 lg:pr-16 max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
          Empresas parceiras
        </p>
        <h2 className="font-display font-semibold text-4xl lg:text-5xl leading-tight mb-16 max-w-xl">
          Quem contrata quem sai daqui.
        </h2>
      </div>

      <div className="partners-track relative z-10 w-screen left-1/2 -translate-x-1/2">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-3xl lg:text-4xl font-semibold text-muted/50 hover:text-signal transition-colors duration-300 px-10 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-48 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-48 bg-gradient-to-l from-void to-transparent" />
      </div>
    </section>
  )
}
