'use client'

import { createContext } from 'react'

export type ThemeType = 'dark' | 'light' | 'system'
type ContextType = {
  theme: ThemeType
  changeTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext<ContextType>({
  theme: 'dark',
  changeTheme: () => ({}),
})
