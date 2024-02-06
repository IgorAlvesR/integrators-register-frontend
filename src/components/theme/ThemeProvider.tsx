'use client'

import { ThemeType, ThemeContext } from '@/contexts/theme'
import { ReactNode, useState } from 'react'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>('dark')

  const changeTheme = (theme: ThemeType) => {
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
