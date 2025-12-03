'use client'
import { useEffect } from 'react'
import sdk from '@farcaster/miniapp-sdk'

export default function FarcasterSDK() {
  useEffect(() => {
    // Call ready immediately
    sdk.actions.ready()
    console.log('Farcaster Mini App SDK ready() called')
  }, [])

  return null
}
