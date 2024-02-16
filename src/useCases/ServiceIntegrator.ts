import { IntegratorType } from './Integrators'

export interface ServiceIntegrator {
  getIntegrators(): Promise<IntegratorType[]>
  removeIntegrator(id: string): Promise<void>
  registerIntegrator(data: IntegratorType): Promise<void>
  editIntegrator(data: IntegratorType): Promise<void>
}
