import { useMemo } from 'react'

// Mesmo LCG determinístico usado em GlassDrops/Galaxies — bolhas ficam nas
// mesmas posições em toda a sessão, sem recalcular a cada render.
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// ~30 bolhas: a maioria (82%) escuras e grandes, quase imperceptíveis —
// só textura de fundo. O resto (18%) pequenas e com glow verde da marca,
// pra dar uns pontos de destaque espalhados pela página inteira.
function buildBubbles(seed, count = 30) {
  const rand = seededRandom(seed)
  const bubbles = []

  for (let i = 0; i < count; i++) {
    const isGlow = rand() < 0.18
    const size = isGlow ? 6 + rand() * 10 : 14 + rand() * 70
    bubbles.push({
      isGlow,
      size,
      left: rand() * 100,
      top: rand() * 100,
      // Deslocamento do float: proporcional ao tamanho da bolha (as
      // grandes vagam mais, sensação de profundidade/paralaxe grátis).
      driftX: (rand() - 0.5) * (size * 1.4 + 40),
      driftY: (rand() - 0.5) * (size * 1.4 + 40),
      duration: 14 + rand() * 18,
      delay: -rand() * 20, // delay negativo: já entra em movimento, sem nascerem todas sincronizadas
    })
  }
  return bubbles
}

// Camada de fundo fixa, renderizada uma única vez em App.jsx (não repetida
// por seção). position: fixed em vez de absolute cobrindo a altura do
// documento: veja explicação no chat sobre a diferença de comportamento
// durante o scroll.
export default function BubbleField() {
  const bubbles = useMemo(() => buildBubbles(73), [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className={`bubble ${b.isGlow ? 'bubble-glow' : 'bubble-dark'}`}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            '--drift-x': `${b.driftX}px`,
            '--drift-y': `${b.driftY}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
