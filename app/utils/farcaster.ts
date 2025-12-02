// Farcaster integration utilities

export function openFarcasterComposer(text: string) {
  // Open Farcaster's native composer with pre-filled text
  const encodedText = encodeURIComponent(text)
  
  // Check if we're in Farcaster app
  if (typeof window !== 'undefined') {
    // Try to use Farcaster's intent URL
    const farcasterUrl = `https://warpcast.com/~/compose?text=${encodedText}`
    window.open(farcasterUrl, '_blank')
  }
}

export async function connectFarcasterUser(): Promise<string | null> {
  // In a Farcaster mini app context, we can get the user's FID
  // For now, we'll prompt for username
  if (typeof window !== 'undefined') {
    const username = prompt('Enter your Farcaster username (without @):')
    return username
  }
  return null
}

export function getCeloscanUrl(txHash: string, network: 'mainnet' | 'alfajores' = 'alfajores'): string {
  const baseUrl = network === 'mainnet' 
    ? 'https://celoscan.io'
    : 'https://alfajores.celoscan.io'
  return `${baseUrl}/tx/${txHash}`
}
