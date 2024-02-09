'use client'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from './ui/dialog'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Trash, AlertCircle, CookingPot } from 'lucide-react'
import { Button } from './ui/button'
import { IntegratorType } from '@/useCases/Integrators'
import { useEffect, useState } from 'react'

type RemoveIntegratorProps = {
  integrator: IntegratorType
  isLoading?: boolean
  onRemove: (id: string) => void
}

export function RemoveIntegrator({
  integrator,
  isLoading,
  onRemove,
}: RemoveIntegratorProps) {
  const [open, setOpen] = useState<boolean>()

  useEffect(() => {
    if (!isLoading) {
      setOpen(false)
    }
  }, [isLoading])

  const Icon = () => {
    if (isLoading) {
      return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
    }
    return <CookingPot className="mr-2 h-4 w-4" />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="rounded-full flex items-center hover:bg-primary-foreground transition-all">
          <Trash
            data-testid="btn-remove-integrator"
            className="w-5 h-5 text-red-500 cursor-pointer"
          />
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between gap-2">
              <span>Remover</span>
              <AlertCircle className="w-6 h-6 mr-3" />
            </div>
          </DialogTitle>

          <DialogDescription>
            Confirma remoção do integrador {integrator.ownerName} ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button disabled={isLoading} onClick={() => onRemove(integrator.id)}>
            <Icon />
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
