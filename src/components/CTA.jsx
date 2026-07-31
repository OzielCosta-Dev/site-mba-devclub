import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WHATSAPP_URL, WhatsAppGlyph } from './WhatsAppButton'
import NetworkField from './NetworkField'

gsap.registerPlugin(ScrollTrigger)

export default function CTA({ onOpenEnroll }) {
  const scope = useRef(null)

  useGSAP(() => {
    gsap.from('.cta-reveal', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 75%',
      },
    })
  }, { scope })

  return (
    <section
      ref={scope}
      id="comece"
      className="relative overflow-hidden px-6 lg:pl-32 lg:pr-16 py-40 border-t border-surface-2"
    >
      <NetworkField />
      <div className="pointer-events-none absolute inset-0 bg-void/40" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="cta-reveal font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
          Sua vez
        </p>
        <h2 className="cta-reveal font-display font-semibold text-4xl lg:text-6xl leading-tight mb-8">
          Daqui a 90 dias, você pode estar do outro lado dessa página.
        </h2>
        <button
          type="button"
          onClick={onOpenEnroll}
          className="cta-reveal inline-block px-9 py-4 bg-signal text-void font-semibold rounded-full hover:bg-signal-dim transition-colors"
        >
          Quero começar
        </button>
      </div>

      <footer className="relative z-10 mt-32 pt-8 border-t border-surface-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
        <span>DevClub © {new Date().getFullYear()}</span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted hover:text-signal transition-colors"
        >
          <WhatsAppGlyph className="h-4 w-4" />
          Fale com a gente no WhatsApp
        </a>
        <span>Feito por quem também começou do zero.</span>
      </footer>
    </section>
  )
}
