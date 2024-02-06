import { ReactNode } from 'react'

type MobileHeaderProps = {
  children: ReactNode
}
export function MobileHeader({ children }: MobileHeaderProps) {
  return (
    <header className="sm:hidden h-full gap-3 flex flex-col items-center border-b border-b-secondary">
      {children}
    </header>
  )
}
