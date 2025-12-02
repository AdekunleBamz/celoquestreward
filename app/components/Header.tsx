'use client'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Coins, LogOut, Wallet } from 'lucide-react'
import { formatAddress } from '@/app/utils/format'
import Link from 'next/link'

export default function Header() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

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

          {isConnected ? (
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
            <button
              onClick={() => open()}
              className="bg-white hover:bg-gray-100 text-emerald-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <Wallet size={20} />
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
