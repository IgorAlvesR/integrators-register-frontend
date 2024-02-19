'use client'
import { BarChartIntegrator } from '@/components/BarChartIntegrator'
import { EmptyPage } from '@/components/EmptyPage'
import { SkeletonBarChart } from '@/components/SkeletonBarChart'
import { queries } from '@/queries'
import { Api } from '@/services/Api'
import { CompanySizeInfo, Integrator, StateInfo } from '@/useCases/Integrators'
import { useQuery } from 'react-query'
import { toast } from 'sonner'

const serviceApi = new Api()
const integratorUseCase = new Integrator(serviceApi)

export default function Page() {
  const { status: statusStateQuery, data: dataStateQuery = [] } = useQuery<
    StateInfo[]
  >(
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

  const { status: statusCompanySizeQuery, data: dataCompanySizeQuery = [] } =
    useQuery<CompanySizeInfo[]>(
      queries.COMPANY_SIZE_INFO_QUERY,
      async () => {
        const companySizeInfo = await integratorUseCase.getCompanySizeInfo()
        return companySizeInfo
      },
      {
        onError(err) {
          const { message } = err as Error
          toast.error(message)
        },
      },
    )

  if (!dataStateQuery?.length && !dataCompanySizeQuery) {
    return <EmptyPage message="Não há informações sobre integradores!" />
  }

  const dataChartByStates = dataStateQuery?.map((stateInfo) => ({
    text: stateInfo.state,
    value: stateInfo.quantity,
  }))

  const dataChartByCompanySize = dataCompanySizeQuery?.map((stateInfo) => ({
    text: stateInfo.size,
    value: stateInfo.quantity,
  }))

  return (
    <>
      <section className="flex flex-col gap-6">
        {statusStateQuery === 'loading' ? (
          <SkeletonBarChart />
        ) : (
          <BarChartIntegrator
            data={dataChartByStates}
            title="Integradores por estado"
          />
        )}

        {statusCompanySizeQuery === 'loading' ? (
          <SkeletonBarChart />
        ) : (
          <BarChartIntegrator
            data={dataChartByCompanySize}
            title="Integradores por porte da empresa"
          />
        )}
      </section>
    </>
  )
}
