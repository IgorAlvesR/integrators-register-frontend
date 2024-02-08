import { Body } from '@/components/Body'
import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '@/components/NavBar'
import { Container } from '@/components/Container'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Integradores',
  description: 'Gerencie seus integradores aqui.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <Providers>
        <Body>
          <NavBar />
          <Container>{children}</Container>
          <Toaster />
        </Body>
      </Providers>
    </html>
  )
}
