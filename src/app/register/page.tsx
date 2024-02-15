'use client'
import { FormRegisterIntegrator } from '@/components/FormRegisterIntegrator'
import { queryClient } from '@/lib/queryClient'
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
      queryClient.invalidateQueries({ queryKey: ['integratorsQuery'] })
    },
  })
  return (
    <main className="border rounded-md p-6">
      <FormRegisterIntegrator
        isLoading={statusRegister === 'loading'}
        onSubmit={registerIntegrator}
      />
    </main>
  )
}
