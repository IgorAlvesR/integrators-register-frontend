import { ServiceIntegrator } from './interfaces/ServiceIntegrator'

export type CompanySize = 'Pequena' | 'Media' | 'Grande'

export type StateInfo = {
  state: string
  quantity: number
}

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

  async editIntegrator(data: IntegratorType) {
    try {
      await this.api.editIntegrator(data)
    } catch (error) {
      throw new Error('Não foi possível editar os dados do integrador!')
    }
  }

  async getStatesInfo(): Promise<StateInfo[]> {
    try {
      const response = await this.api.getStatesInfo()
      return response
    } catch (error) {
      throw new Error('Não foi possível buscar integradores por estado!')
    }
  }
}
