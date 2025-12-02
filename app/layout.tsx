import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ContextProvider } from './context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CeloQuest Rewards',
  description: 'Earn CELO by completing daily tasks',
}

// Force dynamic rendering for all routes
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
