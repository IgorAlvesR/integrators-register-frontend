import { CardIntegrator } from '@/components/CardIntegrator'
import { Memory } from '@/services/Memory'
import { Integrator } from '@/useCases/Integrators'
import { fireEvent, render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'

test('deve renderizar o card com as informações do integrador', async () => {
  const serviceMemory = new Memory()
  const integratorUseCase = new Integrator(serviceMemory)
  const [integrator] = await integratorUseCase.getIntegrators()
  render(
    <CardIntegrator
      onEdit={() => ({})}
      onRemove={(id: string) => ({ id })}
      integrator={integrator}
    />,
  )
  expect(screen.getByText(/Igor Alves/)).toBeDefined()
})

test('deve abrir o modal de confirmação de remoção', async () => {
  const serviceMemory = new Memory()
  const integratorUseCase = new Integrator(serviceMemory)
  const [integrator] = await integratorUseCase.getIntegrators()

  render(
    <CardIntegrator
      onEdit={() => ({})}
      onRemove={(id) => ({ id })}
      integrator={integrator}
    />,
  )
  const [btnRemove] = screen.getAllByTestId('btn-remove-integrator')
  fireEvent.click(btnRemove)
  const btnConfirmRemove = screen.getByText(/Confirmar/)

  expect(btnConfirmRemove).toBeDefined()
})
