/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        disabled?: boolean
        balance?: 'show' | 'hide'
        size?: 'sm' | 'md'
        label?: string
        loadingLabel?: string
      }
      'w3m-network-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      'w3m-connect-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      'w3m-account-button': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export {}
