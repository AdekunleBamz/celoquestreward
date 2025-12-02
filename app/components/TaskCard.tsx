'use client'
import { useReadContract, useAccount } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/app/config/contract'
import { CheckCircle, Circle, Coins } from 'lucide-react'
import { useContract } from '@/app/hooks/useContract'

interface TaskCardProps {
  taskId: bigint
}

export default function TaskCard({ taskId }: TaskCardProps) {
  const { address } = useAccount()
  const { completeTask, isPending } = useContract()

  const { data: taskData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'tasks',
    args: [taskId],
  })

  const { data: isCompleted } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasCompletedTask',
    args: address ? [address, taskId] : undefined,
  })

  if (!taskData) {
    return (
      <div className="bg-gray-100 rounded-2xl p-6 shadow-lg animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    )
  }

  const [id, title, description, rewardPoints] = taskData

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        {isCompleted ? (
          <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
        ) : (
          <Circle className="text-gray-300 flex-shrink-0" size={24} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-600">
          <Coins size={20} />
          <span className="text-xl font-bold">{Number(rewardPoints)} pts</span>
        </div>

        {!isCompleted && (
          <button
            onClick={() => completeTask(id)}
            disabled={isPending}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100"
          >
            {isPending ? 'Completing...' : 'Complete'}
          </button>
        )}
      </div>
    </div>
  )
}
