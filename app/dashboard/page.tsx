'use client'
import { useAccount } from 'wagmi'
import { useContract } from '@/app/hooks/useContract'
import Header from '@/app/components/Header'
import Register from '@/app/components/Register'
import Stats from '@/app/components/Stats'
import TaskCard from '@/app/components/TaskCard'
import { Calendar, Gift, Trophy } from 'lucide-react'
import { formatAddress, formatPoints } from '@/app/utils/format'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  
  let hookData
  try {
    hookData = useContract()
  } catch (error) {
    console.error('Contract hook error:', error)
    hookData = {
      userData: undefined,
      allTaskIds: undefined,
      leaderboard: undefined,
      dailyCheckIn: () => {},
      claimRewards: () => {},
      isPending: false,
      totalUsers: 0n,
    }
  }
  
  const { userData, allTaskIds, leaderboard, dailyCheckIn, claimRewards, isPending, totalUsers } = hookData

  // Redirect to home if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  if (!isConnected) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600">Redirecting...</p>
          </div>
        </div>
      </>
    )
  }

  // Loading state while fetching user data
  if (isConnected && userData === undefined) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900">Loading your data...</h2>
          </div>
        </div>
      </>
    )
  }

  if (!userData || !userData[0]) {
    return (
      <>
        <Header />
        <Register />
      </>
    )
  }

  const [farcasterUsername, totalPoints, totalEarned, checkInStreak, referralCount, canCheckIn] = userData

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, @{farcasterUsername}! 👋
          </h2>
          <p className="text-gray-600">Keep completing tasks to earn more CELO</p>
        </div>

        <Stats
          totalPoints={totalPoints}
          totalEarned={totalEarned}
          checkInStreak={checkInStreak}
          referralCount={referralCount}
          totalUsers={totalUsers || 0n}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-emerald-600" size={28} />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Daily Check-in</h3>
                <p className="text-sm text-gray-600">Come back every day for rewards</p>
              </div>
            </div>
            <button
              onClick={dailyCheckIn}
              disabled={!canCheckIn || isPending}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100"
            >
              {!canCheckIn ? '✓ Checked in today!' : isPending ? 'Checking in...' : 'Check In Now (+10 pts)'}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="text-emerald-600" size={28} />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Claim Rewards</h3>
                <p className="text-sm text-gray-600">Convert points to CELO (100 pts = 0.01 CELO)</p>
              </div>
            </div>
            <button
              onClick={claimRewards}
              disabled={Number(totalPoints) < 100 || isPending}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100"
            >
              {Number(totalPoints) < 100 ? 'Need 100+ points' : isPending ? 'Claiming...' : 'Claim CELO'}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            Available Tasks
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {allTaskIds?.map((taskId) => (
              <TaskCard key={taskId.toString()} taskId={taskId} />
            ))}
          </div>
        </div>

        {leaderboard && leaderboard[0].length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="text-yellow-600" />
              Leaderboard
            </h3>
            <div className="space-y-3">
              {leaderboard[0].slice(0, 10).map((addr, index) => (
                <div key={addr} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                    <span className="font-mono text-sm">{formatAddress(addr)}</span>
                  </div>
                  <span className="font-bold text-emerald-600">{formatPoints(Number(leaderboard[1][index]))} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
