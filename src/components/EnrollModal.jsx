import { useState } from 'react'
import Modal from './Modal'
import { PLANS } from '../data/plans'

const EMPTY_FORM = { nome: '', email: '', telefone: '' }

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-20"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LoadingStep({ label }) {
  return (
    <div className="flex flex-col items-center py-10 text-signal">
      <Spinner />
      <p className="mt-5 text-sm text-muted">{label}</p>
    </div>
  )
}

export default function EnrollModal({ open, onClose }) {
  // form -> loading -> plans -> confirming -> done
  const [step, setStep] = useState('form')
  const [form, setForm] = useState(EMPTY_FORM)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const firstName = form.nome.split(' ')[0]

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('loading')
    setTimeout(() => setStep('plans'), 900)
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setStep('confirming')
    setTimeout(() => setStep('done'), 700)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('form')
      setForm(EMPTY_FORM)
      setSelectedPlan(null)
    }, 300)
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="enroll-title">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-5 right-5 text-muted hover:text-ink transition-colors"
        aria-label="Fechar"
      >
        ✕
      </button>

      {step === 'form' && (
        <>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            Quero ser aluno
          </p>
          <h3
            id="enroll-title"
            className="font-display font-semibold text-2xl text-ink mb-6"
          >
            Bora começar sua jornada.
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              required
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-surface-2 text-ink placeholder:text-muted focus:outline-none focus:border-signal/50 transition-colors"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seu e-mail"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-surface-2 text-ink placeholder:text-muted focus:outline-none focus:border-signal/50 transition-colors"
            />
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="WhatsApp (opcional)"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-surface-2 text-ink placeholder:text-muted focus:outline-none focus:border-signal/50 transition-colors"
            />

            <button
              type="submit"
              className="mt-2 px-7 py-3.5 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors"
            >
              Continuar
            </button>

            <p className="text-xs text-muted text-center mt-1">
              Cadastro de demonstração — nenhum dado é armazenado.
            </p>
          </form>
        </>
      )}

      {step === 'loading' && <LoadingStep label="Verificando seus dados..." />}

      {step === 'plans' && (
        <>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            Escolha seu plano
          </p>
          <h3
            id="enroll-title"
            className="font-display font-semibold text-2xl text-ink mb-6"
          >
            Quase lá{firstName ? `, ${firstName}` : ''}.
          </h3>

          <div className="flex flex-col gap-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => handleSelectPlan(plan)}
                className={`w-full text-left rounded-xl border p-5 transition-colors ${
                  plan.highlighted
                    ? 'border-signal/50 bg-void hover:border-signal'
                    : 'border-surface-2 bg-void hover:border-signal/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-semibold text-ink">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-signal text-void text-[10px] font-semibold uppercase tracking-wide">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-xs text-muted">12x</span>
                  <span className="font-display text-lg font-semibold text-ink">
                    R$ {plan.price},00
                  </span>
                  <span className="text-xs text-muted">
                    ou R$ {plan.full},00 à vista
                  </span>
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'confirming' && <LoadingStep label="Confirmando sua vaga..." />}

      {step === 'done' && (
        <div className="text-center py-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            Cadastro recebido
          </p>
          <h3
            id="enroll-title"
            className="font-display font-semibold text-2xl text-ink mb-3"
          >
            Já anotamos seu lugar{firstName ? `, ${firstName}` : ''}.
          </h3>
          <p className="text-muted leading-relaxed mb-8">
            Plano <strong className="text-ink font-semibold">{selectedPlan?.name}</strong>{' '}
            selecionado. Nosso time entra em contato em até 24h com os
            próximos passos.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="px-7 py-3 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors"
          >
            Entendi
          </button>
        </div>
      )}
    </Modal>
  )
}
