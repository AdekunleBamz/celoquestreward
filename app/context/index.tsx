"use client"

import React, { ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config, projectId } from '../config/wagmi'

// Track Web3Modal initialization
let web3ModalPromise: Promise<void> | null = null

async function initializeWeb3Modal() {
  if (typeof window === 'undefined') return
  
  if (!web3ModalPromise) {
    web3ModalPromise = (async () => {
      try {
        const { createWeb3Modal } = await import('@web3modal/wagmi/react')
        createWeb3Modal({
          wagmiConfig: config,
          projectId,
          enableAnalytics: false,
          enableOnramp: false,
          themeMode: 'dark',
        })
      } catch (error) {
        console.warn('Web3Modal initialization error:', error)
      }
    })()
  }
  
  return web3ModalPromise
}

// Create QueryClient outside component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5000,
    },
  },
})

export function ContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initializeWeb3Modal().then(() => setReady(true))
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {ready ? children : (
          <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 flex items-center justify-center">
            <div className="text-white text-xl font-semibold">Loading...</div>
          </div>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
