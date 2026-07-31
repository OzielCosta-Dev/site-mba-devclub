// Selos das tecnologias que flutuam ao redor do notebook da seção de
// Formações. Não são os logos oficiais pixel-a-pixel (como os ícones do
// NavIcons, são versões estilizadas) — mantêm a cor de marca de cada
// tecnologia pra ficarem reconhecíveis à distância, dentro de uma bolha.

export function VSCodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#007ACC" />
      <path
        d="M8 8 4.5 12 8 16M16 8l3.5 4-3.5 4M14 6.5l-4 11"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function JSIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#F7DF1E" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#0a0a0a"
      >
        JS
      </text>
    </svg>
  )
}

export function ReactIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.4">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  )
}

export function NodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 1.5 21.5 7v10L12 22.5 2.5 17V7Z" fill="#3C873A" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#eafff0"
      >
        N
      </text>
    </svg>
  )
}

export function GitIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="11" fill="#F05033" />
      <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <line x1="7.5" y1="4.5" x2="7.5" y2="19.5" />
        <path d="M7.5 12h5a3 3 0 0 0 3-3v-1" />
      </g>
      <circle cx="7.5" cy="4.5" r="1.6" fill="#fff" />
      <circle cx="7.5" cy="19.5" r="1.6" fill="#fff" />
      <circle cx="15.5" cy="7" r="1.6" fill="#fff" />
    </svg>
  )
}

export function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="11" fill="#161b22" />
      <path
        d="M12 5.2c-4 0-6.6 2.9-6.6 6.6 0 2.9 1.8 5.3 4.4 6.2.3.06.4-.14.4-.3v-1.2c-1.8.4-2.2-.8-2.2-.8-.3-.8-.7-1-.7-1-.6-.4.05-.4.05-.4.7.05 1.05.7 1.05.7.6 1.1 1.6.8 2 .6.06-.5.25-.8.45-1-1.6-.18-3.3-.8-3.3-3.6 0-.8.28-1.45.75-1.95-.08-.18-.33-.9.07-1.9 0 0 .6-.2 2 .75a6.9 6.9 0 0 1 3.6 0c1.4-.95 2-.75 2-.75.4 1 .15 1.72.07 1.9.47.5.75 1.15.75 1.95 0 2.8-1.7 3.4-3.32 3.6.26.23.5.68.5 1.37v2.03c0 .17.1.37.4.3 2.6-.9 4.4-3.3 4.4-6.2 0-3.7-2.6-6.6-6.6-6.6Z"
        fill="#f2f1ea"
      />
    </svg>
  )
}

export function MongoDBIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="11" fill="#0d1117" />
      <path d="M12 3c3 3.4 5 7 5 10.2A5 5 0 0 1 12 18a5 5 0 0 1-5-4.8C7 10 9 6.4 12 3Z" fill="#47A248" />
      <path d="M12 6.5v12" stroke="#eafff0" strokeWidth="1" opacity="0.55" />
    </svg>
  )
}

export function PostgreSQLIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="11" fill="#336791" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#fff"
      >
        Pg
      </text>
    </svg>
  )
}

export function N8nIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#EA4560" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#fff"
      >
        n8n
      </text>
    </svg>
  )
}

export function HTML5Icon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3 2h18l-1.6 18-7.4 2-7.4-2L3 2Z" fill="#E34F26" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#fff"
      >
        5
      </text>
    </svg>
  )
}

export function CSSIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3 2h18l-1.6 18-7.4 2-7.4-2L3 2Z" fill="#1572B6" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#fff"
      >
        3
      </text>
    </svg>
  )
}

export function FlexboxIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#2965F1" />
      <rect x="4.5" y="8" width="3" height="8" rx="1" fill="#fff" />
      <rect x="10.5" y="5.5" width="3" height="13" rx="1" fill="#fff" opacity="0.85" />
      <rect x="16.5" y="9.5" width="3" height="6" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  )
}

export function PrismaIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#0C344B" />
      <path d="M12 3.5 19 18.5H5L12 3.5Z" fill="none" stroke="#5AC8DA" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 8 15.5 15.5h-7L12 8Z" fill="#5AC8DA" opacity="0.5" />
    </svg>
  )
}

export function ExpressIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#0a0a0a" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#fff"
      >
        ex
      </text>
    </svg>
  )
}

export function OrmIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#7C3AED" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fontFamily="'JetBrains Mono', monospace"
        fill="#fff"
      >
        ORM
      </text>
    </svg>
  )
}
