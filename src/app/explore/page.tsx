'use client'
import Image from 'next/image'
import icoLogo from '../../assets/ico-logo.svg'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
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
        <header className="w-full bg-red-dark px-14 py-7">
          <Image src={icoLogo} alt="" />
          <div className="flex gap-2">
            <InputSelectForm
              type="location"
              formProps={{ control, name: 'uf' }}
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
            <InputSelectForm
              type="location"
              formProps={{ control, name: 'county' }}
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
            <button type="submit" className="rounded-[20px] bg-yellow p-4">
              <Search className="text-blue" strokeWidth={3} size={26} />
            </button>
          </div>
        </header>
        <div className="flex flex-col justify-center gap-7 px-14 py-7">
          <h3 className="text-xl font-bold leading-relaxed text-white">
            Filtros
          </h3>
          <div className="flex flex-col gap-3">
            <label htmlFor="age" className="text-xs font-medium text-white">
              Idade
            </label>
            <InputSelectForm
              type="filter"
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
          <div className="flex flex-col gap-3">
            <label
              htmlFor="energy_level"
              className="text-xs font-medium text-white"
            >
              Nivel de Energia
            </label>
            <InputSelectForm
              type="filter"
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
          <div className="flex flex-col gap-3">
            <label htmlFor="size" className="text-xs font-medium text-white">
              Porte do animal
            </label>
            <InputSelectForm
              type="filter"
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
          <div className="flex flex-col gap-3">
            <label
              htmlFor="independence"
              className="text-xs font-medium text-white"
            >
              Nível de dependência
            </label>
            <InputSelectForm
              type="filter"
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
