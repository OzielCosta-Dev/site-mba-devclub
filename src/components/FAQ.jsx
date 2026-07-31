import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NetworkField from './NetworkField'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: 'Posso comprar só uma formação, sem ser o pacote completo?',
    a: 'Não. Os dois planos dão acesso a todas as formações e trilhas da DevClub de uma vez, incluindo o MBA em Engenharia de Software — não vendemos formação avulsa.',
  },
  {
    q: 'Não sei se os cursos são pra mim.',
    a: 'Se você quer sair da teoria e começar a programar de verdade — do zero ou pra evoluir de nível —, é pra você. A trilha serve tanto pra quem nunca programou quanto pra quem já trabalha na área e quer virar arquiteto ou tech lead.',
  },
  {
    q: 'Nunca programei. Tem algum pré-requisito?',
    a: 'Nenhum. A formação foi pensada pra tirar você do zero absoluto — sem precisar saber nada de lógica ou programação antes de começar.',
  },
  {
    q: 'Terei acesso total à plataforma?',
    a: 'Sim. Assim que a matrícula é confirmada, você libera todas as formações, os projetos práticos, a mentoria com tutores e a comunidade de alunos.',
  },
  {
    q: 'Qual o tempo de acesso à plataforma?',
    a: 'Depende do plano: 12 meses na Assinatura Anual, ou acesso vitalício (pra sempre) no plano Acesso Vitalício.',
  },
  {
    q: 'Como funciona a garantia de 7 dias e reembolso?',
    a: 'Você tem 7 dias corridos após a matrícula pra explorar a plataforma inteira. Se não for pra você, é só pedir reembolso — sem burocracia, sem letra miúda.',
  },
  {
    q: 'Tem certificado de conclusão?',
    a: 'Sim, todos os planos incluem certificado de conclusão ao final da formação.',
  },
]

function ChevronIcon({ open }) {
  return (
    <span
      className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-[transform,border-color,color] duration-300 ${
        open ? 'rotate-180 border-signal/40 text-signal' : 'border-surface-2 text-muted'
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function FAQ() {
  const scope = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useGSAP(() => {
    gsap.from('.faq-item', {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 75%',
      },
    })
  }, { scope })

  return (
    <section ref={scope} className="relative px-6 lg:pl-32 lg:pr-16 pb-32">
      <NetworkField />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl lg:text-4xl mb-4">Dúvidas frequentes</h2>
          <p className="text-muted">
            Se a sua dúvida não foi respondida aqui, fale com a gente pela comunidade no WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={item.q}
                className="faq-item rounded-2xl border border-surface-2 bg-surface/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="font-medium text-ink">{item.q}</span>
                  <ChevronIcon open={open} />
                </button>
                {/* grid-template-rows 0fr→1fr: transiciona a altura sem
                    precisar medir o conteúdo em JS. */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
