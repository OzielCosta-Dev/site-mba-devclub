import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const scope = useRef(null)

  useGSAP(() => {
    gsap.from('.about-reveal', {
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
      id="sobre"
      className="relative px-6 lg:pl-32 lg:pr-16 py-32"
    >
      <div className="max-w-4xl mx-auto">
        <p className="about-reveal font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
          Quem somos
        </p>
        <h2 className="about-reveal font-display font-semibold text-4xl lg:text-5xl leading-tight mb-8 max-w-2xl">
          Uma escola feita por quem programa, pra quem quer programar de
          verdade.
        </h2>
        <p className="about-reveal text-muted text-lg leading-relaxed max-w-xl">
          O DevClub nasceu porque a maioria dos cursos de programação ensina
          teoria e larga o aluno sozinho na hora de construir algo real. A
          gente inverteu essa lógica: aqui você constrói desde a primeira
          semana, erra em produção, corrige, e sai formado com projeto de
          verdade no portfólio — não com certificado de curso que ninguém
          termina.
        </p>

        <div className="about-reveal grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-10 border-t border-surface-2">
          {[
            ['12 mil+', 'alunos formados'],
            ['4.8/5', 'avaliação média'],
            ['87%', 'empregados em até 6 meses'],
            ['+300', 'empresas parceiras'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-3xl font-semibold text-signal">
                {n}
              </p>
              <p className="text-sm text-muted mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
