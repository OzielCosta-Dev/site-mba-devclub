import { useEffect, useRef } from 'react'

// O vertex shader não desenha o logo — só define um retângulo cobrindo a
// tela inteira em clip space (-1 a 1). vUv sai interpolado pro fragment
// shader, que é onde o trabalho visual (textura + distorção) realmente
// acontece.
const VERTEX_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// A distorção desloca de ONDE a textura é lida (vUv + deslocamento), não
// os pixels do texto em si — o texto nunca se move, só a "janela" através
// da qual ele é amostrado. dist já vem corrigida pela proporção da tela
// (uResolution), senão a onda vira uma elipse em telas não-quadradas.
const FRAGMENT_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uImpulse;

void main() {
  vec2 diff = vUv - uMouse;
  diff.x *= uResolution.x / uResolution.y;
  float dist = length(diff);

  float wave = sin(dist * 40.0 - uTime * 4.0) * exp(-dist * 6.0);
  float strength = (0.03 + uImpulse) * wave;
  vec2 dir = normalize(vUv - uMouse + 1e-4);

  gl_FragColor = texture2D(uTexture, vUv + dir * strength);
}
`

const TEXT = 'DevClub'

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('LogoRippleSection: erro ao compilar shader', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

// Última seção da página: só o logo "DevClub" com uma ondulação de água
// (shader WebGL) que segue o cursor — técnica documentada publicamente
// pela Active Theory no case "How I Fight" (Stand Up To Cancer).
export default function LogoRippleSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    // Sem suporte a WebGL: a seção fica só com o bg-void do CSS por trás
    // do canvas — fallback silencioso, sem mensagem de erro.
    if (!gl) return

    let rafId = null
    let width = 0
    let height = 0
    let cancelled = false
    const mouse = { x: 0.5, y: 0.5 }
    let impulse = 0

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('LogoRippleSection: erro ao linkar o program', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Triangle strip cobrindo o clip space inteiro (2 triângulos = 1 retângulo).
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uTexture = gl.getUniformLocation(program, 'uTexture')
    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uImpulse = gl.getUniformLocation(program, 'uImpulse')

    const texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    // Canvas 2D auxiliar: desenha "DevClub" em verde uma única vez por
    // tamanho de tela, e esse resultado sobe como textura — o shader
    // nunca desenha texto, só reamostra essa textura em UVs distorcidas.
    function buildTexture() {
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const octx = off.getContext('2d')
      const fontSize = Math.min(width * 0.13, 190)
      octx.fillStyle = '#00e676'
      octx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText(TEXT, width / 2, height / 2)

      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = Math.round(rect.width * dpr)
      height = Math.round(rect.height * dpr)
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      buildTexture()
    }

    function render(time) {
      // Decai sozinho a cada frame — sem precisar de um tween separado
      // pra "desligar" o impulso do clique depois de um tempo.
      impulse *= 0.94

      gl.uniform1i(uTexture, 0)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform2f(uResolution, width, height)
      gl.uniform1f(uTime, time * 0.001)
      gl.uniform1f(uImpulse, impulse)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }

    function handleMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.y = 1 - (e.clientY - rect.top) / rect.height
    }

    function handleClick() {
      impulse = Math.min(impulse + 0.18, 0.5)
    }

    async function start() {
      try {
        await document.fonts.load('700 190px "Space Grotesk"')
        await document.fonts.ready
      } catch {
        // Font Loading API indisponível — segue com o que já estiver carregado.
      }
      // Em StrictMode (dev) o efeito monta, desmonta e monta de novo antes
      // dessa promise resolver — sem essa checagem, o start() da primeira
      // instância (já limpa) ligaria um segundo loop de render brigando
      // pelo mesmo canvas/contexto WebGL com o do mount atual.
      if (cancelled) return
      resize()
      rafId = requestAnimationFrame(render)
    }

    start()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMove)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <section className="relative h-[50vh] w-full overflow-hidden bg-void">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </section>
  )
}
