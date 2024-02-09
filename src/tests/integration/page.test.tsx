import { Providers } from '@/components/Providers'
import { Memory } from '@/services/Memory'
import { render, screen, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterEach } from 'node:test'
import { QueryClient, QueryClientProvider } from 'react-query'
import { afterAll, beforeAll, expect, test } from 'vitest'
import Integrators from '../../app/page'

const server = setupServer(
  http.get('http://localhost:3001/integrators', async () => {
    const serviceMemory = new Memory()
    const integrators = await serviceMemory.getIntegrators()
    return HttpResponse.json(integrators)
  }),
)

beforeAll(() => {
  process.env.API_BASE_URL = 'http://localhost:3001'
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

test('deve buscar e preencher a lista de integradores', async () => {
  render(
    <Providers>
      <Integrators />
    </Providers>,
  )
  expect(screen.getByTestId('skeleton-integrator')).toBeDefined()
  await waitFor(() => {
    expect(screen.queryByTestId('skeleton-integrator')).toBeNull()
    expect(screen.getByTestId('list-integrator')).toBeDefined()
  })
})

test('deve mostrar uma mensagem que a lista de integradores está vazia', async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: false } },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <Integrators />
    </QueryClientProvider>,
  )
  await waitFor(() => {
    expect(screen.getByTestId('empty-list')).toBeDefined()
  })
})
