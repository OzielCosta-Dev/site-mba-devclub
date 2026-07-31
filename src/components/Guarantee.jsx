import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n: '01', text: 'Compre hoje e acesse imediatamente' },
  { n: '02', text: 'Use a plataforma como quiser por 7 dias' },
  { n: '03', text: 'Não gostou? Mande e-mail e receba 100% de volta' },
]

// Selo circular: texto "GARANTIA INCONDICIONAL" repetido ao longo de um
// círculo via <textPath> (o mesmo truque de duas semicircunferências pra
// fechar o path inteiro), girando bem devagar — reaproveita a keyframe
// orbit-spin já usada em outras seções. O escudo no centro fica parado.
function GuaranteeSeal() {
  return (
    <div className="relative h-44 w-44 flex-shrink-0">
      <svg viewBox="0 0 200 200" className="h-full w-full" style={{ animation: 'orbit-spin 40s linear infinite' }}>
        <path
          id="seal-circle"
          d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
          fill="none"
        />
        <text fill="var(--color-signal)" fontSize="9.5" letterSpacing="2.5" className="font-mono uppercase">
          <textPath href="#seal-circle" startOffset="0%">
            Garantia incondicional · Garantia incondicional ·
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full border border-signal/30 bg-signal/5 flex flex-col items-center justify-center gap-1.5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-signal)" strokeWidth="1.8">
            <path d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" strokeLinejoin="round" />
            <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-[11px] font-semibold text-signal tracking-wide">7 DIAS</span>
        </div>
      </div>
    </div>
  )
}

export default function Guarantee() {
  const scope = useRef(null)

  useGSAP(() => {
    gsap.from('.guarantee-card', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 80%',
      },
    })
  }, { scope })

  return (
    <section ref={scope} className="relative px-6 lg:pl-32 lg:pr-16 pb-32">
      <div className="max-w-5xl mx-auto">
        <div className="guarantee-card relative overflow-hidden rounded-3xl border border-surface-2 bg-surface p-8 lg:p-12">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-signal/10 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
            <GuaranteeSeal />

            <div className="flex-1 text-center lg:text-left">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
                Risco zero pra você
              </p>
              <h2 className="font-display font-semibold text-3xl lg:text-4xl leading-tight mb-4">
                7 dias de garantia incondicional
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Você tem até <strong className="text-ink font-semibold">7 dias depois da sua matrícula na DevClub</strong> para
                explorar todas as formações, projetos e a comunidade. Se não for pra você, é só pedir reembolso. Sem
                burocracia, sem letra miúda.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-surface-2 text-left">
                {STEPS.map((s) => (
                  <div key={s.n}>
                    <p className="font-mono text-xs text-signal mb-1.5">{s.n}</p>
                    <p className="text-sm text-muted leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
