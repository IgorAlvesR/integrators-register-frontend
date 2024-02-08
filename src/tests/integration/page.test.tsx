import { Providers } from '@/components/Providers'
import { Memory } from '@/services/Memory'
import { render, screen } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterEach } from 'node:test'
import { QueryClient, QueryClientProvider } from 'react-query'
import { afterAll, beforeAll, expect, test } from 'vitest'
import Integrators from '../../app/page'

process.env.API_BASE_URL = 'http://localhost:3001'

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(time), time)
  })
}

async function configServerMock() {
  const serviceMemory = new Memory()
  const integrators = await serviceMemory.getIntegrators()
  const server = setupServer(
    http.get('/integrators', () => {
      return HttpResponse.json(integrators)
    }),
  )
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
}

test('Deve buscar e preencher a lista de integradores', async () => {
  await configServerMock()

  render(
    <Providers>
      <Integrators />
    </Providers>,
  )
  expect(screen.getByTestId('skeleton-integrator')).toBeDefined()
  await sleep(2000)
  expect(screen.queryByTestId('skeleton-integrator')).toBeNull()
  expect(screen.getByTestId('list-integrator')).toBeDefined()
})

test('Deve mostrar uma mensagem que a lista de integradores está vazia', async () => {
  await configServerMock()

  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: false } },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <Integrators />
    </QueryClientProvider>,
  )
  await sleep(2000)
  expect(screen.getByTestId('empty-list')).toBeDefined()
})
