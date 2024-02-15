import { cpf, cnpj } from 'cpf-cnpj-validator'

export function validateCpfCnpj(cpfCnpj: string) {
  const cpfCnpjFormatted = cpfCnpj.replace(/\D/g, '')
  const isCpf = !!(cpfCnpjFormatted?.length <= 11)
  if (isCpf) {
    return cpf.isValid(cpfCnpj)
  }
  return cnpj.isValid(cpfCnpj)
}
