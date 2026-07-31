import { useEffect, useRef } from 'react'

const NODE_RGB = [0, 230, 118]
const WHITE_RGB = [255, 255, 255]
const LINK_DIST = 150
const FOLLOW_RADIUS = 170
const FOLLOW_STRENGTH = 2.4

// Fundo de "rede de pontos conectados" reutilizável — mesmo canvas montado
// em Partners e CTA (uma instância por seção, cada uma com seus próprios
// nós). Diferente do BubbleField (fixed, cobre a viewport inteira), este
// aqui é absolute dentro da própria seção e observa o próprio tamanho via
// ResizeObserver — rola junto com o conteúdo em vez de ficar preso à tela.
export default function NetworkField({ count = 80 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let nodes = []
    let rafId = null
    const mouse = { x: -9999, y: -9999 }

    function seed() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // 65% dos nós nasce enviesado pra metade direita do canvas — o
      // resto cobre a largura toda, então o lado esquerdo não fica vazio.
      nodes = Array.from({ length: count }, (_, i) => {
        const rightBiased = i < count * 0.65
        const x = rightBiased ? width * (0.45 + Math.random() * 0.55) : Math.random() * width
        return {
          x,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          highlight: 0,
        }
      })
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // Atração pro cursor: quanto mais perto, mais o nó é puxado na
        // direção do mouse a cada frame — mesmo princípio do repulsor do
        // ParticleHero, só que como atração (o nó passa a "seguir" o
        // cursor em vez de fugir dele) e sem acumular na velocidade base,
        // pra voltar a vagar normalmente assim que o mouse se afasta.
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const dist = Math.hypot(dx, dy)
        n.highlight = dist < FOLLOW_RADIUS ? 1 - dist / FOLLOW_RADIUS : 0
        if (n.highlight > 0 && dist > 0.01) {
          n.x += (dx / dist) * n.highlight * FOLLOW_STRENGTH
          n.y += (dy / dist) * n.highlight * FOLLOW_STRENGTH
        }
      }

      // Liga dois nós só quando estão perto o bastante — a opacidade da
      // linha cai com a distância, então o link "desaparece" suavemente
      // em vez de sumir de repente ao cruzar o limiar.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(${NODE_RGB.join(',')}, ${(0.22 * (1 - dist / LINK_DIST)).toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        // Perto do cursor o nó clareia até virar branco e cresce um
        // pouco — mesma interpolação RGB usada no ParticleHero.
        const r = NODE_RGB[0] + (WHITE_RGB[0] - NODE_RGB[0]) * n.highlight
        const g = NODE_RGB[1] + (WHITE_RGB[1] - NODE_RGB[1]) * n.highlight
        const b = NODE_RGB[2] + (WHITE_RGB[2] - NODE_RGB[2]) * n.highlight
        const size = 1.5 + n.highlight * 1.5

        ctx.beginPath()
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${(0.75 + n.highlight * 0.25).toFixed(2)})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(step)
    }

    function handleMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function handleLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    seed()
    rafId = requestAnimationFrame(step)

    const observer = new ResizeObserver(seed)
    observer.observe(canvas)

    // O canvas tem pointer-events-none (não pode bloquear cliques no
    // conteúdo por cima), então quem escuta o mouse é o pai — o próprio
    // <section> — e o movimento chega até aqui por bubbling normal do
    // DOM mesmo quando o cursor está sobre um card/título acima dele.
    const parent = canvas.parentElement
    parent.addEventListener('mousemove', handleMove)
    parent.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      parent.removeEventListener('mousemove', handleMove)
      parent.removeEventListener('mouseleave', handleLeave)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
