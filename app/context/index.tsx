"use client"

import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, State } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config, projectId } from '../config/wagmi'

export function ContextProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  const [mounted, setMounted] = useState(false)
  const initialized = useRef(false)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }))

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      try {
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
    }
    setMounted(true)
  }, [])

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
