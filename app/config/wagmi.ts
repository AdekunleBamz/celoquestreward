import { createConfig, http } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { walletConnect, coinbaseWallet } from 'wagmi/connectors'
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!

if (!projectId) throw new Error('Project ID is not defined')

export const config = createConfig({
  chains: [celoAlfajores, celo],
  transports: {
    [celoAlfajores.id]: http(),
    [celo.id]: http(),
  },
  connectors: [
    // Farcaster Mini App connector (auto-connects in Farcaster)
    farcasterMiniApp(),
    // WalletConnect for multi-wallet support
    walletConnect({ projectId }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: 'CeloQuest Rewards',
      appLogoUrl: 'https://celoquestreward.vercel.app/icon.png',
    }),
  ],
})

export { projectId }
