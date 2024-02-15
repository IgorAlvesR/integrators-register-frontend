import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'
import { useState, useEffect } from 'react'
import { FormControl } from './ui/form'

type Region = {
  id: number
  sigla: string
  nome: string
}

type State = {
  id: number
  sigla: string
  nome: string
  regiao: Region
}

type FieldStateProps = {
  value?: string
  onChange: (value: string) => void
}

export function FieldState({ value, onChange }: FieldStateProps) {
  const [states, setStates] = useState<State[]>([])

  useEffect(() => {
    fetch('/states.json')
      .then((response) => response.json())
      .then((jsonData) => setStates(jsonData))
      .catch(() => {
        setStates([
          {
            id: 42,
            sigla: 'SC',
            nome: 'Santa Catarina',
            regiao: {
              id: 4,
              sigla: 'S',
              nome: 'Sul',
            },
          },
        ])
      })
  }, [])

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Seleciona um estado..." />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {states.map((state) => (
          <SelectItem key={state.id} value={state.sigla}>
            {state.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
