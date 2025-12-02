import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ContextProvider from '@/app/context'

const inter = Inter({ subsets: ['latin'] })

const FRAME_URL = 'https://celoquestreward.vercel.app'

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
    'fc:frame': 'vNext',
    'fc:frame:image': `${FRAME_URL}/api/frame-image`,
    'fc:frame:button:1': 'Start Earning',
    'fc:frame:post_url': `${FRAME_URL}/api/frame`,
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
