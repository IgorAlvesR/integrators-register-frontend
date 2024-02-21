import { CardIntegrator } from '@/components/CardIntegrator'
import { EditIntegrator } from '@/components/EditIntegrator'
import { RemoveIntegrator } from '@/components/RemoveIntegrator'
import { Memory } from '@/services/Memory'
import { Integrator } from '@/useCases/Integrators'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

test('deve renderizar o card com as informações do integrador', async () => {
  const serviceMemory = new Memory()
  const integratorUseCase = new Integrator(serviceMemory)
  const [integrator] = await integratorUseCase.getIntegrators()
  render(
    <CardIntegrator integrator={integrator}>
      <EditIntegrator integrator={integrator} onEdit={() => ({})} />
      <RemoveIntegrator integrator={integrator} onRemove={() => ({})} />
    </CardIntegrator>,
  )
  expect(screen.getByText(/Igor Alves/)).toBeDefined()
})

test('deve abrir o modal de confirmação de remoção', async () => {
  const serviceMemory = new Memory()
  const integratorUseCase = new Integrator(serviceMemory)
  const [integrator] = await integratorUseCase.getIntegrators()

  render(
    <CardIntegrator integrator={integrator}>
      <RemoveIntegrator integrator={integrator} onRemove={() => ({})} />
    </CardIntegrator>,
  )
  const [btnRemove] = screen.getAllByTestId('btn-remove-integrator')
  fireEvent.click(btnRemove)
  const btnConfirmRemove = screen.getByText(/Confirmar/)
  expect(btnConfirmRemove).toBeDefined()
})
