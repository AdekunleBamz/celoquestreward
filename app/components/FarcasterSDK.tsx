'use client'
import { useEffect } from 'react'
import sdk from '@farcaster/frame-sdk'

export default function FarcasterSDK() {
  useEffect(() => {
    const initSDK = async () => {
      try {
        // Wait for SDK context to be ready
        const context = await sdk.context
        console.log('Farcaster context:', context)
        
        // Signal that the app is ready
        sdk.actions.ready()
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error)
        // Still call ready to hide splash screen
        sdk.actions.ready()
      }
    }

    initSDK()
  }, [])

  return null // This component doesn't render anything
}
