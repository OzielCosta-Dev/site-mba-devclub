import { useEffect, useMemo, useRef } from 'react'

// LCG simples e determinístico — mesmo array de gotas em toda sessão, sem
// depender de Math.random() espalhando valores diferentes a cada render.
// O seed muda de seção pra seção, então cada vidraça tem seu próprio
// desenho de gotas (não literalmente as mesmas instâncias reaproveitadas).
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// Gotas na "vidraça" do fundo: uma grade jitterada (não pura aleatoriedade)
// pra cobrir a seção de forma razoavelmente uniforme sem virar cachos nem
// parecer uma grade óbvia. Posição em %, tamanho em px.
function buildDroplets(seed) {
  const rand = seededRandom(seed)
  const cols = 14
  const rows = 7
  const drops = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.3) continue
      const jitterX = (rand() - 0.5) * (100 / cols) * 0.85
      const jitterY = (rand() - 0.5) * (100 / rows) * 0.85
      drops.push({
        x: ((c + 0.5) / cols) * 100 + jitterX,
        y: ((r + 0.5) / rows) * 100 + jitterY,
        size: 4 + rand() * 16,
        opacity: 0.25 + rand() * 0.45,
      })
    }
  }
  return drops
}

// Fundo de vidro embaçado com gotas — usado em "Quem ensina" e no MBA em
// Engenharia de Software. Uma camada cinza sempre visível + uma segunda
// camada idêntica, verde, revelada só num círculo que segue o cursor
// (mask-image, ver .glass-glow-layer no index.css). sectionRef é o
// elemento que "escuta" o mouse — precisa ser um ancestral do conteúdo em
// primeiro plano, senão as gotas não veem o cursor quando ele está em
// cima de um card.
export default function GlassDrops({ sectionRef, seed = 42 }) {
  const glowRef = useRef(null)
  const droplets = useMemo(() => buildDroplets(seed), [seed])

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    if (!section || !glow) return

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect()
      glow.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      glow.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    }
    const handleEnter = () => glow.classList.add('is-active')
    const handleLeave = () => glow.classList.remove('is-active')

    section.addEventListener('mousemove', handleMove)
    section.addEventListener('mouseenter', handleEnter)
    section.addEventListener('mouseleave', handleLeave)
    return () => {
      section.removeEventListener('mousemove', handleMove)
      section.removeEventListener('mouseenter', handleEnter)
      section.removeEventListener('mouseleave', handleLeave)
    }
  }, [sectionRef])

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {droplets.map((d, i) => (
        <span
          key={i}
          className="glass-drop"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: d.opacity }}
        />
      ))}
      <div ref={glowRef} className="glass-glow-layer">
        {droplets.map((d, i) => (
          <span
            key={i}
            className="glass-drop glass-drop-glow"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          />
        ))}
      </div>
    </div>
  )
}
