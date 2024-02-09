'use client'
import { IntegratorType } from '@/useCases/Integrators'
import { PencilLine } from 'lucide-react'
import { RemoveIntegrator } from './RemoveIntegrator'
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
  isRemoving?: boolean
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}

export function CardIntegrator({
  integrator,
  isRemoving,
  onEdit,
  onRemove,
}: CardIntegratorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <section className="flex justify-between">
            {integrator.integratorName}
            <div className="flex flex-col items-center md:flex-row gap-3">
              <span
                onClick={() => onEdit(integrator.id)}
                className="rounded-full flex items-center hover:bg-primary-foreground transition-all"
              >
                <PencilLine className="w-5 h-5 cursor-pointer" />
              </span>

              <RemoveIntegrator
                integrator={integrator}
                onRemove={onRemove}
                isLoading={isRemoving}
              />
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
