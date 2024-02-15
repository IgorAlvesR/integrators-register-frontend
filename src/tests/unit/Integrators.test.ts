import { expect, test } from 'vitest'
import { Integrator, IntegratorType } from '../../useCases/Integrators'
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

test('deve registrar um integrador', async () => {
  const newIntegrador: IntegratorType = {
    id: '1000',
    cpfCnpj: '10196083907',
    integratorName: 'Igor',
    ownerName: 'Thay',
    city: 'Tubarão',
    state: 'Santa Catarina',
    companySize: 'Media',
    panelBrand: ['Trina Solar'],
  }

  const service = new Memory()
  const integrator = new Integrator(service)
  await integrator.registerIntegrator(newIntegrador)
  const integrators = await integrator.getIntegrators()
  expect(integrators).toHaveLength(2)
})

test('deve retornar um erro ao registrar um integrador', async () => {
  const newIntegrador: IntegratorType = {
    id: '1000',
    cpfCnpj: '10196083907',
    integratorName: 'Igor',
    ownerName: 'Thay',
    city: 'Tubarão',
    state: 'Santa Catarina',
    companySize: 'Media',
    panelBrand: ['Trina Solar'],
  }
  const service = new MemoryError()
  const integrator = new Integrator(service)
  expect(() => integrator.registerIntegrator(newIntegrador)).rejects.toThrow(
    'Não foi possível registrar o integrador!',
  )
})
