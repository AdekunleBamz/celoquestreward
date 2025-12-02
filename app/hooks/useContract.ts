'use client'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/app/config/contract'
import { useState, useEffect } from 'react'

export function useContract() {
  const { address } = useAccount()
  const [lastTxHash, setLastTxHash] = useState<string | null>(null)
  const [justCheckedIn, setJustCheckedIn] = useState(false)
  
  const { data: userData, refetch: refetchUser } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUser',
    args: address ? [address] : undefined,
  })

  const { data: leaderboard, refetch: refetchLeaderboard } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getLeaderboard',
  })

  const { data: allTaskIds, refetch: refetchTasks } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllTasks',
  })

  const { data: totalUsers } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalUsers',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const register = (farcasterUsername: string, referrer: `0x${string}`) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'register',
      args: [farcasterUsername, referrer],
    })
  }

  const dailyCheckIn = () => {
    setJustCheckedIn(true)
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'dailyCheckIn',
    })
  }

  const completeTask = (taskId: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'completeTask',
      args: [taskId],
    })
  }

  const claimRewards = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'claimRewards',
    })
  }

  useEffect(() => {
    if (hash) {
      setLastTxHash(hash)
    }
  }, [hash])

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        refetchUser()
        refetchLeaderboard()
        refetchTasks()
      }, 2000)
    }
  }, [isSuccess])

  return {
    userData: userData as any,
    leaderboard: leaderboard as [string[], bigint[]] | undefined,
    allTaskIds: allTaskIds as bigint[] | undefined,
    totalUsers: totalUsers as bigint | undefined,
    register,
    dailyCheckIn,
    completeTask,
    claimRewards,
    isPending,
    isConfirming,
    isSuccess,
    lastTxHash,
    justCheckedIn,
    refetch: () => {
      refetchUser()
      refetchLeaderboard()
      refetchTasks()
    }
  }
}
