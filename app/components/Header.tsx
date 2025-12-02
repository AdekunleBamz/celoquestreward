'use client'
import { useAccount, useDisconnect } from 'wagmi'
import { Coins, LogOut } from 'lucide-react'
import { formatAddress } from '@/app/utils/format'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Coins className="text-emerald-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CeloQuest</h1>
              <p className="text-emerald-100 text-xs">Earn CELO Daily</p>
            </div>
          </Link>

          {!mounted ? (
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium">
              Loading...
            </div>
          ) : isConnected ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-medium">
                {formatAddress(address!)}
              </div>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Disconnect</span>
              </button>
            </div>
          ) : (
            /* @ts-ignore */
            <w3m-button />
          )}
        </div>
      </div>
    </header>
  )
}
