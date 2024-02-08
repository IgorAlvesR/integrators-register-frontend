'use client'
import { SkeletonListIntegrator } from '@/components/SkeletonListIntegrator'
import { Api } from '@/services/Api'
import { Integrator, IntegratorType } from '@/useCases/Integrators'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const serviceApi = new Api()
const integrator = new Integrator(serviceApi)

export default function Integrators() {
  const { isLoading, data } = useQuery<IntegratorType[]>(
    'integratorsQuery',
    async () => {
      const integrators = await integrator.getIntegrators()
      return integrators
    },
    {
      onError(err) {
        const { message } = err as Error
        toast.error(message)
      },
    },
  )

  const isEmptyList = !data?.length

  if (isLoading) {
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
    <section data-testid="list-integrator">
      {data.map((integrator) => {
        return <h1 key={integrator.CPFOrCNPJ}>{integrator.ownerName}</h1>
      })}
    </section>
  )
}
