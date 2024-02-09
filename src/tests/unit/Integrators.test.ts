import { expect, test } from 'vitest'
import { Integrator } from '../../useCases/Integrators'
import { Memory } from '../../services/Memory'
import { MemoryError } from '../../services/MemoryError'

test('deve retornar uma lista de integradores', async () => {
  const service = new Memory()
  const integrator = new Integrator(service)
  const integrators = await integrator.getIntegrators()
  expect(integrators).toHaveLength(1)
})

test('deve retornar um erro ao buscar integradores', async () => {
  const service = new MemoryError()
  const integrator = new Integrator(service)
  expect(() => integrator.getIntegrators()).rejects.toThrow(
    'Não foi possível buscar os integradores!',
  )
})

test('deve remover um integrador', async () => {
  const service = new Memory()
  const integrator = new Integrator(service)
  await integrator.removeIntegrator('1')
  const integrators = await integrator.getIntegrators()
  expect(integrators).toHaveLength(0)
})

test('deve retornar um erro que não foi possível remover integrador', async () => {
  const service = new MemoryError()
  const integrator = new Integrator(service)
  expect(() => integrator.removeIntegrator('1')).rejects.toThrow(
    'Não foi possível remover o integrador!',
  )
})
