import {
  CompanySizeInfo,
  IntegratorType,
  StateInfo,
} from '@/useCases/Integrators'
import { ServiceIntegrator } from '@/useCases/interfaces/ServiceIntegrator'

export class MemoryError implements ServiceIntegrator {
  async getCompanySizeInfo(): Promise<CompanySizeInfo[]> {
    return new Promise((resolve, reject) => {
      reject(
        new Error(
          `Erro ao buscar informações de integradores por porte da empresa.`,
        ),
      )
    })
  }

  async getStatesInfo(): Promise<StateInfo[]> {
    return new Promise((resolve, reject) => {
      reject(
        new Error(`Erro ao buscar informações de integradores por estados.`),
      )
    })
  }

  async editIntegrator(data: IntegratorType): Promise<void> {
    return new Promise((resolve, reject) => {
      reject(new Error(`Erro ao editar dados do integrador ${data.id}`))
    })
  }

  registerIntegrator(data: IntegratorType): Promise<void> {
    return new Promise((resolve, reject) => {
      reject(new Error(`Erro ao registrar integrador ${data.id}`))
    })
  }

  async removeIntegrator(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      reject(new Error(`Erro ao remover integrador ${id}`))
    })
  }

  async getIntegrators(): Promise<IntegratorType[]> {
    return new Promise((resolve, reject) => {
      reject(new Error('Erro ao buscar integradores'))
    })
  }
}
