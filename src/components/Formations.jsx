import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  VSCodeIcon,
  JSIcon,
  ReactIcon,
  NodeIcon,
  GitIcon,
  GitHubIcon,
  MongoDBIcon,
  PostgreSQLIcon,
  N8nIcon,
  HTML5Icon,
  CSSIcon,
  FlexboxIcon,
  PrismaIcon,
  ExpressIcon,
  OrmIcon,
} from './TechIcons'
import GlassDrops from './GlassDrops'

gsap.registerPlugin(ScrollTrigger)

// Ícones de chrome do "sistema operacional" do notebook — não são logos de
// tecnologia (esses moram no TechIcons), só decoração da barra de tarefas.
function GridDotsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      {[6, 12, 18].flatMap((cy) => [6, 12, 18].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />))}
    </svg>
  )
}

function WifiIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 9a12 12 0 0 1 16 0" strokeLinecap="round" />
      <path d="M7.2 12.6a8 8 0 0 1 9.6 0" strokeLinecap="round" />
      <path d="M10.4 16a4 4 0 0 1 3.2 0" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BatteryIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="2" y="7" width="17" height="10" rx="2" />
      <path d="M21 10v4" strokeLinecap="round" />
      <rect x="4" y="9" width="11" height="6" rx="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Conteúdo do MBA em Engenharia de Software (DevClub Elite) — a trilha
// avançada da DevClub voltada a quem já programa e quer virar arquiteto ou
// tech lead, não mais iniciante em tecnologia.
const FORMATIONS = [
  {
    title: 'Arquitetura de Software',
    duration: 'Núcleo',
    desc: 'Padrões arquiteturais, trade-offs de design e as decisões que sustentam um sistema em produção e em escala.',
  },
  {
    title: 'Liderança Técnica',
    duration: 'Núcleo',
    desc: 'Como conduzir times, mentorar outros devs e transformar decisão técnica em impacto real pro negócio.',
  },
  {
    title: 'Sistemas Distribuídos e Escalabilidade',
    duration: 'Núcleo',
    desc: 'Microsserviços, performance e alta disponibilidade — os desafios de quem projeta software pra escala.',
  },
  {
    title: 'Mentoria ao Vivo e Carreira',
    duration: 'Formato',
    desc: 'Encontros semanais com suporte direto, mentoria coletiva mensal, comunidade 24h e trilha de posicionamento pra vagas de arquiteto e tech lead.',
  },
]

// A stack toda que passa pelo MBA — cada uma vira uma bolha flutuando ao
// redor do notebook.
const TECH_STACK = [
  { Icon: VSCodeIcon, color: '#007ACC' },
  { Icon: JSIcon, color: '#F7DF1E' },
  { Icon: ReactIcon, color: '#61DAFB' },
  { Icon: NodeIcon, color: '#3C873A' },
  { Icon: GitIcon, color: '#F05033' },
  { Icon: GitHubIcon, color: '#f2f1ea' },
  { Icon: MongoDBIcon, color: '#47A248' },
  { Icon: PostgreSQLIcon, color: '#336791' },
  { Icon: N8nIcon, color: '#EA4560' },
  { Icon: HTML5Icon, color: '#E34F26' },
  { Icon: CSSIcon, color: '#1572B6' },
  { Icon: FlexboxIcon, color: '#2965F1' },
  { Icon: PrismaIcon, color: '#5AC8DA' },
  { Icon: ExpressIcon, color: '#f2f1ea' },
  { Icon: OrmIcon, color: '#7C3AED' },
]

// Ponto fixo e seguro de cada bolha: anda pelo perímetro de um retângulo
// "inflado" a partir do wrapper (garante que nenhuma delas caia por cima do
// notebook, mesmo com 15 ao mesmo tempo — diferente de um raio de círculo
// único, aqui a folga é sempre a mesma em qualquer direção). Ao redor desse
// ponto fixo, cada bolha ainda gira numa órbita pequena e local (raio de
// verdade, mesma mecânica contínua do About), então ela "flutua orbitando"
// sem nunca se aproximar do notebook ou do texto.
const TECH_BUBBLES = (() => {
  const marginX = 9
  const marginY = 8
  const left = -marginX
  const right = 100 + marginX
  const top = -marginY
  const bottom = 100 + marginY
  const width = right - left
  const height = bottom - top
  const perimeter = 2 * (width + height)
  const step = perimeter / TECH_STACK.length

  return TECH_STACK.map(({ Icon, color }, i) => {
    const d = ((i + 0.5) * step) % perimeter
    let x
    let y
    if (d < width) {
      x = left + d
      y = top
    } else if (d < width + height) {
      x = right
      y = top + (d - width)
    } else if (d < width + height + width) {
      x = right - (d - width - height)
      y = bottom
    } else {
      x = left
      y = bottom - (d - width - height - width)
    }
    return {
      Icon,
      color,
      top: `${y.toFixed(1)}%`,
      left: `${x.toFixed(1)}%`,
      size: 42 + (i % 3) * 6,
      orbitRadius: 14 + (i % 3) * 6,
      duration: 7 + (i % 5) * 2.4,
      delay: ((i * 0.55) % 4).toFixed(2),
      direction: i % 2 === 0 ? 'normal' : 'reverse',
    }
  })
})()

export default function Formations() {
  const scope = useRef(null)
  const [ledOn, setLedOn] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const clock = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  useGSAP(() => {
    gsap.from('.formation-card', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 70%',
      },
    })
  }, { scope })

  return (
    <section
      ref={scope}
      id="formacoes"
      className="relative overflow-hidden px-6 lg:pl-32 lg:pr-16 py-32 bg-void/90"
    >
      <GlassDrops sectionRef={scope} seed={219} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
          MBA em Engenharia de Software
        </p>
        <h2 className="font-display font-semibold text-4xl lg:text-5xl leading-tight mb-16 max-w-xl">
          De dev que entrega código a arquiteto que decide o sistema.
        </h2>

        <div className="relative mt-28 max-w-4xl mx-auto">
          {/* Símbolos das techs orbitando o notebook, igual às partículas do
              About — só em telas bem largas, onde tem espaço no ar pra
              girarem sem esbarrar em texto ou sair da viewport. */}
          <div className="hidden xl:block">
            {TECH_BUBBLES.map(({ Icon, top, left, size, orbitRadius, duration, delay, direction, color }, i) => (
              <div key={i} className="absolute z-10" style={{ top, left }}>
                <div
                  className="orbit-ring"
                  style={{
                    width: orbitRadius * 2,
                    height: orbitRadius * 2,
                    marginTop: -orbitRadius,
                    marginLeft: -orbitRadius,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    animationDirection: direction,
                  }}
                >
                  <div
                    className="tech-orbit-counter"
                    style={{
                      animationDuration: `${duration}s`,
                      animationDelay: `${delay}s`,
                      animationDirection: direction,
                    }}
                  >
                    <div
                      className="rounded-full bg-surface border border-surface-2 flex items-center justify-center p-2.5"
                      style={{ width: size, height: size, boxShadow: `0 0 22px -4px ${color}` }}
                    >
                      <Icon className="h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tela do notebook: moldura grossa, "câmera" com LED que acende
              quando o cursor entra na área da tela — perto dos cards. */}
          <div className="relative rounded-t-3xl border-4 border-surface-2 bg-void p-3 pb-5 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-center gap-2 pb-3">
              <span className={`notebook-led h-2.5 w-2.5 rounded-full ${ledOn ? 'is-on' : ''}`} />
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                {ledOn ? 'sistema ativo' : 'em espera'}
              </span>
            </div>

            <div
              className="relative overflow-hidden rounded-xl border border-surface-2 bg-[#0d0d0d]"
              onMouseEnter={() => setLedOn(true)}
              onMouseLeave={() => setLedOn(false)}
            >
              {/* brilho diagonal sutil, tipo reflexo de tela */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

              {/* barra de título, tipo janela de editor de código */}
              <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-[10px] text-muted/80">
                  mba-engenharia-de-software.tsx<span className="animate-pulse">▍</span>
                </span>
              </div>

              <div className="relative p-6 lg:p-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  {FORMATIONS.map((f) => (
                    <div
                      key={f.title}
                      className="formation-card group p-6 lg:p-8 rounded-2xl border border-surface-2 bg-surface/60 hover:border-signal/40 hover:bg-surface transition-colors duration-300 cursor-default"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="font-display text-xl font-semibold text-ink group-hover:text-signal transition-colors">
                          {f.title}
                        </h3>
                        <span className="font-mono text-[11px] text-muted whitespace-nowrap ml-4 mt-1">
                          {f.duration}
                        </span>
                      </div>
                      <p className="text-muted leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* barra de tarefas, tipo SO com relógio ao vivo */}
              <div className="relative flex items-center justify-between gap-4 px-4 py-2 border-t border-white/5 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-md bg-signal/90 text-void flex items-center justify-center">
                    <GridDotsIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">devclub // mba</span>
                </div>
                <div className="flex items-center gap-3 text-muted">
                  <WifiIcon className="h-3.5 w-3.5" />
                  <BatteryIcon className="h-3.5 w-3.5" />
                  <span className="font-mono text-[10px] tabular-nums">{clock}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Base/teclado: trapézio mais largo que a tela, pra ler como o
              corpo do notebook visto de leve ângulo. */}
          <div
            className="h-5 border-x-4 border-b-4 border-surface-2 bg-gradient-to-b from-surface-2 to-[#0a0a0a] rounded-b-2xl"
            style={{ clipPath: 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)' }}
          />
          <div className="mx-auto -mt-1 h-1.5 w-20 rounded-full bg-surface-2/60" />
        </div>
      </div>
    </section>
  )
}
