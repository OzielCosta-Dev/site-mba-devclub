import { useState } from 'react'
import Modal from './Modal'

export default function LoginModal({ open, onClose }) {
  const [status, setStatus] = useState('idle') // idle | loading | done
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('done'), 900)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setEmail('')
    }, 300)
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="login-title">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-5 right-5 text-muted hover:text-ink transition-colors"
        aria-label="Fechar"
      >
        ✕
      </button>

      {status === 'done' ? (
        <div className="text-center py-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            Área do aluno
          </p>
          <h3 className="font-display font-semibold text-2xl text-ink mb-3">
            Em construção.
          </h3>
          <p className="text-muted leading-relaxed mb-8">
            A área do aluno completa ainda está sendo desenvolvida. Este login
            é uma simulação para fins de demonstração.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="px-7 py-3 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors"
          >
            Entendi
          </button>
        </div>
      ) : (
        <>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">
            Área do aluno
          </p>
          <h3
            id="login-title"
            className="font-display font-semibold text-2xl text-ink mb-6"
          >
            Que bom te ver de novo.
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-surface-2 text-ink placeholder:text-muted focus:outline-none focus:border-signal/50 transition-colors"
            />
            <input
              required
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-surface-2 text-ink placeholder:text-muted focus:outline-none focus:border-signal/50 transition-colors"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 px-7 py-3.5 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Entrando...' : 'Entrar'}
            </button>

            <p className="text-xs text-muted text-center mt-1">
              Login de demonstração — nenhuma credencial é validada ou
              armazenada.
            </p>
          </form>
        </>
      )}
    </Modal>
  )
}
