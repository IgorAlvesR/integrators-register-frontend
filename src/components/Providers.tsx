'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider } from './theme/ThemeProvider'
import { queryClient } from '@/lib/queryClient'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
