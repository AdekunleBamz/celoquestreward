'use client'
import { useReadContract, useAccount } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/app/config/contract'
import { CheckCircle, Circle, Coins, ExternalLink } from 'lucide-react'
import { useContract } from '@/app/hooks/useContract'
import { openFarcasterComposer, connectFarcasterUser, getCeloscanUrl } from '@/app/utils/farcaster'
import { getRandomCastTemplate } from '@/app/utils/castTemplates'
import { useState, useEffect } from 'react'

interface TaskCardProps {
  taskId: bigint
}

export default function TaskCard({ taskId }: TaskCardProps) {
  const { address } = useAccount()
  const { completeTask, isPending, lastTxHash, justCheckedIn, isSuccess } = useContract()
  const [localCompleted, setLocalCompleted] = useState(false)

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

  if (!taskData) return null

  const [id, title, description, rewardPoints] = taskData
  const taskTitle = title.toString()
  
  // Auto-complete daily check-in task
  useEffect(() => {
    if (justCheckedIn && isSuccess && !isCompleted && taskTitle.toLowerCase().includes('daily check')) {
      setTimeout(() => {
        completeTask(id)
      }, 3000)
    }
  }, [justCheckedIn, isSuccess, isCompleted, taskTitle])

  // Auto-complete first transaction task
  useEffect(() => {
    if (lastTxHash && !isCompleted && taskTitle.toLowerCase().includes('first transaction')) {
      setTimeout(() => {
        completeTask(id)
        setLocalCompleted(true)
      }, 3000)
    }
  }, [lastTxHash, isCompleted, taskTitle])

  const handleTaskAction = async () => {
    if (taskTitle.toLowerCase().includes('connect farcaster')) {
      // Connect Farcaster user
      const username = await connectFarcasterUser()
      if (username) {
        completeTask(id)
      }
    } else if (taskTitle.toLowerCase().includes('cast about celo')) {
      // Open Farcaster composer with random template
      const castText = getRandomCastTemplate()
      openFarcasterComposer(castText)
      // Auto-complete after opening composer
      setTimeout(() => {
        completeTask(id)
      }, 2000)
    } else {
      // Default task completion
      completeTask(id)
    }
  }

  const showCeloscanLink = localCompleted && lastTxHash && taskTitle.toLowerCase().includes('first transaction')

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

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600">
            <Coins size={20} />
            <span className="text-xl font-bold">{Number(rewardPoints)} pts</span>
          </div>

          {!isCompleted && (
            <button
              onClick={handleTaskAction}
              disabled={isPending}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100"
            >
              {isPending ? 'Completing...' : 'Complete'}
            </button>
          )}
        </div>

        {showCeloscanLink && (
          <a
            href={getCeloscanUrl(lastTxHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink size={16} />
            View transaction on Celoscan
          </a>
        )}
      </div>
    </div>
  )
}
