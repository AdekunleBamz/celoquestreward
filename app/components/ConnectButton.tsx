"use client"

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function ConnectButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        disabled
        className="bg-white/50 text-emerald-600 px-12 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto shadow-2xl"
      >
        Loading...
      </button>
    )
  }

  // Use Web3Modal's built-in button
  // @ts-ignore - Web3Modal custom element
  return <w3m-button />
}

export function ConnectButtonStyled({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        disabled
        className="bg-white hover:bg-gray-100 text-emerald-600 px-12 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto transition-all shadow-2xl opacity-50"
      >
        {children || 'Start Earning Now'}
        <ArrowRight size={24} />
      </button>
    )
  }

  // @ts-ignore - Web3Modal custom element
  return <w3m-button />
}
