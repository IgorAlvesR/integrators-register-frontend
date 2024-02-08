import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'

export class MemoryError implements ServiceIntegrator {
  async getIntegrators(): Promise<IntegratorType[]> {
    return new Promise((resolve, reject) => {
      reject(new Error('Erro ao buscar integradores'))
    })
  }
}
