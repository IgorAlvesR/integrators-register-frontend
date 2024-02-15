import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'

export class MemoryError implements ServiceIntegrator {
  registerIntegrator(data: IntegratorType): Promise<void> {
    return new Promise((resolve, reject) => {
      reject(new Error(`Erro ao registrar integrador ${data.id}`))
    })
  }

  async removeIntegrator(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      reject(new Error(`Erro ao remover integrador ${id}`))
    })
  }

  async getIntegrators(): Promise<IntegratorType[]> {
    return new Promise((resolve, reject) => {
      reject(new Error('Erro ao buscar integradores'))
    })
  }
}
