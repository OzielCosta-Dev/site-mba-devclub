import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// LCG determinístico — mesma galáxia em toda sessão, sem depender de
// Math.random() espalhado (mesma técnica usada nas gotas de Tutors.jsx).
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// Gera uma nuvem de "estrelas" em espiral logarítmica ao redor de (200,200):
// um núcleo denso no centro + N braços que se abrem pra fora. squashY
// achata verticalmente pra virar uma elipse inclinada (o jeito clássico de
// desenhar Andromeda, vista quase de perfil) — 1 mantém o disco "de cima",
// como se costuma representar a Via Láctea.
function buildGalaxyPoints({ seed, arms, turns, perArm, coreCount, squashY = 1 }) {
  const rand = seededRandom(seed)
  const points = []

  for (let i = 0; i < coreCount; i++) {
    const r = rand() * 16
    const th = rand() * Math.PI * 2
    points.push({
      x: 200 + r * Math.cos(th),
      y: 200 + r * Math.sin(th) * squashY,
      size: 0.8 + rand() * 1.7,
      opacity: 0.55 + rand() * 0.45,
      core: true,
    })
  }

  for (let a = 0; a < arms; a++) {
    const offset = (a / arms) * Math.PI * 2
    for (let i = 0; i < perArm; i++) {
      const t = i / perArm
      const theta = t * Math.PI * 2 * turns + offset
      const r = 16 + t * 172
      const jitterR = (rand() - 0.5) * (10 + t * 24)
      const jitterTheta = (rand() - 0.5) * 0.3
      const rr = Math.max(0, r + jitterR)
      const th = theta + jitterTheta
      points.push({
        x: 200 + rr * Math.cos(th),
        y: 200 + rr * Math.sin(th) * squashY,
        size: 0.5 + rand() * 1.3,
        opacity: (0.12 + rand() * 0.5) * (1 - t * 0.35),
        core: false,
      })
    }
  }

  return points
}

// variant "spiral" = disco visto de cima (Via Láctea, como costuma ser
// ilustrada já que não dá pra fotografar ela de fora); "tilted" = elipse
// achatada com bojo central bem marcado (Andromeda, o jeito como ela
// aparece em qualquer foto real — inclinada, quase de perfil).
export default function Galaxy({ variant = 'spiral', seed = 1, size = 420, duration = 220, reverse = false, className = '' }) {
  const tilted = variant === 'tilted'
  const id = `${variant}-${seed}`

  const points = useMemo(
    () =>
      buildGalaxyPoints({
        seed,
        arms: tilted ? 2 : 3,
        turns: tilted ? 0.85 : 1.2,
        perArm: tilted ? 70 : 60,
        coreCount: tilted ? 50 : 30,
        squashY: tilted ? 0.4 : 1,
      }),
    [seed, tilted]
  )

  const companions = tilted
    ? [
        { x: 305, y: 138, r: 7 },
        { x: 120, y: 258, r: 5 },
      ]
    : []

  // Zona de mouse (essa div, do tamanho da galáxia inteira) separada da que
  // gira (a de baixo): CSS animation e o "x"/"y" do GSAP mexem os dois na
  // mesma propriedade (transform), então precisam ficar em elementos
  // diferentes ou brigam a cada frame — um sempre sobrescreve o outro.
  const hoverRef = useRef(null)
  const parallaxRef = useRef(null)

  useGSAP(() => {
    const zone = hoverRef.current
    const target = parallaxRef.current
    if (!zone || !target) return

    const strength = size * 0.09
    const moveX = gsap.quickTo(target, 'x', { duration: 0.7, ease: 'power3.out' })
    const moveY = gsap.quickTo(target, 'y', { duration: 0.7, ease: 'power3.out' })

    const handleMove = (e) => {
      const rect = zone.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      moveX(relX * strength)
      moveY(relY * strength)
    }
    const handleLeave = () => {
      moveX(0)
      moveY(0)
    }

    zone.addEventListener('mousemove', handleMove)
    zone.addEventListener('mouseleave', handleLeave)
    return () => {
      zone.removeEventListener('mousemove', handleMove)
      zone.removeEventListener('mouseleave', handleLeave)
    }
  }, { dependencies: [size] })

  return (
    <div ref={hoverRef} className={`pointer-events-auto ${className}`} style={{ width: size, height: size }}>
      <div ref={parallaxRef} className="h-full w-full">
        <div
          className="h-full w-full"
          style={{
            animation: `orbit-spin ${duration}s linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
            mixBlendMode: 'screen',
          }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
            <defs>
              <radialGradient id={`halo-${id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e676" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`core-${id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eafff2" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#00e676" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="200" cy="200" r="195" fill={`url(#halo-${id})`} />
            <ellipse
              cx="200"
              cy="200"
              rx={tilted ? 150 : 64}
              ry={tilted ? 62 : 64}
              fill={`url(#core-${id})`}
            />

            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill={p.core ? '#eafff2' : '#00e676'}
                opacity={p.opacity}
              />
            ))}

            {companions.map((c, i) => (
              <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={`url(#core-${id})`} opacity="0.7" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
