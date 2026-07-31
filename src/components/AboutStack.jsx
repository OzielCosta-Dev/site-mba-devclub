import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// História real do fundador Rodolfo Mori (devclub.com.br/sobre) — a mesma
// curva de "De curioso a contratado" do Hero, contada em primeira pessoa.
const CARDS = [
  {
    title: 'Cresceu na periferia de São Paulo.',
    text: 'Rodolfo Mori, fundador do DevClub, estudou em escola pública e começou a vida profissional como eletricista — bem longe de qualquer coisa parecida com tecnologia.',
  },
  {
    title: 'Uma crise familiar virou o ponto de partida.',
    text: 'Numa fase difícil, decidiu aprender a programar sozinho — sem curso, sem mentor. Foram seis meses estudando por conta própria até a primeira oportunidade aparecer.',
  },
  {
    title: 'Contratado como programador num banco.',
    text: 'Dali em diante foi promovido, virou sócio de uma empresa de software e alcançou a liberdade financeira que buscava desde o começo.',
  },
  {
    title: 'Nasceu a escola que ele gostaria de ter tido.',
    text: 'Prática desde o primeiro dia, sem enrolação — focada em tirar alguém do zero absoluto e colocar no mercado de trabalho, do jeito que faltou pra ele.',
  },
  {
    title: 'Milhares de histórias como essa.',
    text: 'A mesma virada de chave que mudou a vida do fundador, replicada todos os dias por quem passa pelo DevClub.',
    stats: [
      ['12 mil+', 'alunos ativos'],
      ['+300', 'empresas parceiras'],
    ],
  },
]

// Rampa linear de p (0-1) mapeada pra [start, end], presa entre 0 e 1.
const fade = (p, start, end) => Math.min(1, Math.max(0, (p - start) / (end - start)))

// Raio (px), duração da volta (s), atraso de fase (s) e sentido de cada
// "partícula". Raios e durações variados pra não parecerem sincronizadas;
// misturo o verde da marca com branco pra dar profundidade.
const ORBITS = [
  { radius: 200, size: 6, duration: 16, delay: 0, color: 'var(--color-signal)', opacity: 0.85 },
  { radius: 200, size: 4, duration: 16, delay: 8, color: '#ffffff', opacity: 0.4 },
  { radius: 300, size: 5, duration: 24, delay: 4, color: '#ffffff', opacity: 0.55, reverse: true },
  { radius: 300, size: 3, duration: 24, delay: 16, color: 'var(--color-signal)', opacity: 0.5, reverse: true },
  { radius: 400, size: 7, duration: 32, delay: 10, color: 'var(--color-signal)', opacity: 0.65 },
  { radius: 400, size: 4, duration: 32, delay: 26, color: '#ffffff', opacity: 0.35 },
  { radius: 130, size: 4, duration: 11, delay: 3, color: '#ffffff', opacity: 0.5, reverse: true },
  { radius: 130, size: 3, duration: 11, delay: 8, color: 'var(--color-signal)', opacity: 0.4 },
  { radius: 160, size: 5, duration: 13, delay: 2, color: '#ffffff', opacity: 0.45 },
  { radius: 160, size: 3, duration: 13, delay: 9, color: 'var(--color-signal)', opacity: 0.4, reverse: true },
  { radius: 250, size: 5, duration: 20, delay: 5, color: 'var(--color-signal)', opacity: 0.55 },
  { radius: 250, size: 3, duration: 20, delay: 15, color: '#ffffff', opacity: 0.4, reverse: true },
  { radius: 350, size: 4, duration: 28, delay: 12, color: '#ffffff', opacity: 0.45 },
  { radius: 350, size: 6, duration: 28, delay: 22, color: 'var(--color-signal)', opacity: 0.5, reverse: true },
  { radius: 450, size: 5, duration: 36, delay: 18, color: '#ffffff', opacity: 0.3 },
]

function OrbitField({ container }) {
  const fieldRef = useRef(null)

  useGSAP(() => {
    if (!container) return

    // quickTo reaproveita o mesmo tween a cada chamada em vez de criar um
    // novo por evento de mousemove — é a forma otimizada do GSAP pra
    // atualizar repetidamente a mesma propriedade num listener de alta
    // frequência.
    const moveX = gsap.quickTo(fieldRef.current, 'x', { duration: 0.9, ease: 'power3.out' })
    const moveY = gsap.quickTo(fieldRef.current, 'y', { duration: 0.9, ease: 'power3.out' })

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 a 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      moveX(relX * 36)
      moveY(relY * 36)
    }

    container.addEventListener('mousemove', handleMove)
    return () => container.removeEventListener('mousemove', handleMove)
  }, { dependencies: [container] })

  return (
    // z-30: acima de todos os cards (que vão até z-index 5) — assim as
    // partículas ficam visíveis por cima do "vidro" dos cards, não atrás
    // deles. mix-blend-mode: screen faz cada ponto clarear o que está
    // embaixo em vez de cobri-lo, então ele lê como um brilho atravessando
    // o card em vez de um elemento opaco desenhado por cima do texto — sem
    // precisar tornar o card de verdade transparente (o que deixaria o
    // texto do PRÓXIMO card da pilha vazar também, já que ocupam a mesma
    // caixa).
    <div
      ref={fieldRef}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
    >
      {ORBITS.map((orbit, i) => (
        <div
          key={i}
          className="orbit-ring"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            marginTop: -orbit.radius,
            marginLeft: -orbit.radius,
            animationDuration: `${orbit.duration}s`,
            animationDelay: `${orbit.delay}s`,
            animationDirection: orbit.reverse ? 'reverse' : 'normal',
          }}
        >
          <span
            className="orbit-dot"
            style={{
              width: orbit.size,
              height: orbit.size,
              background: orbit.color,
              opacity: orbit.opacity,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${orbit.size * 2}px ${orbit.color}`,
              mixBlendMode: 'screen',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function AboutStack() {
  const section = useRef(null)
  const cardRefs = useRef([])
  // Callback ref em vez de useRef: o OrbitField (filho) precisa do nó real
  // pra anexar o listener de mousemove, mas efeitos de filhos rodam antes
  // do ref do pai ser atribuído (React anexa refs de baixo pra cima). Um
  // useRef comum chegaria `null` no efeito do filho na primeira renderização.
  // Guardando o nó em state, a atribuição do ref dispara um re-render e o
  // OrbitField recebe o valor certo como prop.
  const [stackWrapper, setStackWrapper] = useState(null)

  useGSAP(() => {
    const update = (progress) => {
      // progress (0-1) do pin inteiro vira p (0 a CARDS.length-1): cada
      // unidade inteira de p corresponde a "um card sendo consumido".
      const p = progress * (CARDS.length - 1)

      CARDS.forEach((_, i) => {
        // local = quanto ESTE card específico já avançou na própria
        // transição de saída. p-i é negativo enquanto o scroll ainda não
        // chegou na vez desse card (ele fica parado, no estado de
        // repouso); passa de 0 a 1 durante a janela em que é o card do
        // topo saindo; e fica travado em 1 depois que ele já foi
        // "empilhado" pra trás, cedendo lugar ao próximo.
        const local = fade(p, i, i + 1)

        // A opacidade cai mais rápido que o scale/y (fator 1.6 em vez de 1):
        // se ela caísse na mesma velocidade do movimento, o texto que está
        // saindo ainda estaria legível — só um pouco menor e deslocado —
        // bem em cima do texto do próximo card, os dois nítidos ao mesmo
        // tempo. Fazendo a opacidade zerar bem antes do fim da janela (por
        // volta de 60% do caminho) e somando um blur crescente, a saída
        // vira um borrão que dissolve, não um "texto por cima de texto".
        gsap.set(cardRefs.current[i], {
          scale: 1 - local * 0.15,
          y: -local * 110,
          opacity: Math.max(0, 1 - local * 2.2),
          filter: `blur(${local * 12}px)`,
        })
      })
    }

    ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    })

    update(0)
  }, { scope: section })

  return (
    <section ref={section} id="sobre" className="relative h-screen w-full overflow-hidden bg-void/90">
      <div className="absolute top-28 inset-x-0 z-20 px-6 lg:px-16 pointer-events-none">
        <p className="max-w-3xl mx-auto font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Quem somos
        </p>
      </div>

      <div ref={setStackWrapper} className="relative h-full w-full">
        <OrbitField container={stackWrapper} />

        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => { cardRefs.current[i] = el }}
            className="absolute inset-0 flex items-center justify-center px-6 lg:px-16"
            style={{ zIndex: CARDS.length - i }}
          >
            {/* Altura fixa (não min-height): como os cards ficam absolutamente
                sobrepostos, uma altura variável faria o card de baixo — se o
                texto dele for mais alto que o do card de cima — vazar pelas
                bordas mesmo com z-index e opacidade corretos. */}
            <div className="w-full max-w-3xl h-[420px] lg:h-[460px] overflow-hidden bg-surface border border-surface-2 rounded-3xl p-10 lg:p-16 flex flex-col justify-center">
              <h3 className="font-display font-semibold text-3xl lg:text-5xl leading-tight mb-6">
                {card.title}
              </h3>
              <p className="text-muted text-xl lg:text-2xl leading-relaxed max-w-xl">{card.text}</p>

              {card.stats && (
                <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-surface-2 max-w-sm">
                  {card.stats.map(([n, l]) => (
                    <div key={l}>
                      <p className="font-display text-3xl font-semibold text-signal">{n}</p>
                      <p className="text-sm text-muted mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
