import { useEffect, useState } from 'react'
import LoginModal from './LoginModal'
import NavSaber from './NavSaber'
import logo from '../assets/logo.png'
import {
  TwinSunsIcon,
  SaberIcon,
  HoodIcon,
  MedalIcon,
  DeathStarIcon,
  HyperspaceIcon,
} from './NavIcons'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre', Icon: TwinSunsIcon },
  { href: '#formacoes', label: 'Formações', Icon: SaberIcon },
  { href: '#tutores', label: 'Tutores', Icon: HoodIcon },
  { href: '#resultados', label: 'Resultados', Icon: MedalIcon },
  { href: '#empresas', label: 'Empresas', Icon: DeathStarIcon },
  { href: '#matricula', label: 'Planos', Icon: HyperspaceIcon },
]

export default function Header({ onOpenEnroll }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-md border-b border-surface-2'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:pl-32 lg:pr-16 h-24">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src={logo}
            alt=""
            width={30}
            height={34}
            className="h-8 w-auto"
            style={{ imageRendering: 'pixelated' }}
          />
          <span className="wordmark-saber text-2xl uppercase tracking-wide text-signal">
            <span className="text-ink">MBA</span> DevClub
          </span>
        </a>

        <nav className="hidden lg:flex items-center">
          <NavSaber items={NAV_LINKS} />
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="led-glow font-mono text-xs uppercase tracking-widest text-white hover:text-signal transition-colors"
          >
            Área do aluno
          </button>
          <button
            type="button"
            onClick={onOpenEnroll}
            className="px-5 py-2.5 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors"
          >
            Quero ser aluno
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ink p-2 -mr-2"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-8 pt-2 bg-void border-b border-surface-2 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="led-glow flex items-center gap-3 py-3 font-mono text-sm uppercase tracking-widest text-white hover:text-signal transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setLoginOpen(true)
            }}
            className="led-glow py-3 text-left font-mono text-sm uppercase tracking-widest text-white hover:text-signal transition-colors"
          >
            Área do aluno
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onOpenEnroll()
            }}
            className="mt-3 px-5 py-3 bg-signal text-void font-semibold rounded-full text-sm text-center"
          >
            Quero ser aluno
          </button>
        </div>
      )}

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}
