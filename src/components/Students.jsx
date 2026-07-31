import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Galaxy from './Galaxies'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Marina Alves',
    role: 'Dev Front-End na Stone',
    quote:
      'Eu tinha zero experiência. Seis meses depois eu tava em entrevista técnica e passei de primeira.',
  },
  {
    name: 'Thiago Ramos',
    role: 'Full Stack na iFood',
    quote:
      'O que separou de outros cursos foi ter que entregar projeto real toda semana. Isso vira currículo.',
  },
  {
    name: 'Bianca Souza',
    role: 'Dev Backend na Nubank',
    quote:
      'Trocar de carreira aos 34 anos parecia loucura. Hoje ganho mais do que ganhava na área antiga.',
  },
]

// Tela de monitor com barra de título (3 pontinhos, mesma linguagem do
// notebook de Formações) e o depoimento dentro. --glow é lido do CSS
// (index.css) e escrito via JS em Students() — daí o ref em vez de estado.
function MonitorScreen({ testimonial, screenRef, big }) {
  return (
    <div
      ref={screenRef}
      className="monitor-screen relative rounded-2xl border-2 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="monitor-glow pointer-events-none absolute inset-0" />
      <div className="relative flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className={`relative p-4 ${big ? 'lg:p-7' : 'lg:p-5'}`}>
        <p className={`text-ink leading-relaxed mb-4 ${big ? 'text-sm lg:text-lg' : 'text-xs lg:text-sm'}`}>
          “{testimonial.quote}”
        </p>
        <p className={`font-medium text-ink ${big ? 'text-sm' : 'text-xs'}`}>{testimonial.name}</p>
        <p className="text-[10px] lg:text-xs text-muted mt-0.5">{testimonial.role}</p>
      </div>
    </div>
  )
}

function MonitorStand({ width }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-1.5 h-6 bg-surface-2" />
      <div className={`${width} h-1.5 rounded-full bg-surface-2`} />
    </div>
  )
}

export default function Students() {
  const scope = useRef(null)
  const counterRef = useRef(null)
  const rigRef = useRef(null)
  const screenRefs = useRef([])

  useGSAP(() => {
    const counter = { value: 0 }

    gsap.to(counter, {
      value: 12847,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(
            counter.value
          ).toLocaleString('pt-BR')
        }
      },
    })

    gsap.from('.monitor-screen', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      clearProps: 'transform,translate,rotate,scale',
      scrollTrigger: {
        trigger: rigRef.current,
        start: 'top 75%',
      },
    })
  }, { scope })

  // Distância do cursor até o centro de cada tela, na janela inteira (não
  // só dentro do rig) — assim o brilho já vai subindo enquanto o mouse
  // "se aproxima" de fora, não só quando entra exatamente em cima da tela.
  useEffect(() => {
    const RADIUS = 320

    const handleMove = (e) => {
      screenRefs.current.forEach((el) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
        el.style.setProperty('--glow', Math.max(0, 1 - dist / RADIUS).toFixed(3))
      })
    }
    const handleLeave = () => {
      screenRefs.current.forEach((el) => el && el.style.setProperty('--glow', 0))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <section
      ref={scope}
      id="resultados"
      className="relative overflow-hidden px-6 lg:pl-32 lg:pr-16 py-32"
    >
      {/* Duas galáxias decorando o espaço vazio nas laterais — a Via
          Láctea (vista de cima, como sempre é ilustrada, já que ninguém
          fotografou ela de fora) e Andromeda (inclinada, como aparece em
          qualquer foto real dela). Só em telas bem largas, onde sobra
          espaço nas margens fora do conteúdo central. */}
      <div className="hidden 2xl:block absolute left-[-60px] top-1/2 -translate-y-1/2 opacity-70">
        <Galaxy variant="spiral" seed={7} size={640} duration={240} />
      </div>
      {/* legenda separada da galáxia (não centralizada embaixo dela): o
          disco sangra por trás da JourneyRail à esquerda, então o texto
          fica deslocado pra direita, fora da faixa de rótulos da régua */}
      <p className="hidden 2xl:block absolute left-[300px] top-[calc(50%+220px)] font-mono text-[10px] uppercase tracking-widest text-muted/70">
        Via Láctea
      </p>
      <div className="hidden 2xl:block absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-70">
        <Galaxy variant="tilted" seed={3} size={600} duration={280} reverse />
        <p className="text-center -mt-8 font-mono text-[10px] uppercase tracking-widest text-muted">
          Andrômeda
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
          Resultados
        </p>

        <h2 className="font-display font-semibold leading-none mb-4">
          <span
            ref={counterRef}
            className="text-[16vw] lg:text-[7vw] text-signal tabular-nums"
          >
            0
          </span>
        </h2>
        <p className="text-muted text-lg mb-20">alunos transformados em programadores.</p>

        <div ref={rigRef} className="max-w-3xl mx-auto">
          {/* barra de luz atrás do monitor de cima — mesma régua de LED da
              referência, só que na cor da marca */}
          <div className="mx-auto w-1/2 h-2 rounded-full bg-signal/60 blur-md mb-3" />

          <div className="w-[82%] mx-auto">
            <MonitorScreen
              testimonial={TESTIMONIALS[0]}
              screenRef={(el) => { screenRefs.current[0] = el }}
              big
            />
            <MonitorStand width="w-24" />
          </div>

          <div className="flex justify-center items-start gap-5 sm:gap-8 -mt-2">
            <div className="w-[46%]">
              <MonitorScreen
                testimonial={TESTIMONIALS[1]}
                screenRef={(el) => { screenRefs.current[1] = el }}
              />
              <MonitorStand width="w-16" />
            </div>
            <div className="w-[46%]">
              <MonitorScreen
                testimonial={TESTIMONIALS[2]}
                screenRef={(el) => { screenRefs.current[2] = el }}
              />
              <MonitorStand width="w-16" />
            </div>
          </div>

          {/* mesa */}
          <div className="mt-3 h-4 rounded-b-xl bg-gradient-to-b from-surface-2 to-[#0a0a0a] mx-4" />
        </div>
      </div>
    </section>
  )
}
