import { ServiceIntegrator } from './ServiceIntegrator'

export type IntegratorType = {
  id: string
  CPFOrCNPJ: string
  integratorName: string
  ownerName: string
  city: string
  state: string
  panelBrand: Array<string>
  companySize: 'small' | 'medium' | 'large'
}

export class Integrator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly api: ServiceIntegrator) {}

  async getIntegrators(): Promise<IntegratorType[]> {
    try {
      const response = await this.api.getIntegrators()
      return response
    } catch (error) {
      throw new Error('Não foi possível buscar os integradores!')
    }
  }
}
