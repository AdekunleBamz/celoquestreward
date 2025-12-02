import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ContextProvider from '@/app/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CeloQuest Rewards - Earn CELO Daily',
  description: 'Complete tasks, earn points, claim CELO rewards. Built on Celo blockchain.',
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'CeloQuest Rewards',
    description: 'Complete tasks, earn points, claim CELO rewards',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/og-image.png',
    'fc:frame:button:1': 'Start Quest',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': process.env.NEXT_PUBLIC_APP_URL || 'https://celoquestreward.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="farcaster-frame-manifest" href="/farcaster/manifest.json" />
      </head>
      <body className={inter.className}>
        <ContextProvider cookies={null}>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
