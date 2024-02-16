'use client'
import { IntegratorType } from '@/useCases/Integrators'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

type CardIntegratorProps = {
  integrator: IntegratorType
  children: React.ReactNode
}

export function CardIntegrator({ integrator, children }: CardIntegratorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <section className="flex justify-between">
            {integrator.integratorName}
            <div className="flex flex-col items-center md:flex-row gap-3">
              {children}
            </div>
          </section>
        </CardTitle>
        <CardDescription>{integrator.ownerName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm opacity-90">
          {integrator.city}-{integrator.state}
        </p>
        <p></p>
      </CardContent>
      <CardFooter>
        <section className="flex items-center gap-2 flex-wrap">
          {integrator.panelBrand.map((panelBrand) => (
            <Badge variant="secondary" key={panelBrand}>
              {panelBrand}
            </Badge>
          ))}
        </section>
      </CardFooter>
    </Card>
  )
}
