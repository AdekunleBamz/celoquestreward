"use client"

import React, { ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config, projectId } from '../config/wagmi'

// Track Web3Modal initialization
let web3ModalInitialized = false

async function initializeWeb3Modal() {
  if (typeof window === 'undefined') return
  if (web3ModalInitialized) return
  
  try {
    const { createWeb3Modal } = await import('@web3modal/wagmi/react')
    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      enableAnalytics: false,
      enableOnramp: false,
      themeMode: 'dark',
    })
    web3ModalInitialized = true
  } catch (error) {
    console.warn('Web3Modal initialization error:', error)
  }
}

// Create QueryClient outside component to prevent recreation on re-renders
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initializeWeb3Modal().then(() => {
      setMounted(true)
    })
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
