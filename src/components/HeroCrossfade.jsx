import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import scene1 from '../assets/hero/scene-1-courtyard.jpg'
import scene2 from '../assets/hero/scene-2-archway.jpg'
import scene3 from '../assets/hero/scene-3-entrance.jpg'

gsap.registerPlugin(ScrollTrigger)

const scenes = [scene3, scene1, scene2]

// Rampa linear de p (0-1) mapeada pra uma janela [start, end], presa entre
// 0 e 1. É o único bloco de cálculo do componente — tanto o crossfade das
// imagens quanto as entradas/saídas do título e do CTA são só essa rampa
// aplicada com pontos de início/fim diferentes.
const fade = (p, start, end) => Math.min(1, Math.max(0, (p - start) / (end - start)))

const SEGMENT = 1 / 3 // cada imagem ocupa um terço do progresso total do scroll
const TRANSITION = SEGMENT * 0.12 // largura da zona de crossfade nas bordas do segmento

export default function HeroCrossfade() {
  const section = useRef(null)
  const imageRefs = useRef([])
  const line1 = useRef(null)
  const line2 = useRef(null)
  const line3 = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    const update = (p) => {
      scenes.forEach((_, i) => {
        const segStart = i * SEGMENT
        const segEnd = segStart + SEGMENT
        const isFirst = i === 0
        const isLast = i === scenes.length - 1

        // Duas rampas independentes: uma de entrada (na borda de início do
        // segmento) e uma de saída (na borda de fim). A primeira imagem não
        // precisa de entrada (já começa visível) e a última não precisa de
        // saída (fica visível até o fim), então essas rampas ficam travadas
        // em 1.
        const fadeIn = isFirst ? 1 : fade(p, segStart - TRANSITION, segStart + TRANSITION)
        const fadeOut = isLast ? 1 : 1 - fade(p, segEnd - TRANSITION, segEnd + TRANSITION)
        const opacity = Math.min(fadeIn, fadeOut)

        // O zoom (Ken Burns) roda por toda a janela em que a imagem está ao
        // menos parcialmente visível — segmento + as duas zonas de
        // transição — pra escala nunca "pular" quando a opacidade começa
        // ou termina de mudar.
        const zoomProgress = fade(p, segStart - TRANSITION, segEnd + TRANSITION)
        const scale = 1.08 - 0.05 * zoomProgress

        gsap.set(imageRefs.current[i], { opacity, scale })
      })

      const o1 = Math.min(fade(p, 0.02, 0.1), 1 - fade(p, 0.24, 0.32))
      const o2 = Math.min(fade(p, 0.36, 0.44), 1 - fade(p, 0.58, 0.66))
      const o3 = fade(p, 0.7, 0.78)
      // Encaixa no vão entre a linha "a contratado." terminar de entrar
      // (0.78) e o CTA começar a entrar (0.86) — a legenda tem essa janela
      // só pra ela antes do botão aparecer.
      const subO = fade(p, 0.78, 0.86)
      const ctaO = fade(p, 0.86, 0.96)

      gsap.set(line1.current, { opacity: o1, y: (1 - o1) * 16 })
      gsap.set(line2.current, { opacity: o2, y: (1 - o2) * 16 })
      gsap.set(line3.current, { opacity: o3, y: (1 - o3) * 16 })
      gsap.set(subtitleRef.current, { opacity: subO, y: (1 - subO) * 16 })
      gsap.set(ctaRef.current, { opacity: ctaO, y: (1 - ctaO) * 12 })
    }

    ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    })

    update(0)
  }, { scope: section })

  return (
    <section ref={section} id="hero" className="relative h-screen w-full overflow-hidden bg-void">
      <div className="absolute inset-0">
        {scenes.map((src, i) => (
          <img
            key={src}
            ref={(el) => { imageRefs.current[i] = el }}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/10" />
      <div className="absolute inset-0 bg-void/30" />

      <div className="relative h-full flex items-center px-6 lg:pl-32 lg:pr-16">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
            DevClub · Escola de Programadores
          </p>
          <h1 className="font-display font-semibold text-[13vw] lg:text-[4.2vw] leading-[0.95] tracking-tight">
            <span ref={line1} className="block text-ink" style={{ opacity: 0 }}>De curioso</span>
            <span ref={line2} className="block text-muted" style={{ opacity: 0 }}>a se impressionando</span>
            <span ref={line3} className="block text-signal" style={{ opacity: 0 }}>a contratado.</span>
          </h1>
          <p ref={subtitleRef} className="mt-6 font-mono text-sm lg:text-base text-muted max-w-md" style={{ opacity: 0 }}>
            Aperte os cintos e viaje pelo espaço de possibilidades.
          </p>
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
