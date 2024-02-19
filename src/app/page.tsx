'use client'
import { CardIntegrator } from '@/components/CardIntegrator'
import { EditIntegrator } from '@/components/EditIntegrator'
import { EmptyPage } from '@/components/EmptyPage'
import { RemoveIntegrator } from '@/components/RemoveIntegrator'
import { SkeletonListIntegrator } from '@/components/SkeletonListIntegrator'
import { queryClient } from '@/lib/queryClient'
import { queries } from '@/queries'
import { Api } from '@/services/Api'
import { Integrator, IntegratorType } from '@/useCases/Integrators'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const serviceApi = new Api()
const integratorUseCase = new Integrator(serviceApi)

export default function Integrators() {
  const { isLoading: isLoadingIntegrators, data } = useQuery<IntegratorType[]>(
    queries.INTEGRATORS_QUERY,
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
      queryClient.invalidateQueries({ queryKey: [queries.INTEGRATORS_QUERY] })
    },
  })

  const { mutate: editIntegrator, status: statusEdit } = useMutation({
    mutationFn: async (data: IntegratorType) => {
      try {
        await integratorUseCase.editIntegrator(data)
        toast.success('Integrador salvo com sucesso!')
      } catch (error) {
        const { message } = error as Error
        toast.error(message)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [queries.INTEGRATORS_QUERY] })
    },
  })

  const isEmptyList = !data?.length

  if (isLoadingIntegrators) {
    return <SkeletonListIntegrator />
  }

  if (isEmptyList) {
    return <EmptyPage message="Sem informações de integradores." />
  }

  return (
    <section
      data-testid="list-integrator"
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      {data.map((integrator) => {
        return (
          <CardIntegrator key={integrator.id} integrator={integrator}>
            <EditIntegrator
              integrator={integrator}
              onEdit={editIntegrator}
              isLoading={statusEdit === 'loading'}
            />

            <RemoveIntegrator
              integrator={integrator}
              onRemove={removeIntegrator}
              isLoading={statusRemove === 'loading'}
            />
          </CardIntegrator>
        )
      })}
    </section>
  )
}
