"use client"

import React, { ReactNode, useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config, projectId } from '../config/wagmi'

// Create QueryClient outside component to prevent recreation
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
    if (typeof window === 'undefined') return
    
    // Initialize Web3Modal
    let isMounted = true
    
    const initModal = async () => {
      try {
        const { createWeb3Modal } = await import('@web3modal/wagmi/react')
        if (isMounted) {
          const modal = createWeb3Modal({
            wagmiConfig: config,
            projectId,
            enableAnalytics: false,
            enableOnramp: false,
            themeMode: 'dark',
          })
          
          // Store modal instance globally
          if (typeof window !== 'undefined') {
            ;(window as any).__web3modal = modal
          }
          
          setMounted(true)
        }
      } catch (error) {
        console.error('Web3Modal initialization error:', error)
        // Still set mounted to true even if modal fails
        if (isMounted) {
          setMounted(true)
        }
      }
    }
    
    initModal()
    
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
