import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'

export class MemoryError implements ServiceIntegrator {
  async removeIntegrator(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      reject(new Error('Erro ao remover integrador'))
    })
  }

  async getIntegrators(): Promise<IntegratorType[]> {
    return new Promise((resolve, reject) => {
      reject(new Error('Erro ao buscar integradores'))
    })
  }
}
