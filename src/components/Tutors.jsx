import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassDrops from './GlassDrops'

gsap.registerPlugin(ScrollTrigger)

const TUTORS = [
  { name: 'Rafael Nunes', role: 'Full Stack & Arquitetura', tag: 'RN' },
  { name: 'Camila Torres', role: 'Front-End & Performance', tag: 'CT' },
  { name: 'Diego Martins', role: 'Back-End & Sistemas', tag: 'DM' },
  { name: 'Aline Castro', role: 'Carreira & Mentoria', tag: 'AC' },
]

// Ícones simples de traço único (mesma convenção do NavIcons) só pros
// cartões de benefício abaixo — não são de outra tecnologia, são só a
// linguagem visual local desse bloco.
function SupportIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 12v-1.5M12 12V9M15.5 12v-2.5" strokeLinecap="round" />
    </svg>
  )
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.2A8.5 8.5 0 1 0 12 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.8 8.6c-.3.6-.3 1.4.2 2.3.8 1.5 2.1 2.8 3.6 3.6.9.5 1.7.5 2.3.2.4-.2.7-.6.8-1l.1-.4-1.7-.9-.5.7c-.1.1-.3.2-.5.1-.8-.3-1.9-1.2-2.4-2-.1-.2-.1-.4.1-.5l.7-.5-.9-1.7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  )
}

function BookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5v-13Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CertificateIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="4" width="16" height="11" rx="1.5" />
      <path d="M7 7.5h10M7 10.5h6" strokeLinecap="round" />
      <path d="M9 15v5l3-1.6 3 1.6v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const BENEFITS = [
  {
    Icon: SupportIcon,
    title: 'Suporte e atualizações',
    desc: 'Tire dúvidas com quem entende, sempre que precisar.',
  },
  {
    Icon: WhatsAppIcon,
    title: 'Comunidade no WhatsApp',
    desc: 'Grupo ativo com alunos e o time da DevClub.',
  },
  {
    Icon: BookIcon,
    title: 'E-books autorais e exclusivos',
    desc: 'Materiais aprofundados para consultar quando precisar.',
  },
  {
    Icon: CertificateIcon,
    title: 'Certificado de conclusão',
    desc: 'Comprove sua jornada e fortaleça seu portfólio.',
  },
]

export default function Tutors() {
  const scope = useRef(null)

  useGSAP(() => {
    gsap.from('.tutor-card, .benefit-card', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      // Sem isso, o GSAP deixa rotate/translate/scale: none inline depois
      // que a entrada termina — e estilo inline sempre vence a regra
      // :hover do Tailwind, travando a inclinação dos benefit-card pro
      // resto da vida do componente.
      clearProps: 'transform,translate,rotate,scale',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 70%',
      },
    })
  }, { scope })

  return (
    <section
      ref={scope}
      id="tutores"
      className="relative overflow-hidden px-6 lg:pl-32 lg:pr-16 py-32"
    >
      <GlassDrops sectionRef={scope} seed={42} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6">
          Quem ensina
        </p>
        <h2 className="font-display font-semibold text-4xl lg:text-5xl leading-tight mb-16 max-w-xl">
          Programador de mercado, não professor de teoria.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TUTORS.map((t) => (
            <div
              key={t.name}
              className="tutor-card group p-7 rounded-2xl border border-surface-2 hover:border-signal/40 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-surface-2 border border-signal/20 flex items-center justify-center font-display font-semibold text-signal mb-6 group-hover:bg-signal group-hover:text-void transition-colors duration-300">
                {t.tag}
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-1">
                {t.name}
              </h3>
              <p className="text-sm text-muted">{t.role}</p>
            </div>
          ))}
        </div>

        <h3 className="font-display font-semibold text-2xl lg:text-3xl text-center mt-24 mb-10">
          Além das aulas, você também recebe
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="benefit-card p-7 rounded-2xl border border-surface-2 bg-surface/40 hover:border-signal/40 hover:-rotate-3 hover:-translate-y-1 transition-[transform,border-color] duration-300 cursor-default"
            >
              <div className="w-11 h-11 rounded-full bg-surface-2 border border-signal/20 flex items-center justify-center text-signal mb-6">
                <b.Icon className="w-5 h-5" />
              </div>
              <h4 className="font-display text-base font-semibold text-ink mb-2">{b.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
