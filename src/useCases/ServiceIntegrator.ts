import { IntegratorType } from './Integrators'

export interface ServiceIntegrator {
  getIntegrators(): Promise<IntegratorType[]>
}
