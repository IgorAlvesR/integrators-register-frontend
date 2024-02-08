import { IntegratorType } from '@/useCases/Integrators'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { PencilLine, Trash } from 'lucide-react'
import { Badge } from './ui/badge'

type CardIntegratorProps = {
  integrator: IntegratorType
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}

export function CardIntegrator({
  integrator,
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
              <span
                onClick={() => onRemove(integrator.id)}
                className="rounded-full flex items-center hover:bg-primary-foreground transition-all"
              >
                <Trash className="w-5 h-5 text-red-500 cursor-pointer" />
              </span>
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
