import { Body } from '@/components/Body'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { NavBar } from '@/components/NavBar'
import { Container } from '@/components/Container'

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
        <Body>
          <NavBar />
          <Container>{children}</Container>
        </Body>
      </ThemeProvider>
    </html>
  )
}
