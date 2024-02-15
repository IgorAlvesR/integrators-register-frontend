import { IntegratorType } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/ServiceIntegrator'
import axios from 'axios'

export class Api implements ServiceIntegrator {
  async registerIntegrator(data: IntegratorType): Promise<void> {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/integrators/`,
      data,
    )
    if (!response.data) {
      throw new Error('Não foi possível registrar integrador!')
    }
  }

  async removeIntegrator(id: string): Promise<void> {
    const response = await axios.delete(
      `${process.env.API_BASE_URL}/integrators/${id}`,
    )
    if (!response.data) {
      throw new Error('Não foi possível remover integrador!')
    }
  }

  async getIntegrators(): Promise<IntegratorType[]> {
    const response = await axios.get(`${process.env.API_BASE_URL}/integrators`)
    if (!response.data) {
      throw new Error('Não foi possível buscar por integradores!')
    }
    return response.data
  }
}
