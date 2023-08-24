'use client'
import Image from 'next/image'
import icoLogo from '../../assets/ico-logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputSelectForm } from './components/SelectInput'

const formShema = z.object({
  uf: z.string().length(2),
  county: z.string(),
  energy_level: z.coerce.number().min(1).max(5).optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
  independence: z.enum(['low', 'medium', 'high']).optional(),
})

export type FormShemaType = z.infer<typeof formShema>

export default function Explore() {
  const { control, handleSubmit } = useForm<FormShemaType>({
    resolver: zodResolver(formShema),
  })

  function submitForm(data: FormShemaType) {
    console.log(data)
  }

  return (
    <div className="flex">
      <form onSubmit={handleSubmit(submitForm)}>
        <header>
          <Image src={icoLogo} alt="" />
          <div></div>
        </header>
        <div>
          <h3>Filtros</h3>
          <div>
            <label htmlFor="age">Idade</label>
            <InputSelectForm
              formProps={{ control, name: 'age' }}
              placeholder="Escolha"
              options={[
                {
                  text: 'Filhote',
                  value: 'cub',
                },
                {
                  text: 'Adolescente',
                  value: 'adolescent',
                },
                {
                  text: 'Velho',
                  value: 'elderly',
                },
              ]}
            />
          </div>
          <div>
            <label htmlFor="energy_level">Nivel de Energia</label>
            <InputSelectForm
              formProps={{ control, name: 'energy_level' }}
              placeholder="Escolha"
              options={[
                {
                  text: '01',
                  value: '1',
                },
                {
                  text: '02',
                  value: '2',
                },
                {
                  text: '03',
                  value: '3',
                },
                {
                  text: '04',
                  value: '4',
                },
                {
                  text: '05',
                  value: '5',
                },
              ]}
            />
          </div>
          <div>
            <label htmlFor="size">Porte do animal</label>
            <InputSelectForm
              formProps={{ control, name: 'size' }}
              placeholder="Escolha"
              options={[
                {
                  text: 'Pequenino',
                  value: 'small',
                },
                {
                  text: 'Médio',
                  value: 'medium',
                },
                {
                  text: 'Grade',
                  value: 'big',
                },
              ]}
            />
          </div>
          <div>
            <label htmlFor="independence">Nível de dependência</label>
            <InputSelectForm
              formProps={{ control, name: 'independence' }}
              placeholder="Escolha"
              options={[
                {
                  text: 'Baixo',
                  value: 'low',
                },
                {
                  text: 'Médio',
                  value: 'medium',
                },
                {
                  text: 'Alto',
                  value: 'high',
                },
              ]}
            />
          </div>
        </div>
      </form>
      <main className="flex flex-1"></main>
    </div>
  )
}
