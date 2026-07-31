import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PLANS } from '../data/plans'
import NetworkField from './NetworkField'

gsap.registerPlugin(ScrollTrigger)

function FeatureText({ text, bold }) {
  if (!bold) return text
  const idx = text.indexOf(bold)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold">{bold}</strong>
      {text.slice(idx + bold.length)}
    </>
  )
}

function PlanIcon({ type }) {
  if (type === 'infinity') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 15c-2 0-3.5-1.5-3.5-3.5S4 8 6 8c2.5 0 4 2 6 4 2 2 3.5 4 6 4 2 0 3.5-1.5 3.5-3.5S20.5 8 18 8c-2.5 0-4 2-6 4-2 2-3.5 4-6 4Z" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ muted }) {
  return (
    <span
      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border ${
        muted ? 'border-muted/30 text-muted' : 'border-signal/40 bg-signal/10 text-signal'
      }`}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function Plans({ onOpenEnroll }) {
  const scope = useRef(null)

  useGSAP(() => {
    gsap.from('.plan-card', {
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
      id="matricula"
      className="relative px-6 lg:pl-32 lg:pr-16 py-32 border-t border-surface-2"
    >
      <NetworkField />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-signal/30 bg-signal/5 text-signal text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-signal" />
            Investimento
          </span>
          <h2 className="font-display font-semibold text-4xl lg:text-5xl leading-tight mb-4">
            Invista no seu <span className="text-signal">futuro</span>.
          </h2>
          <p className="text-muted text-lg max-w-xl">
            Escolha o plano ideal e comece sua jornada para virar um
            programador contratável.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card relative rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? 'border-signal/50 bg-surface'
                  : 'border-surface-2 bg-surface/50'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-signal text-void text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-start justify-between mb-8">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {plan.name}
                </h3>
                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    plan.highlighted
                      ? 'border-signal/40 text-signal bg-signal/10'
                      : 'border-surface-2 text-muted'
                  }`}
                >
                  <PlanIcon type={plan.icon} />
                </span>
              </div>

              <div className="mb-6 pb-6 border-b border-surface-2">
                <p className="flex items-baseline gap-2">
                  <span className="text-sm text-muted">12x</span>
                  <span className="font-display text-3xl font-semibold text-ink">
                    R$ {plan.price},00
                  </span>
                </p>
                <p className="text-sm text-muted mt-1">
                  ou R$ {plan.full},00 à vista
                </p>
              </div>

              <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckIcon muted={!plan.highlighted} />
                    <span className={plan.highlighted ? 'text-ink' : 'text-muted'}>
                      <FeatureText text={f.text} bold={f.bold} />
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onOpenEnroll}
                className={`w-full py-3.5 rounded-full font-semibold text-sm transition-colors ${
                  plan.highlighted
                    ? 'bg-signal text-void hover:bg-signal-dim'
                    : 'border border-surface-2 text-ink hover:border-signal/50'
                }`}
              >
                {plan.cta}
              </button>
              <p className="text-xs text-muted text-center mt-3">
                Garantia incondicional de 7 dias
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
