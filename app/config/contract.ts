export const CONTRACT_ADDRESS = '0x15426cEBD33098d53942B6BeD648C07ae2a72A28' as `0x${string}`

export const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "string","name": "_farcasterUsername","type": "string"},{"internalType": "address","name": "_referrer","type": "address"}],
    "name": "register",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dailyCheckIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "completeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "_wallet","type": "address"}],
    "name": "getUser",
    "outputs": [
      {"internalType": "string","name": "farcasterUsername","type": "string"},
      {"internalType": "uint256","name": "totalPoints","type": "uint256"},
      {"internalType": "uint256","name": "totalEarned","type": "uint256"},
      {"internalType": "uint256","name": "checkInStreak","type": "uint256"},
      {"internalType": "uint256","name": "referralCount","type": "uint256"},
      {"internalType": "bool","name": "canCheckIn","type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLeaderboard",
    "outputs": [
      {"internalType": "address[]","name": "","type": "address[]"},
      {"internalType": "uint256[]","name": "","type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTasks",
    "outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "name": "tasks",
    "outputs": [
      {"internalType": "uint256","name": "id","type": "uint256"},
      {"internalType": "string","name": "title","type": "string"},
      {"internalType": "string","name": "description","type": "string"},
      {"internalType": "uint256","name": "rewardPoints","type": "uint256"},
      {"internalType": "uint256","name": "rewardCelo","type": "uint256"},
      {"internalType": "bool","name": "isActive","type": "bool"},
      {"internalType": "uint256","name": "completionCount","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "hasCompletedTask",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalUsers",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const
