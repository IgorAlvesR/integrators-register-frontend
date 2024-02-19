import { expect, test } from 'vitest'
import { Memory } from '../../services/Memory'
import { MemoryError } from '../../services/MemoryError'
import { Integrator, IntegratorType } from '../../useCases/Integrators'

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

test('deve editar um integrador', async () => {
  const editedIntegrator: IntegratorType = {
    id: '1',
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
  await integrator.editIntegrator(editedIntegrator)
  const integrators = await integrator.getIntegrators()

  expect(integrators[0].ownerName).toBe('Thay')
})

test('deve retornar um erro ao editar um integrador', async () => {
  const editedIntegrator: IntegratorType = {
    id: '1',
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
  expect(() => integrator.editIntegrator(editedIntegrator)).rejects.toThrow(
    'Não foi possível editar os dados do integrador!',
  )
})

test('deve retornar as informações de integradores por estado', async () => {
  const service = new Memory()
  const integrator = new Integrator(service)
  const statesInfo = await integrator.getStatesInfo()
  expect(statesInfo).toHaveLength(1)
})

test('deve retornar um erro ao buscar informações de integradores por estado', async () => {
  const service = new MemoryError()
  const integrator = new Integrator(service)
  expect(() => integrator.getStatesInfo()).rejects.toThrow(
    'Não foi possível buscar integradores por estado!',
  )
})
