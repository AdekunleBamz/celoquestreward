'use client'
import { useRouter } from 'next/navigation'
import { useAccount, useConnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Coins, Zap, Users, Award, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import sdk from '@farcaster/miniapp-sdk'

export default function Home() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()
  const [isInFarcaster, setIsInFarcaster] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Call ready() immediately
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  // Just detect Farcaster context (don't connect)
  useEffect(() => {
    const checkFarcaster = async () => {
      try {
        await sdk.context
        setIsInFarcaster(true)
      } catch (e) {
        setIsInFarcaster(false)
      }
    }
    checkFarcaster()
  }, [])

  // Redirect to dashboard after connection
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, router])

  // MANUAL connection only - user must click button
  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      if (isInFarcaster && connectors[0]) {
        // Farcaster wallet
        await connect({ connector: connectors[0] })
      } else {
        // Web3Modal for browser
        await open()
      }
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
            <Coins className="text-emerald-600" size={48} />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            CeloQuest Rewards
          </h1>
          <p className="text-2xl text-emerald-100 mb-8">
            Complete tasks, earn points, claim CELO
          </p>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-white hover:bg-gray-100 text-emerald-600 px-12 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                Connecting...
              </>
            ) : (
              <>
                {isInFarcaster ? 'Connect Farcaster Wallet' : 'Connect Wallet'}
                <ArrowRight size={24} />
              </>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <Zap className="mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Daily Check-ins</h3>
            <p className="text-emerald-100">Earn points every day just for logging in</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <Award className="mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Complete Tasks</h3>
            <p className="text-emerald-100">Finish tasks to earn bonus points</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <Users className="mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Refer Friends</h3>
            <p className="text-emerald-100">Get 50 points for each referral</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <Coins className="mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Claim CELO</h3>
            <p className="text-emerald-100">Convert points to real CELO tokens</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-emerald-100">
            <p>1️⃣ Connect your Celo wallet and register with your Farcaster username</p>
            <p>2️⃣ Complete daily check-ins and tasks to earn points</p>
            <p>3️⃣ Build your streak for bonus rewards</p>
            <p>4️⃣ Convert 100 points = 0.01 CELO and claim anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}
