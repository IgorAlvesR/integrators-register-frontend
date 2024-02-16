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
import { BookCheck } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FieldCpfCnpj } from './FieldCpfCnpj'
import { FieldState } from './FieldState'
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

type FormIntegratorProps = {
  integrator?: IntegratorType
  onSubmit: (data: IntegratorType) => void
  isLoading?: boolean
}

const Icon = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
  }
  return <BookCheck className="mr-2 h-4 w-4" />
}

export function FormIntegrator({
  integrator,
  isLoading,
  onSubmit,
}: FormIntegratorProps) {
  const form = useForm<z.infer<typeof formSchemaRegisterIntegrator>>({
    resolver: zodResolver(formSchemaRegisterIntegrator),
    defaultValues: {
      cpfCnpj: integrator?.cpfCnpj || '',
      integratorName: integrator?.integratorName || '',
      ownerName: integrator?.ownerName || '',
      city: integrator?.city || '',
      state: integrator?.state || '',
      panelBrand: integrator?.panelBrand.length ? integrator.panelBrand : [],
      companySize: integrator?.companySize || 'Pequena',
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
        onSubmit={form.handleSubmit((data) =>
          onSubmit({ ...data, id: integrator?.id } as IntegratorType),
        )}
        className="space-y-6"
      >
        <section className="space-y-3">
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

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1">
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
                <FormItem className="flex-1">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Tubarão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="panelBrand"
            render={() => (
              <FormItem className=" border rounded-md p-3">
                <FormLabel>Marcas de panéis</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                            <FormLabel className="text-sm font-normal cursor-pointer">
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger value={field.value}>
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
          Salvar
        </Button>
      </form>
    </Form>
  )
}
