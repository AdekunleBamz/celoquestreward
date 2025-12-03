'use client'
import { useEffect } from 'react'
import sdk from '@farcaster/frame-sdk'

export default function FarcasterSDK() {
  useEffect(() => {
    // Call ready immediately - don't wait for context
    sdk.actions.ready()
    console.log('Farcaster SDK ready() called')
  }, [])

  return null
}
