import { IntegratorType, StateInfo } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/interfaces/ServiceIntegrator'
import { resolve } from 'dns'

export class Memory implements ServiceIntegrator {
  private integrators: IntegratorType[] = []

  constructor() {
    this.integrators = [
      {
        id: '1',
        cpfCnpj: '61185671000150',
        integratorName: 'Graham, Gerlach and Wisoky',
        ownerName: 'Igor Alves',
        city: 'West Annabellchester',
        state: 'DE',
        panelBrand: ['Trina Solar'],
        companySize: 'Media',
      },
    ]
  }

  async getStatesInfo(): Promise<StateInfo[]> {
    return new Promise((resolve) => {
      const statesInfo: StateInfo[] = [{ state: 'SC', quantity: 10 }]
      resolve(statesInfo)
    })
  }

  async editIntegrator(data: IntegratorType): Promise<void> {
    return new Promise((resolve) => {
      this.integrators = this.integrators.map((integrator) => {
        if (data.id === integrator.id) {
          return data
        }
        return integrator
      })
      resolve()
    })
  }

  async registerIntegrator(data: IntegratorType): Promise<void> {
    return new Promise((resolve) => {
      this.integrators.push(data)
      resolve()
    })
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
