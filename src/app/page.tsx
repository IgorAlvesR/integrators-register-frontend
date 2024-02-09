'use client'
import { CardIntegrator } from '@/components/CardIntegrator'
import { SkeletonListIntegrator } from '@/components/SkeletonListIntegrator'
import { Api } from '@/services/Api'
import { Integrator, IntegratorType } from '@/useCases/Integrators'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'
import { queryClient } from '@/lib/queryClient'

const serviceApi = new Api()
const integratorUseCase = new Integrator(serviceApi)

export default function Integrators() {
  const { isLoading: isLoadingIntegrators, data } = useQuery<IntegratorType[]>(
    'integratorsQuery',
    async () => {
      const integrators = await integratorUseCase.getIntegrators()
      return integrators
    },
    {
      onError(err) {
        const { message } = err as Error
        toast.error(message)
      },
    },
  )

  const { mutate: removeIntegrator, status: statusRemove } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await integratorUseCase.removeIntegrator(id)
        toast.success('Integrador removido com sucesso!')
      } catch (error) {
        const { message } = error as Error
        toast.error(message)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['integratorsQuery'] })
    },
  })

  const isEmptyList = !data?.length

  if (isLoadingIntegrators) {
    return <SkeletonListIntegrator />
  }

  if (isEmptyList) {
    return (
      <section>
        <p data-testid="empty-list" className="text-md font-medium opacity-85">
          Sem informações de integradores.
        </p>
      </section>
    )
  }

  return (
    <section
      data-testid="list-integrator"
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      {data.map((integrator) => {
        return (
          <CardIntegrator
            isRemoving={statusRemove === 'loading'}
            onEdit={() => ({})}
            onRemove={removeIntegrator}
            key={integrator.id}
            integrator={integrator}
          />
        )
      })}
    </section>
  )
}
