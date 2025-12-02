import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'

export const projectId = '8b50179539f8beea2f4a0c070d058d77'

const metadata = {
  name: 'CeloQuest Rewards',
  description: 'Earn CELO by completing daily tasks',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://celoquestreward.vercel.app',
  icons: ['https://celoquestreward.vercel.app/favicon.svg']
}

export const config = defaultWagmiConfig({
  chains: [celo, celoAlfajores],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableCoinbase: true,
  enableEIP6963: true,
})
