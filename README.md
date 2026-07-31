# DevClub — Landing Page Institucional

Landing page da DevClub construída para o desafio técnico da vaga de
Programador Full Stack (concurso do Rodolfo Mori). O foco não foi só
"ter as seções pedidas", mas usar cada seção como pretexto pra explorar
uma técnica de front-end diferente — Canvas 2D, WebGL/GLSL puro e
animação orientada a scroll com GSAP — mantendo tudo coeso sob um
único conceito narrativo.

## 🔗 Links

- Aplicação publicada: `[adicionar link após o deploy]`
- Repositório: `[adicionar link do GitHub]`

## ✨ Conceito

A página inteira é guiada por uma única linha narrativa: a jornada de
"curioso" a "contratado" de um aluno da DevClub. Essa jornada aparece
literalmente como uma trilha vertical fixa do lado esquerdo da tela
(`JourneyRail`), com marcos que acendem em verde conforme o usuário rola —
curioso → decidiu → estudando → evoluindo → contratado → sua vez —
transformando o scroll em progresso visível, em vez de só empilhar
seções desconectadas. A própria seção "Quem somos" reforça isso contando
a história real do fundador (Rodolfo Mori) com a mesma curva emocional.

## 🛠️ Tecnologias

- **React 19** + **Vite** — base do projeto e dev server
- **Tailwind CSS v4** via `@tailwindcss/vite` — o tema (cores, fontes)
  fica declarado direto em `@theme` dentro de `src/index.css`, não em
  um `tailwind.config.js` tradicional (é o novo modelo "CSS-first" da v4)
- **GSAP 3** + **@gsap/react** (`useGSAP`) — todas as animações de
  entrada, scroll (`ScrollTrigger`, incluindo seções com `pin: true`) e
  parallax de mouse (`gsap.quickTo`)
- **Canvas 2D API** (sem biblioteca de partículas) — texto do Hero
  formado por partículas, campo de "rede de pontos conectados" reutilizado
  em várias seções, chuva de gotas no fundo de outras
- **WebGL + GLSL puro** (sem Three.js) — shader de distorção de água na
  seção final
- **oxlint** — linter do projeto (`npm run lint`)

Não há backend, banco de dados nem chamadas de API — é um projeto 100%
front-end estático.

## 🎬 Seções e técnicas de animação

Da ordem em que aparecem em `App.jsx`:

- **Hero** (`ParticleHero`) — o texto "DevClub" é amostrado pixel a
  pixel de um canvas 2D auxiliar (`getImageData`) e reconstruído como
  milhares de partículas que convergem de posições espalhadas, vibram
  organicamente e são repelidas pelo cursor.
- **Quem somos** (`AboutStack`) — cards de texto empilhados com scroll
  pinado (`ScrollTrigger` com `pin: true`), cada um saindo em fade/blur
  conforme o próximo entra; um campo de partículas orbitando em anéis
  concêntricos reage à posição do mouse.
- **Formações / MBA em Engenharia de Software** (`Formations`) — mockup
  de notebook com LED que acende ao detectar o cursor, ícones de
  tecnologia orbitando em órbitas locais, e fundo de gotas de vidro
  (`GlassDrops`) com brilho verde que segue o mouse.
- **Quem ensina** (`Tutors`) — cards de benefícios com tilt no hover e o
  mesmo fundo de gotas de vidro (`GlassDrops`, reutilizado com seed
  diferente).
- **Resultados** (`Students`) — depoimentos dentro de um setup de três
  monitores; cada tela acende em verde conforme o cursor se *aproxima*
  (não só no hover), com duas ilustrações de galáxia (SVG gerado
  proceduralmente) reagindo à posição do mouse.
- **Empresas parceiras** (`Partners`) — marquee de logos com fundo de
  "rede de pontos conectados" (`NetworkField`, Canvas 2D) que se atrai e
  clareia perto do cursor.
- **Investimento** (`Plans`) — cards de planos, mesmo fundo `NetworkField`.
- **Garantia** (`Guarantee`) — selo circular com texto girando ao longo
  de um `<textPath>` SVG.
- **Dúvidas frequentes** (`FAQ`) — acordeão (transição de altura via
  `grid-template-rows`) sobre o mesmo fundo `NetworkField`.
- **Sua vez / CTA** (`CTA`) — fechamento com o mesmo fundo `NetworkField`.
- **Seção final** (`LogoRippleSection`) — só o logo "DevClub", renderizado
  como textura num canvas WebGL e distorcido por um fragment shader GLSL
  que simula ondulação de água ao redor do cursor, com um "impulso" extra
  no clique.

Por trás de tudo isso, um campo de bolhas (`BubbleField`) fica fixo atrás
da página inteira, sutilmente visível nas seções sem fundo sólido.

## 🤖 Ferramentas de IA utilizadas

- **Claude (Anthropic)** — usado ao longo de todo o desenvolvimento:
  planejamento de cada seção e sua técnica de animação, geração dos
  componentes React/GSAP/Canvas/WebGL, depuração de bugs reais (ex.:
  conflito entre a `transition-all` do Tailwind e as propriedades inline
  que o GSAP escreve a cada frame, corrompendo o `:hover` de um card;
  uma corrida de efeito assíncrono em StrictMode que fazia dois loops de
  render WebGL brigarem pelo mesmo `<canvas>`), e revisão do conteúdo
  institucional (pesquisa de informações reais sobre a DevClub e seu
  fundador para a seção "Quem somos").
- Nenhuma ferramenta de geração de imagem foi usada — todo o visual da
  página (partículas, redes de pontos, ilustrações de galáxia, selo,
  shader) é gerado proceduralmente em código (SVG, Canvas 2D ou WebGL),
  não são imagens.
- Todo o código gerado foi revisado, testado localmente (incluindo
  testes visuais automatizados com Playwright durante o desenvolvimento)
  e é compreendido em detalhe — inclusive as partes mais avançadas
  (shader GLSL, pipeline de textura WebGL), preparado pra ser explicado
  e defendido em entrevista técnica.

## 🚀 Como rodar localmente

```bash
git clone [link do repo]
cd devclub-landing
npm install
npm run dev
```

Nenhuma variável de ambiente ou credencial é necessária — é um projeto
front-end estático, sem backend.

Outros scripts disponíveis:

```bash
npm run build    # build de produção
npm run preview  # serve o build de produção localmente
npm run lint     # oxlint
```

## 🧠 Decisões técnicas

**Tailwind v4 com tema em CSS, não em JS.** A v4 introduziu o modelo
"CSS-first": em vez de um `tailwind.config.js` exportando um objeto de
tema, as cores e fontes do projeto (`--color-signal`, `--color-void`,
`--font-display` etc.) são declaradas direto em `@theme` dentro de
`src/index.css`. Isso elimina uma camada de indireção — o token de cor e
sua definição ficam no mesmo lugar onde o resto do CSS do projeto já
vive, e o Vite plugin oficial (`@tailwindcss/vite`) cuida do resto sem
precisar de PostCSS configurado à parte.

**Canvas 2D em vez de bibliotecas de partículas prontas.** Tanto o texto
de partículas do Hero quanto os fundos de "rede de pontos" reutilizam a
mesma lógica simples (posição, velocidade, `requestAnimationFrame`) sem
depender de uma lib externa. Pra esse volume de elementos (algumas
centenas de partículas, não dezenas de milhares) uma lib traria mais
peso de bundle do que benefício, e ter controle direto sobre o loop de
render facilitou reaproveitar padrões entre seções diferentes (o mesmo
princípio de "distância até o mouse decide a força de um efeito"
aparece repetido no Hero, no `NetworkField` e no shader da seção final).

**WebGL puro em vez de Three.js na seção final.** O efeito de distorção
é uma única técnica isolada (um shader rodando sobre um retângulo que
cobre a tela) — não há cena 3D, câmera, iluminação ou múltiplos objetos
que justifiquem o peso de uma engine 3D completa. Escrever o shader GLSL
e o pipeline de textura na mão manteve o bundle dessa seção mínimo e
deixou a técnica mais transparente de explicar (não há abstração de
biblioteca escondendo o que está acontecendo).

**GSAP para tudo que é orientado a scroll.** O `ScrollTrigger` resolve
de forma consistente tanto animações simples de entrada (fade + translate
ao entrar na viewport) quanto os casos mais complexos (seção com
`pin: true` e progresso mapeado manualmente pra controlar múltiplos
cards empilhados). Usar uma única ferramenta pra ambos os casos evitou
misturar abordagens (ex. `IntersectionObserver` manual para uns efeitos
e uma lib de scroll para outros).

## 📱 Responsividade

- A trilha de progresso lateral (`JourneyRail`) só aparece em telas
  `lg` ou maiores (`hidden lg:block`) — em mobile ela ocuparia espaço
  horizontal que a página não tem sobrando.
- Os efeitos em `<canvas>` (Hero, `NetworkField`, seção final) recalculam
  o próprio tamanho no evento de `resize` e limitam o `devicePixelRatio`
  a 2, evitando texturas desnecessariamente pesadas em telas muito densas.
- Os ícones de tecnologia orbitando o notebook em "Formações" só
  aparecem em telas bem largas (`hidden xl:block`), onde há espaço de
  sobra ao redor do mockup sem esbarrar em texto.
- O restante do layout (grids, tipografia, espaçamento) usa os
  breakpoints padrão do Tailwind (`lg:`, `xl:`) diretamente nas classes
  de cada seção.
