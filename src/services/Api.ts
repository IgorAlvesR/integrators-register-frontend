import { IntegratorType, StateInfo } from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/interfaces/ServiceIntegrator'
import axios from 'axios'

export class Api implements ServiceIntegrator {
  async getStatesInfo(): Promise<StateInfo[]> {
    const statesInfo: StateInfo[] = []
    const integrators = await this.getIntegrators()

    if (!integrators.length) {
      throw new Error('Não foi possível buscar por integradores!')
    }

    const states = this.getStates(integrators)

    for (const state of states) {
      const integratorsByState = await axios.get(
        `${process.env.API_BASE_URL}/integrators?state=${state}`,
      )
      if (!integratorsByState.data) {
        throw new Error(
          `Não foi possível buscar integradores do estado ${state}!`,
        )
      }

      if (integratorsByState.data.length > 0) {
        statesInfo.push({ state, quantity: integratorsByState.data.length })
      }
    }
    return statesInfo
  }

  async editIntegrator(data: IntegratorType): Promise<void> {
    const { id, ...integrator } = data
    const response = await axios.put(
      `${process.env.API_BASE_URL}/integrators/${id}`,
      integrator,
    )
    if (!response.data) {
      throw new Error('Não foi possível editar os dados do integrador!')
    }
  }

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
    return response.data as IntegratorType[]
  }

  private getStates(data: IntegratorType[]) {
    const states = data.map((integrator) => integrator.state)
    return Array.from(new Set(states))
  }
}
