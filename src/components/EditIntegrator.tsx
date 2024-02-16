'use client'
import { IntegratorType } from '@/useCases/Integrators'
import { PencilLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormIntegrator } from './FormIntegrator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

type EditIntegratorProps = {
  integrator: IntegratorType
  isLoading?: boolean
  onEdit: (data: IntegratorType) => void
}

export function EditIntegrator({
  integrator,
  isLoading,
  onEdit,
}: EditIntegratorProps) {
  const [open, setOpen] = useState<boolean>()

  useEffect(() => {
    if (!isLoading) {
      setOpen(false)
    }
  }, [isLoading])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="rounded-full flex items-center hover:bg-primary-foreground transition-all">
          <PencilLine className="w-5 h-5 cursor-pointer" />
        </span>
      </DialogTrigger>

      <DialogContent className="lg:w-auto lg:h-auto max-w-screen h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Atualizar dados do Integrador</DialogTitle>
        </DialogHeader>

        <FormIntegrator
          isLoading={isLoading}
          integrator={integrator}
          onSubmit={onEdit}
        />
      </DialogContent>
    </Dialog>
  )
}
