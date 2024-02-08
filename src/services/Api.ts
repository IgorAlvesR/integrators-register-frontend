import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'
import axios from 'axios'

export class Api implements ServiceIntegrator {
  async getIntegrators(): Promise<IntegratorType[]> {
    const response = await axios.get(`${process.env.API_BASE_URL}/integrators`)
    if (!response.data) {
      throw new Error('Não foi possível buscar por integradores!')
    }
    return response.data
  }
}
