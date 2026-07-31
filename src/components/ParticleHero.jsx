import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const TEXT = 'DevClub'
const PARTICLE_RGB = [0, 230, 118] // --color-signal em componentes rgb, pra interpolar com branco no hover
const WHITE_RGB = [255, 255, 255]
const REPEL_RADIUS = 90
const REPEL_STRENGTH = 8

export default function ParticleHero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)

  // Fade-in do conteúdo HTML só depois que as partículas já tiveram tempo
  // de convergir formando o texto — entrar junto ficaria poluído.
  useGSAP(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.9,
      delay: 1.4,
      ease: 'power2.out',
    })
  }, { scope: sectionRef })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let particles = []
    let rafId = null
    let resizeTimeout = null
    const mouse = { x: -9999, y: -9999 }

    // Amostra o texto num canvas separado (nunca visível na tela): desenha
    // "DevClub" nele, lê os pixels com getImageData e guarda só as
    // coordenadas onde o alpha indica "isso é tinta da letra". Essas
    // coordenadas viram os alvos (tx, ty) de cada partícula.
    function sampleTextPositions() {
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const octx = off.getContext('2d')

      // Em telas estreitas, 0.13 deixava "DevClub" pequeno demais sobrando
      // muito vazio ao redor — 0.16 ainda cabe tranquilo (a palavra some
      // bem antes de 90% da largura do canvas mesmo no fator maior).
      const fontSize = Math.min(width * (width < 640 ? 0.16 : 0.13), 190)
      octx.fillStyle = '#fff'
      octx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText(TEXT, width / 2, height / 2)

      const { data } = octx.getImageData(0, 0, width, height)
      const gap = width < 640 ? 3 : 4 // mais espaçado em telas pequenas: menos partículas, mesmo custo visual
      const positions = []

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alpha = data[(y * width + x) * 4 + 3]
          if (alpha > 128) positions.push({ x, y })
        }
      }
      return positions
    }

    function spawnParticle(target) {
      // Nasce longe do centro, numa direção aleatória — assim a convergência
      // vem de todos os lados da tela, não de um canto só.
      const angle = Math.random() * Math.PI * 2
      const radius = Math.max(width, height) * (0.6 + Math.random() * 0.7)
      return {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        tx: target.x,
        ty: target.y,
        size: 1.4 + Math.random() * 2.2,
        ease: 0.035 + Math.random() * 0.045,
        vAmp: 0.5 + Math.random() * 1,
        vSpeed: 0.6 + Math.random() * 1.4,
        vOffset: Math.random() * Math.PI * 2,
        alpha: 0.5 + Math.random() * 0.5,
      }
    }

    function init() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targets = sampleTextPositions()
      particles = targets.map(spawnParticle)
    }

    function step(time) {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Repulsão do mouse: empurra a posição real da partícula pra longe,
        // proporcional a quão perto o cursor está — a convergência abaixo
        // já cuida de trazer ela de volta assim que o mouse se afasta.
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        const proximity = dist < REPEL_RADIUS ? 1 - dist / REPEL_RADIUS : 0
        if (dist < REPEL_RADIUS && dist > 0.01) {
          p.x += (dx / dist) * proximity * REPEL_STRENGTH
          p.y += (dy / dist) * proximity * REPEL_STRENGTH
        }

        // Convergência contínua pro alvo (lerp).
        p.x += (p.tx - p.x) * p.ease
        p.y += (p.ty - p.y) * p.ease

        // Vibração orgânica: só no desenho, não acumula na posição real —
        // senão a partícula "andaria" pra sempre em vez de vibrar no lugar.
        const wobbleX = Math.cos(time * 0.0015 * p.vSpeed + p.vOffset) * p.vAmp
        const wobbleY = Math.sin(time * 0.0018 * p.vSpeed + p.vOffset) * p.vAmp

        // Perto do cursor a partícula clareia até virar branca — proximity
        // já vem 0 a 1 do cálculo de repulsão acima, então é só interpolar
        // cada canal RGB entre o verde-sinal e branco puro.
        const r = PARTICLE_RGB[0] + (WHITE_RGB[0] - PARTICLE_RGB[0]) * proximity
        const g = PARTICLE_RGB[1] + (WHITE_RGB[1] - PARTICLE_RGB[1]) * proximity
        const b = PARTICLE_RGB[2] + (WHITE_RGB[2] - PARTICLE_RGB[2]) * proximity
        const alpha = p.alpha + (1 - p.alpha) * proximity

        ctx.beginPath()
        ctx.arc(p.x + wobbleX, p.y + wobbleY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha.toFixed(2)})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(step)
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(init, 150)
    }

    async function start() {
      try {
        await document.fonts.load('700 190px "Space Grotesk"')
        await document.fonts.ready
      } catch {
        // Font Loading API indisponível — segue com o que estiver
        // carregado no momento, só pra não travar a animação pra sempre.
      }
      init()
      rafId = requestAnimationFrame(step)
    }

    start()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-void">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        ref={contentRef}
        className="absolute inset-x-0 bottom-[14%] flex flex-col items-center gap-7 px-6 text-center"
      >
        <p className="max-w-md text-muted text-base lg:text-lg">
          A escola de programação que tira você do zero e coloca no mercado.
        </p>
        <a
          href="#formacoes"
          className="px-7 py-3.5 bg-signal text-void font-semibold rounded-full text-sm hover:bg-signal-dim transition-colors"
        >
          Ver formações
        </a>
      </div>
    </section>
  )
}
