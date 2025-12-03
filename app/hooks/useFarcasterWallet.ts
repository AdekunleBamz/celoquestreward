'use client'
import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'
import { useAccount, useConnect } from 'wagmi'

export function useFarcasterWallet() {
  const [isInFarcaster, setIsInFarcaster] = useState(false)
  const [farcasterAddress, setFarcasterAddress] = useState<string | null>(null)
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()

  useEffect(() => {
    const checkFarcaster = async () => {
      try {
        const context = await sdk.context
        setIsInFarcaster(true)
        
        // Get user's connected address from Farcaster
        if (context?.user?.connectedAddress) {
          setFarcasterAddress(context.user.connectedAddress as string)
        }
      } catch (e) {
        setIsInFarcaster(false)
      }
    }

    checkFarcaster()
  }, [])

  const connectWallet = async () => {
    if (isInFarcaster) {
      // Use Farcaster's embedded wallet
      try {
        const provider = await sdk.wallet.ethProvider
        
        // Request account access
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        })
        
        if (accounts && accounts.length > 0) {
          setFarcasterAddress(accounts[0] as string)
        }
      } catch (error) {
        console.error('Farcaster wallet connection failed:', error)
      }
    } else {
      // Use Web3Modal for regular browser
      const connector = connectors[0]
      if (connector) {
        connect({ connector })
      }
    }
  }

  return {
    isInFarcaster,
    connectWallet,
    isConnected: isInFarcaster ? !!farcasterAddress : isConnected,
    address: isInFarcaster ? farcasterAddress : address,
  }
}
