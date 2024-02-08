import { expect, test } from 'vitest'
import { Integrator } from '../../useCases/Integrators'
import { Memory } from '../../services/Memory'
import { MemoryError } from '../../services/MemoryError'

test('deve retornar uma lista de integradores', async () => {
  const service = new Memory()
  const integrador = new Integrator(service)
  const integrators = await integrador.getIntegrators()
  expect(integrators).toHaveLength(1)
})

test('deve retornar um erro ao buscar integradores', async () => {
  const service = new MemoryError()
  const integrador = new Integrator(service)
  expect(() => integrador.getIntegrators()).rejects.toThrow(
    'Não foi possível buscar os integradores!',
  )
})
