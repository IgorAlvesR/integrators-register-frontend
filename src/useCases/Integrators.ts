import { ServiceIntegrator } from './ServiceIntegrator'

export type CompanySize = 'Pequena' | 'Media' | 'Grande'

export type IntegratorType = {
  id: string
  cpfCnpj: string
  integratorName: string
  ownerName: string
  city: string
  state: string
  panelBrand: Array<string>
  companySize: CompanySize
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

  async removeIntegrator(id: string): Promise<void> {
    try {
      await this.api.removeIntegrator(id)
    } catch (error) {
      throw new Error('Não foi possível remover o integrador!')
    }
  }

  async registerIntegrator(data: IntegratorType) {
    try {
      await this.api.registerIntegrator(data)
    } catch (error) {
      throw new Error('Não foi possível registrar o integrador!')
    }
  }
}
