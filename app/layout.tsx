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
    title: 'CeloQuest Rewards - Earn CELO Daily',
    description: 'Complete tasks, earn points, claim CELO rewards on Celo blockchain',
    images: ['https://celoquestreward.vercel.app/api/frame-image'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://celoquestreward.vercel.app/api/frame-image',
    'fc:frame:button:1': 'Start Earning CELO',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://celoquestreward.vercel.app',
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
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://celoquestreward.vercel.app/api/frame-image" />
        <meta property="fc:frame:button:1" content="Start Earning CELO" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://celoquestreward.vercel.app" />
      </head>
      <body className={inter.className}>
        <ContextProvider cookies={null}>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
