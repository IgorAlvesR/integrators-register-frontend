import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'

export class Memory implements ServiceIntegrator {
  async getIntegrators(): Promise<IntegratorType[]> {
    return new Promise((resolve) => {
      const integratorsList: IntegratorType[] = [
        {
          CPFOrCNPJ: '61185671000150',
          integratorName: 'Graham, Gerlach and Wisoky',
          ownerName: 'Igor Alves',
          city: 'West Annabellchester',
          state: 'DE',
          panelBrand: ['Trina Solar'],
          companySize: 'medium',
        },
      ]
      resolve(integratorsList)
    })
  }
}
