import { routes } from '@/routes'
import { MenuItem } from './MenuItem'

export function Menu() {
  return (
    <menu className="text-xs sm:text-base flex gap-2 sm:gap-4">
      <MenuItem path={routes.INTEGRATORS.path} text={routes.INTEGRATORS.name} />
      <MenuItem path={routes.REGISTER.path} text={routes.REGISTER.name} />
      <MenuItem path={routes.METRICS.path} text={routes.METRICS.name} />
    </menu>
  )
}
