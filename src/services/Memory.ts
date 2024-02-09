import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'

export class Memory implements ServiceIntegrator {
  private integrators: IntegratorType[] = []

  constructor() {
    this.integrators = [
      {
        id: '1',
        CPFOrCNPJ: '61185671000150',
        integratorName: 'Graham, Gerlach and Wisoky',
        ownerName: 'Igor Alves',
        city: 'West Annabellchester',
        state: 'DE',
        panelBrand: ['Trina Solar'],
        companySize: 'medium',
      },
    ]
  }

  async removeIntegrator(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.integrators = this.integrators.filter(
        (integrator) => integrator.id !== id,
      )
      resolve()
    })
  }

  async getIntegrators(): Promise<IntegratorType[]> {
    return new Promise((resolve) => {
      resolve(this.integrators)
    })
  }
}
