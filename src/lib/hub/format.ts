export function flagEmoji(cc: string | null | undefined): string {
  if (!cc || cc.length !== 2) return ''
  const A = 0x1f1e6
  return (
    String.fromCodePoint(A + cc.charCodeAt(0) - 65) +
    String.fromCodePoint(A + cc.charCodeAt(1) - 65)
  )
}

export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return Math.floor(diff) + 's ago'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

export function pluralize(n: number, w: string): string {
  return n + ' ' + (n === 1 ? w : w + 's')
}

export function eventKind(event: string): 'signup' | 'error' | 'default' {
  if (event.includes('signup') || event.includes('signed_up')) return 'signup'
  if (event.includes('rageclick') || event.includes('exception') || event.includes('error')) return 'error'
  return 'default'
}
