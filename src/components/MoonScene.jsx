import { useMemo } from 'react'

// Estrelas com posição pseudo-espalhada (mesmo truque do HeroJourney):
// determinístico, sem Math.random(), então não pisca/realoca em re-render.
const STARS = Array.from({ length: 70 }).map((_, i) => ({
  cx: (i * 137) % 1600,
  cy: (i * 53) % 420,
  r: i % 5 === 0 ? 1.6 : 0.9,
}))

// Cometas: cada um cai numa diagonal (mesmo ângulo pra todos, -35°) com
// ponto de partida, largura e timing diferentes — puro CSS (linear-gradient
// + keyframe), não SVG, porque é mais barato animar dezenas de divs do que
// recalcular paths.
const COMETS = [
  { top: '4%', right: '18%', width: 130, duration: 3.2, delay: 0 },
  { top: '0%', right: '42%', width: 90, duration: 4.1, delay: 1.4 },
  { top: '12%', right: '65%', width: 105, duration: 3.6, delay: 2.5 },
  { top: '-2%', right: '85%', width: 75, duration: 4.8, delay: 0.7 },
  { top: '18%', right: '28%', width: 65, duration: 4.3, delay: 3.3 },
  { top: '8%', right: '52%', width: 85, duration: 3.9, delay: 1.9 },
]

export default function MoonScene() {
  const stars = useMemo(() => STARS, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1600 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="moon-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050705" />
            <stop offset="55%" stopColor="#081210" />
            <stop offset="100%" stopColor="#0b1a14" />
          </linearGradient>
          <radialGradient id="moon-planet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e676" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="moon-surface" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#242422" />
            <stop offset="100%" stopColor="#040404" />
          </linearGradient>
        </defs>

        <rect width="1600" height="800" fill="url(#moon-sky)" />

        <g opacity="0.75">
          {stars.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#f2f1ea" />
          ))}
        </g>

        {/* planeta ao fundo, na cor da marca em vez do sol laranja da foto */}
        <circle cx="1180" cy="250" r="240" fill="url(#moon-planet-glow)" />
        <circle cx="1180" cy="250" r="128" fill="#0d3d29" />
        <path d="M1052,250 a128,128 0 0 1 256,0 Z" fill="#12b06b" opacity="0.55" />

        {/* horizonte lunar */}
        <path d="M0,555 Q420,495 800,535 T1600,515 V800 H0 Z" fill="url(#moon-surface)" />
        <ellipse cx="280" cy="640" rx="60" ry="13" fill="#000" opacity="0.35" />
        <ellipse cx="920" cy="705" rx="95" ry="18" fill="#000" opacity="0.3" />
        <ellipse cx="1320" cy="615" rx="46" ry="11" fill="#000" opacity="0.3" />

        {/* sombra do astronauta e da bandeira no solo */}
        <ellipse cx="580" cy="562" rx="50" ry="10" fill="#000" opacity="0.4" />

        {/* astronauta — flutua bem sutil, pra parecer "vivo" */}
        <g transform="translate(580,558)" className="moon-astro">
          <rect x="-24" y="-56" width="16" height="50" rx="6" fill="#e9e9e3" />
          <rect x="8" y="-56" width="16" height="50" rx="6" fill="#d7d7d1" />
          <rect x="-27" y="-10" width="20" height="14" rx="4" fill="#bcbcb6" />
          <rect x="7" y="-10" width="20" height="14" rx="4" fill="#bcbcb6" />

          <rect x="-35" y="-132" width="20" height="60" rx="6" fill="#c6c6c0" stroke="#96968f" strokeWidth="1.5" />

          <path d="M-22,-140 Q0,-150 22,-140 L26,-58 L-26,-58 Z" fill="#f2f1ea" />
          <rect x="-10" y="-96" width="20" height="14" rx="3" fill="var(--color-signal)" opacity="0.85" />

          <rect x="-34" y="-134" width="14" height="46" rx="6" fill="#e9e9e3" transform="rotate(-14 -27 -134)" />
          <rect x="20" y="-134" width="14" height="46" rx="6" fill="#e9e9e3" transform="rotate(18 27 -134)" />

          <circle cx="0" cy="-168" r="30" fill="#f2f1ea" stroke="#c6c6c0" strokeWidth="2" />
          <ellipse cx="4" cy="-168" rx="20" ry="22" fill="#08160f" />
          <ellipse cx="-4" cy="-176" rx="7" ry="5" fill="#5be0ab" opacity="0.65" />
        </g>

        {/* bandeira da DevClub, tremulando */}
        <g transform="translate(760,545)">
          <rect x="-2" y="-150" width="4" height="150" fill="#8a8a85" />
          <g className="moon-flag" style={{ transformOrigin: '2px -150px' }}>
            <path d="M2,-150 L96,-141 L77,-126 L96,-111 L2,-102 Z" fill="var(--color-signal)" />
            <text x="17" y="-120" fontSize="17" fontWeight="700" fill="#03130a" fontFamily="'Space Grotesk', sans-serif">
              DC
            </text>
          </g>
        </g>
      </svg>

      {COMETS.map((c, i) => (
        <span
          key={i}
          className="comet"
          style={{
            top: c.top,
            right: c.right,
            width: c.width,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
