'use client'
import { useState } from 'react'
import { useContract } from '@/app/hooks/useContract'
import { Sparkles, Users } from 'lucide-react'
import { useAccount } from 'wagmi'

export default function Register() {
  const [farcasterUsername, setFarcasterUsername] = useState('')
  const [referrerAddress, setReferrerAddress] = useState('')
  const { register, isPending, isSuccess } = useContract()
  const { address } = useAccount()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (farcasterUsername) {
      const referrer = (referrerAddress || '0x0000000000000000000000000000000000000000') as `0x${string}`
      register(farcasterUsername, referrer)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <Sparkles className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CeloQuest!</h2>
          <p className="text-gray-600">Register to start earning CELO</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Farcaster Username *
            </label>
            <input
              type="text"
              value={farcasterUsername}
              onChange={(e) => setFarcasterUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="@yourname"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Your Farcaster username (without @)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Users size={16} />
              Referrer Address (Optional)
            </label>
            <input
              type="text"
              value={referrerAddress}
              onChange={(e) => setReferrerAddress(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="0x..."
            />
            <p className="text-xs text-gray-500 mt-1">Who referred you? They'll get bonus points!</p>
          </div>

          <button
            type="submit"
            disabled={isPending || !farcasterUsername}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isPending ? 'Registering...' : isSuccess ? '✓ Registered!' : 'Start Earning'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        </div>
      </div>
    </div>
  )
}
