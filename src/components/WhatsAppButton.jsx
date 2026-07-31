const WHATSAPP_NUMBER = '5511999999999'
const WHATSAPP_MESSAGE = 'Olá! Quero saber mais sobre o MBA em Engenharia de Software da DevClub.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function WhatsAppGlyph(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.04 3C9.37 3 3.96 8.4 3.96 15.06c0 2.2.59 4.25 1.62 6.02L3 29l8.1-2.53a12.9 12.9 0 0 0 4.94.98h.01c6.67 0 12.08-5.4 12.08-12.06C28.13 8.72 22.7 3 16.04 3Zm7.14 17.24c-.3.85-1.72 1.62-2.38 1.72-.6.09-1.37.13-2.2-.14-.5-.16-1.15-.37-1.98-.73-3.48-1.5-5.75-4.99-5.93-5.22-.17-.23-1.42-1.89-1.42-3.6 0-1.72.9-2.56 1.22-2.91.3-.34.66-.42.88-.42h.63c.2 0 .48-.04.74.57.3.7.99 2.43 1.08 2.6.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.73.21.35.94 1.55 2.02 2.51 1.39 1.24 2.56 1.63 2.92 1.81.35.18.56.15.77-.08.21-.24.9-1.05 1.14-1.41.24-.35.48-.29.8-.18.33.12 2.1.99 2.46 1.17.35.18.59.26.68.41.09.15.09.86-.21 1.71Z" />
    </svg>
  )
}

// Botão flutuante fixo no canto — é a "bolha de WhatsApp" que o texto da
// seção de Dúvidas frequentes promete. Reaproveita a cor de marca (verde
// signal) em vez do verde oficial do WhatsApp, pra ficar consistente com o
// resto do site em vez de introduzir uma segunda cor.
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="whatsapp-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-void shadow-[0_10px_30px_-8px_rgba(0,230,118,0.6)] transition-transform duration-300 hover:scale-105"
    >
      <span className="whatsapp-fab-ring" aria-hidden="true" />
      <WhatsAppGlyph className="relative h-7 w-7" />
    </a>
  )
}
