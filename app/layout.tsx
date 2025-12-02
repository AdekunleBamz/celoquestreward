import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ContextProvider } from './context'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from './config/wagmi'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CeloQuest Rewards',
  description: 'Earn CELO by completing daily tasks',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let initialState = undefined
  try {
    const headersList = await headers()
    const cookies = headersList.get('cookie')
    initialState = cookieToInitialState(config, cookies)
  } catch (error) {
    console.warn('Failed to get initial state from cookies:', error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ContextProvider initialState={initialState}>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
