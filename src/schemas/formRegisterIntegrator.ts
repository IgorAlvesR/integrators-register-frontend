import { CompanySize } from '@/useCases/Integrators'
import { validateCpfCnpj } from '@/utils/validation'
import { z } from 'zod'

const companySize: CompanySize[] = ['Pequena', 'Media', 'Grande']

export const formSchemaRegisterIntegrator = z.object({
  cpfCnpj: z
    .string()
    .min(1, {
      message: 'Campo obrigatório!',
    })
    .refine((cpfCnpj) => validateCpfCnpj(cpfCnpj), {
      message: 'CPF/CNPJ inválido!',
    }),
  integratorName: z.string().min(1, { message: 'Campo obrigatório!' }),
  ownerName: z.string().min(1, { message: 'Campo obrigatório!' }),
  city: z.string().min(1, { message: 'Campo obrigatório!' }),
  state: z.string().min(1, { message: 'Campo obrigatório!' }),
  panelBrand: z
    .array(z.string())
    .refine((value) => value.length >= 1, { message: 'Selecione uma marca.' }),
  companySize: z
    .string()
    .refine((value) => companySize.includes(value as CompanySize)),
})
