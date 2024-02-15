import { FieldCpfCnpj } from '@/components/FieldCpfCnpj'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vitest } from 'vitest'

const spyOnChange = vitest.fn()
render(<FieldCpfCnpj onChange={spyOnChange} value="" />)

test('deve renderizar o campo de CPF ou CNPJ', () => {
  expect(
    screen.getByPlaceholderText('123.456.789-01 ou 00.123.456/0001-10'),
  ).toBeDefined()
})

test('deve verificar se a função de onChange foi chamada', () => {
  const field = screen.getByTestId('field-cpfCnpj')
  fireEvent.change(field, { target: { value: '10196083907' } })
  expect(spyOnChange).toHaveBeenCalled()
})
