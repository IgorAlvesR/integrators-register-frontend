'use client'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { useTheme } from '@/hooks/useTheme'

const inter = Inter({ subsets: ['latin'] })

type BodyProps = {
  children: ReactNode
}

export function Body({ children }: BodyProps) {
  const { theme } = useTheme()
  return <body className={`${inter.className} ${theme}`}>{children}</body>
}
