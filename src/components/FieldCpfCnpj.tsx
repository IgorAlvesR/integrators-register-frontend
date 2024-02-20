import { cn } from '@/lib/utils'
import { ChangeEvent, LegacyRef, forwardRef } from 'react'
import InputMask from 'react-input-mask'

type FieldCpfCnpjProps = {
  value: string
  onChange: (...event: ChangeEvent<HTMLInputElement>[]) => void
}

function selectMask(cpfCnpj: string) {
  // adiciona o digito 9 extra para cpf para que a máscara mude para máscara de cnpj
  return cpfCnpj.length <= 14 ? '999.999.999-999' : '99.999.999/9999-99'
}

export const FieldCpfCnpj = forwardRef(function FieldCpfCnpj(
  { onChange, value }: FieldCpfCnpjProps,
  ref: LegacyRef<InputMask> | undefined,
) {
  return (
    <InputMask
      data-testid="field-cpfCnpj"
      ref={ref}
      onChange={onChange}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      )}
      value={value}
      mask={selectMask(value)}
      maskPlaceholder=""
      placeholder="123.456.789-01 ou 00.123.456/0001-10"
    />
  )
})
