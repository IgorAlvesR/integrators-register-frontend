'use client'
import { BarChartIntegrator } from '@/components/BarChartIntegrator'
import { EmptyPage } from '@/components/EmptyPage'
import { SkeletonBarChart } from '@/components/SkeletonBarChart'
import { queries } from '@/queries'
import { Api } from '@/services/Api'
import { Integrator, StateInfo } from '@/useCases/Integrators'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const serviceApi = new Api()
const integratorUseCase = new Integrator(serviceApi)

export default function Page() {
  const { status, data } = useQuery<StateInfo[]>(
    queries.STATES_INFO_QUERY,
    async () => {
      const statesInfo = await integratorUseCase.getStatesInfo()
      return statesInfo
    },
    {
      onError(err) {
        const { message } = err as Error
        toast.error(message)
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  )

  if (status === 'loading') {
    return <SkeletonBarChart />
  }

  if (!data?.length) {
    return <EmptyPage message="Não há informações sobre integradores!" />
  }

  const dataChart = data.map((stateInfo) => ({
    text: stateInfo.state,
    value: stateInfo.quantity,
  }))

  return <BarChartIntegrator data={dataChart} title="Integradores por estado" />
}
