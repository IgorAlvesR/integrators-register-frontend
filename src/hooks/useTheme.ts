import { ThemeContext } from '@/contexts/theme'
import { useContext } from 'react'

export function useTheme() {
  const { theme, changeTheme } = useContext(ThemeContext)
  return { theme, changeTheme }
}
