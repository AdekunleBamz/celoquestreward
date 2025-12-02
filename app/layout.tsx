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
