import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mapeia o progresso do scroll (0-1) para uma janela de revelação [start, end].
// Usado pra cada linha do título aparecer e sumir conforme a cena avança.
const fade = (p, start, end) => Math.min(1, Math.max(0, (p - start) / (end - start)))

export default function HeroJourney() {
  const section = useRef(null)
  const leg1 = useRef(null)
  const leg2 = useRef(null)
  const figure = useRef(null)
  const temple = useRef(null)
  const dunesBack = useRef(null)
  const dunesFront = useRef(null)
  const stars = useRef(null)
  const blade = useRef(null)
  const line1 = useRef(null)
  const line2 = useRef(null)
  const line3 = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    gsap.to(blade.current, {
      opacity: 0.6,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress

        const swing = Math.sin(p * Math.PI * 40) * 22
        gsap.set(leg1.current, { rotate: swing, transformOrigin: '50% 0%' })
        gsap.set(leg2.current, { rotate: -swing, transformOrigin: '50% 0%' })
        gsap.set(figure.current, { y: Math.abs(Math.sin(p * Math.PI * 40)) * -3 })

        gsap.set(temple.current, {
          x: 520 - p * 480,
          scale: 0.55 + p * 0.85,
          transformOrigin: '50% 100%',
        })

        gsap.set(dunesBack.current, { x: -p * 120 })
        gsap.set(dunesFront.current, { x: -p * 420 })
        gsap.set(stars.current, { x: -p * 30 })

        const o1 = fade(p, 0.02, 0.14)
        const o2 = fade(p, 0.36, 0.48)
        const o3 = fade(p, 0.66, 0.8)
        const ctaO = fade(p, 0.86, 0.98)

        gsap.set(line1.current, { opacity: o1, y: (1 - o1) * 16 })
        gsap.set(line2.current, { opacity: o2, y: (1 - o2) * 16 })
        gsap.set(line3.current, { opacity: o3, y: (1 - o3) * 16 })
        gsap.set(ctaRef.current, { opacity: ctaO, y: (1 - ctaO) * 12 })
      },
    })
  }, { scope: section })

  return (
    <section ref={section} id="hero" className="relative h-screen w-full overflow-hidden bg-void">
      <svg viewBox="0 0 1600 800" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="70%" stopColor="#0f1410" />
            <stop offset="100%" stopColor="#132018" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e676" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
          </radialGradient>
          <filter id="soften"><feGaussianBlur stdDeviation="2.5" /></filter>
        </defs>

        <rect width="1600" height="800" fill="url(#sky)" />

        <g ref={stars} opacity="0.6">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 137) % 1600} cy={(i * 53) % 380} r={i % 5 === 0 ? 1.6 : 0.9} fill="#f2f1ea" />
          ))}
        </g>

        <circle cx="1180" cy="430" r="120" fill="url(#sunGlow)" />
        <circle cx="1180" cy="430" r="26" fill="#0f9d58" />
        <circle cx="1260" cy="450" r="16" fill="#00e676" />

        <g ref={temple}>
          <polygon points="0,420 40,260 80,420" fill="#1a1a1a" />
          <polygon points="70,420 120,180 170,420" fill="#131313" />
          <polygon points="160,420 195,280 230,420" fill="#1a1a1a" />
          <rect x="0" y="415" width="230" height="10" fill="#0a0a0a" />
        </g>

        <g ref={dunesBack} fill="#141814"><path d="M0,470 Q400,430 800,470 T1600,470 V800 H0 Z" /></g>
        <g ref={dunesFront} fill="#0d100d"><path d="M0,520 Q300,480 700,520 T1600,510 V800 H0 Z" /></g>

        <g transform="translate(360, 470)">
          <g ref={figure}>
            {/* pernas — macacão laranja */}
            <g ref={leg1}>
              <rect x="-11" y="0" width="10" height="44" rx="3" fill="#c9601c" />
              <rect x="-12" y="38" width="12" height="9" rx="2" fill="#2a1a12" />
            </g>
            <g ref={leg2}>
              <rect x="1" y="0" width="10" height="44" rx="3" fill="#e07a2e" />
              <rect x="0" y="38" width="12" height="9" rx="2" fill="#2a1a12" />
            </g>

            {/* mochila */}
            <rect x="-24" y="-66" width="15" height="32" rx="4" fill="#4a3524" stroke="#6b4a30" strokeWidth="1" />

            {/* tronco — macacão laranja por baixo do colete marrom */}
            <path d="M-15,-72 Q0,-82 15,-72 L18,-2 L-18,-2 Z" fill="#e07a2e" />
            <path d="M-17,-70 L-4,-64 L-4,-4 L-19,-4 Z" fill="#5c3f28" stroke="#3d2a1a" strokeWidth="1" />
            <path d="M17,-70 L4,-64 L4,-4 L19,-4 Z" fill="#5c3f28" stroke="#3d2a1a" strokeWidth="1" />
            <rect x="-6" y="-8" width="12" height="6" rx="1" fill="#c9a227" />

            {/* cabeça */}
            <circle cx="0" cy="-92" r="13" fill="#c98a5e" />

            {/* cabelo azul */}
            <path
              d="M-14,-98 Q-16,-114 -2,-118 Q14,-120 16,-104 Q17,-96 12,-92 Q16,-100 6,-104 Q-4,-107 -8,-98 Q-11,-90 -15,-92 Q-16,-95 -14,-98 Z"
              fill="#2b3f8f"
            />
            <path d="M10,-104 Q14,-98 10,-90 Q16,-96 14,-106 Z" fill="#3a52b0" />

            {/* lâmina de energia brilhante */}
            <g ref={blade}>
              <rect x="21" y="-72" width="3" height="58" fill="#4fd1ff" filter="url(#soften)" />
              <rect x="21" y="-72" width="3" height="58" fill="#bff2ff" />
              <rect x="19" y="-16" width="7" height="10" rx="1.5" fill="#3a3a3a" />
            </g>
          </g>
        </g>
      </svg>

      <div className="relative h-full flex items-center px-6 lg:pl-32 lg:pr-16">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
            DevClub · Escola de Programadores
          </p>
          <h1 className="font-display font-semibold text-[13vw] lg:text-[4.2vw] leading-[0.95] tracking-tight">
            <span ref={line1} className="block text-ink" style={{ opacity: 0 }}>De curioso</span>
            <span ref={line2} className="block text-muted" style={{ opacity: 0 }}>a</span>
            <span ref={line3} className="block text-signal" style={{ opacity: 0 }}>contratado.</span>
          </h1>
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <a href="#formacoes" className="px-7 py-3.5 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors">
              Ver formações
            </a>
          </div>
        </div>
      </div>

      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted animate-pulse">
        role pra continuar
      </p>
    </section>
  )
}