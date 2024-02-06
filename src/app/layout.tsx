import { Body } from '@/components/Body'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export const metadata: Metadata = {
  title: 'Cadastro de Integradores',
  description: 'Gerencie seus integradores aqui.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <ThemeProvider>
        <Body>{children}</Body>
      </ThemeProvider>
    </html>
  )
}
