'use client'
import { Coins, TrendingUp, Award, Users } from 'lucide-react'
import { formatPoints, formatCelo } from '@/app/utils/format'

interface StatsProps {
  totalPoints: bigint
  totalEarned: bigint
  checkInStreak: bigint
  referralCount: bigint
  totalUsers: bigint
}

export default function Stats({ totalPoints, totalEarned, checkInStreak, referralCount, totalUsers }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Coins className="text-emerald-600" size={20} />
          </div>
          <p className="text-gray-600 text-sm font-medium">Points</p>
        </div>
        <p className="text-3xl font-bold text-gray-900">{formatPoints(Number(totalPoints))}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <TrendingUp className="text-yellow-600" size={20} />
          </div>
          <p className="text-gray-600 text-sm font-medium">Earned</p>
        </div>
        <p className="text-3xl font-bold text-gray-900">{formatCelo(totalEarned)} CELO</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Award className="text-purple-600" size={20} />
          </div>
          <p className="text-gray-600 text-sm font-medium">Streak</p>
        </div>
        <p className="text-3xl font-bold text-gray-900">{Number(checkInStreak)} days</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="text-blue-600" size={20} />
          </div>
          <p className="text-gray-600 text-sm font-medium">Referrals</p>
        </div>
        <p className="text-3xl font-bold text-gray-900">{Number(referralCount)}</p>
      </div>
    </div>
  )
}
