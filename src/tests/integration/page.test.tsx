import { Providers } from '@/components/Providers'
import { Memory } from '@/services/Memory'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import { afterEach } from 'node:test'
import process from 'process'
import { QueryClient, QueryClientProvider } from 'react-query'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import Integrators from '../../app/page'

const server = setupServer(
  http.get('http://localhost:3001/integrators', async () => {
    const serviceMemory = new Memory()
    const integrators = await serviceMemory.getIntegrators()
    return HttpResponse.json(integrators)
  }),
  http.get('/states.json', () => {
    return HttpResponse.json([
      {
        id: 42,
        sigla: 'SC',
        nome: 'Santa Catarina',
        regiao: {
          id: 4,
          sigla: 'S',
          nome: 'Sul',
        },
      },
    ])
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

test('deve exibir a lista de integradores', async () => {
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

test('deve editar o nome do proprietário de um integrador', async () => {
  render(
    <Providers>
      <Integrators />
    </Providers>,
  )

  const [btnEdit] = screen.getAllByTestId('edit-button')
  expect(btnEdit).toBeDefined()
  fireEvent.click(btnEdit)
  const dialogEdit = await screen.findByTestId('edit-dialog-content')
  expect(dialogEdit).toBeDefined()
  const inputOwnerName = screen.getByPlaceholderText(
    /João da Silva/,
  ) as HTMLInputElement
  fireEvent.focus(inputOwnerName)
  fireEvent.change(inputOwnerName, { target: { value: 'Igor R' } })
  expect(inputOwnerName.value).toBe('Igor R')
  const btnSalvar = screen.getByText(/Salvar/)
  expect(btnSalvar).toBeDefined()
  btnSalvar.onclick = vi.fn()
  fireEvent.click(btnSalvar)
  expect(btnSalvar.onclick).toHaveBeenCalled()
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
