// Simple, single-stroke icons themed around Star Wars — mapped to the
// page's own hero's-journey structure (see JourneyRail), not literal
// franchise logos.

export function TwinSunsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 17h18" strokeLinecap="round" />
      <circle cx="9" cy="14" r="3.2" />
      <circle cx="15.5" cy="13" r="2.1" />
    </svg>
  )
}

export function SaberIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <line x1="12" y1="2.5" x2="12" y2="15" strokeLinecap="round" />
      <rect x="10.2" y="15" width="3.6" height="5" rx="1" />
    </svg>
  )
}

export function HoodIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 19c0-5 2.5-9 6-9s6 4 6 9" strokeLinecap="round" />
      <path d="M9 19v-6a3 3 0 0 1 6 0v6" strokeLinecap="round" />
    </svg>
  )
}

export function MedalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="10" r="5.5" />
      <path d="M12 7.2v1.8M12 11v1.8M9.2 10h1.8M13 10h1.8" strokeLinecap="round" />
      <path d="m9 15-2 6 5-2.3L17 21l-2-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DeathStarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17" />
      <circle cx="15.5" cy="8.5" r="2" />
    </svg>
  )
}

export function HyperspaceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 8h4M3 12h6M3 16h4" strokeLinecap="round" />
      <path d="M11 12h9M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
