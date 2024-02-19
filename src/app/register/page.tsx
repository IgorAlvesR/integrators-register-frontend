'use client'
import { FormIntegrator } from '@/components/FormIntegrator'
import { queryClient } from '@/lib/queryClient'
import { queries } from '@/queries'
import { Api } from '@/services/Api'
import { Integrator, IntegratorType } from '@/useCases/Integrators'
import { useMutation } from 'react-query'
import { toast } from 'sonner'

const serviceApi = new Api()
const integratorUseCase = new Integrator(serviceApi)

export default function Register() {
  const { mutate: registerIntegrator, status: statusRegister } = useMutation({
    mutationFn: async (data: IntegratorType) => {
      try {
        await integratorUseCase.registerIntegrator(data)
        toast.success('Integrador registrado com sucesso!')
      } catch (error) {
        const { message } = error as Error
        toast.error(message)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queries.COMPANY_SIZE_INFO_QUERY, queries.INTEGRATORS_QUERY],
      })
    },
  })
  return (
    <main className="border rounded-md p-6">
      <FormIntegrator
        isLoading={statusRegister === 'loading'}
        onSubmit={registerIntegrator}
      />
    </main>
  )
}
