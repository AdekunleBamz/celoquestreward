'use client'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Coins, Zap, Users, Award, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [web3Modal, setWeb3Modal] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    // Get the Web3Modal instance after mount
    if (typeof window !== 'undefined') {
      import('@web3modal/wagmi/react').then(({ useWeb3Modal }) => {
        // Store reference to modal
        const modal = (window as any).__web3modal
        setWeb3Modal(modal)
      })
    }
  }, [])

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, router])

  const handleConnect = () => {
    // Try multiple methods to open the modal
    try {
      // Method 1: Use window.__web3modal
      if ((window as any).__web3modal) {
        (window as any).__web3modal.open()
        return
      }

      // Method 2: Click the hidden button's shadow root
      const w3mButton = document.querySelector('w3m-button')
      if (w3mButton?.shadowRoot) {
        const btn = w3mButton.shadowRoot.querySelector('button')
        if (btn) {
          btn.click()
          return
        }
      }

      // Method 3: Dispatch click event
      if (w3mButton) {
        w3mButton.dispatchEvent(new Event('click', { bubbles: true }))
      }
    } catch (error) {
      console.error('Failed to open wallet modal:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600">
      {/* Hidden w3m-button for functionality */}
      {mounted && (
        <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
          {/* @ts-ignore */}
          <w3m-button />
        </div>
      )}
      
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
          <div className="flex justify-center">
            {mounted ? (
              <button
                onClick={handleConnect}
                className="bg-white hover:bg-gray-100 active:scale-95 text-emerald-600 px-12 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 transition-all transform hover:scale-105 shadow-2xl cursor-pointer"
              >
                Start Earning Now
                <ArrowRight size={24} />
              </button>
            ) : (
              <button
                disabled
                className="bg-white/50 text-emerald-600 px-12 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto shadow-2xl"
              >
                Loading...
                <ArrowRight size={24} />
              </button>
            )}
          </div>
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

        <div className="text-center mt-12 text-white text-sm"></div>
      </div>
    </div>
  )
}
