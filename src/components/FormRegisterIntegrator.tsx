'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { formSchemaRegisterIntegrator } from '@/schemas/formRegisterIntegrator'
import { IntegratorType } from '@/useCases/Integrators'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { BookCheck, CookingPot } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FieldCpfCnpj } from './FieldCpfCnpj'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useEffect } from 'react'
import { FieldState } from './FieldState'

const panelBrands: Array<Record<string, string>> = [
  {
    id: 'jinko-solar',
    value: 'Jinko Solar',
  },
  {
    id: 'trina-solar',
    value: 'Trina Solar',
  },
  { id: 'canadian-solar', value: 'Canadian Solar' },
  { id: 'ja-solar', value: 'Ja Solar' },
  { id: 'hanwha-qcells', value: 'Hanwha Q-Cells' },
  { id: 'gcl-si', value: 'GCL-Si' },
]

type FormRegisterIntegratorProps = {
  onSubmit: (data: IntegratorType) => void
  isLoading?: boolean
}

const Icon = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
  }
  return <BookCheck className="mr-2 h-4 w-4" />
}

export function FormRegisterIntegrator({
  isLoading,
  onSubmit,
}: FormRegisterIntegratorProps) {
  const form = useForm<z.infer<typeof formSchemaRegisterIntegrator>>({
    resolver: zodResolver(formSchemaRegisterIntegrator),
    defaultValues: {
      cpfCnpj: '',
      integratorName: '',
      ownerName: '',
      city: '',
      state: '',
      panelBrand: [],
      companySize: 'Pequena',
    },
  })

  useEffect(() => {
    if (!isLoading) {
      form.reset()
    }
  }, [isLoading, form])

  return (
    <Form {...form}>
      <form
        id="form-integrator"
        onSubmit={form.handleSubmit((data) => onSubmit(data as IntegratorType))}
        className="space-y-6"
      >
        <section className="space-y-4">
          <FormField
            control={form.control}
            name="cpfCnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF/CNPJ</FormLabel>
                <FormControl>
                  <FieldCpfCnpj {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <FormField
              control={form.control}
              name="integratorName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nome do integrador</FormLabel>
                  <FormControl>
                    <Input placeholder="José da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nome do proprietário</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <FieldState value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Tubarão" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panelBrand"
            render={() => (
              <FormItem className="border rounded-md p-3">
                <FormLabel>Marcas de panéis</FormLabel>
                <div className="flex items-center flex-wrap gap-6">
                  {panelBrands.map((panelBrand) => (
                    <FormField
                      key={panelBrand.id}
                      control={form.control}
                      name="panelBrand"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={panelBrand.id}
                            className="space-y-0 flex items-center gap-1"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(panelBrand.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        panelBrand.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== panelBrand.id,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {panelBrand.value}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Porte da empresa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o porte da empresa..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pequena">Pequena</SelectItem>
                    <SelectItem value="Media">Média</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Button form="form-integrator" type="submit">
          <Icon isLoading={!!isLoading} />
          Registrar
        </Button>
      </form>
    </Form>
  )
}
