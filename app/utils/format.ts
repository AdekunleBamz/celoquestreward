export function formatCelo(value: bigint | number): string {
  const num = typeof value === 'bigint' ? Number(value) : value
  const celo = num / 1e18
  return celo.toFixed(4)
}

export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatPoints(points: number): string {
  return points.toLocaleString()
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
