import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ContextProvider from '@/app/context'

const inter = Inter({ subsets: ['latin'] })

const FRAME_URL = 'https://celoquestreward.vercel.app'

const miniappEmbed = {
  version: "1",
  imageUrl: `${FRAME_URL}/api/frame-image`,
  button: {
    title: "Start Earning CELO",
    action: {
      type: "launch_frame",
      name: "CeloQuest Rewards",
      url: FRAME_URL,
      splashImageUrl: `${FRAME_URL}/api/frame-image`,
      splashBackgroundColor: "#10b981"
    }
  }
}

export const metadata: Metadata = {
  title: 'CeloQuest Rewards - Earn CELO Daily',
  description: 'Complete tasks, earn points, claim CELO rewards. Built on Celo blockchain.',
  metadataBase: new URL(FRAME_URL),
  openGraph: {
    title: 'CeloQuest Rewards - Earn CELO Daily',
    description: 'Complete tasks, earn points, claim CELO rewards on Celo blockchain',
    images: ['/api/frame-image'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniappEmbed),
    // For backward compatibility
    'fc:frame': JSON.stringify(miniappEmbed),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={null}>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
