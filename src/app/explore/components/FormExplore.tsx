'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputSelectForm } from './SelectInput'
import icoLogo from '../../../assets/ico-logo.svg'
import Image from 'next/image'
import { useStateHook } from '@/lib/use-state-hook'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface formExploreProps {
  ufData: {
    id: number
    sigla: string
    nome: string
  }[]
}

const formShema = z.object({
  uf: z.string().length(2),
  county: z.string(),
  energy_level: z.coerce.number().min(1).max(5).optional(),
  size: z.enum(['small', 'medium', 'big']).optional(),
  age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
  independence: z.enum(['low', 'medium', 'high']).optional(),
})

export type FormShemaType = z.infer<typeof formShema>

export function FormExplore({ ufData }: formExploreProps) {
  const { countys, requestApiState, setCounty, setUf, uf } = useStateHook()

  const route = useRouter()

  const { control, handleSubmit, setValue, resetField } =
    useForm<FormShemaType>({
      resolver: zodResolver(formShema),
    })

  useEffect(() => {
    requestApiState()
  }, [requestApiState, uf])

  function handleStateChange(handleUf: string) {
    setUf(handleUf)
    setCounty(undefined)
  }
  function handleCountyChange(handleCounty: string) {
    setCounty(handleCounty)
  }
  const searchParams = useSearchParams()
  useEffect(() => {
    const state = searchParams.get('state')
    const city = searchParams.get('city')

    state && setUf(state)
    state && setValue('uf', state)
    city && setCounty(city)
    city && setValue('county', city)
  }, [searchParams, setUf, setCounty, setValue])

  function submitForm(data: FormShemaType) {
    route.push(
      `/explore?state=${data.uf}&city=${data.county}&energy_level=${data.energy_level}&size=${data.size}&age=${data.age}&independence=${data.independence}`,
    )
  }

  function handleResetForm() {
    route.refresh()
    resetField('age')
    resetField('energy_level')
    resetField('independence')
    resetField('size')
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="scrollbar-none h-full overflow-y-scroll bg-red"
    >
      <header className="flex w-full flex-col gap-6 bg-red-dark px-14 py-7">
        <Image src={icoLogo} alt="" />
        <div className="flex gap-2">
          <InputSelectForm
            type="location"
            formProps={{ control, name: 'uf' }}
            placeholder="UF"
            handleStateChange={handleStateChange}
            options={ufData.map((item) => {
              return {
                text: item.sigla,
                value: item.sigla,
              }
            })}
          />
          <InputSelectForm
            type="location"
            formProps={{ control, name: 'county' }}
            placeholder="Cidade"
            handleCountyChange={handleCountyChange}
            options={countys.map((item) => {
              return {
                text: item.nome,
                value: item.nome,
              }
            })}
          />
          <button type="submit" className="rounded-[20px] bg-yellow p-4">
            <Search className="text-blue" strokeWidth={3} size={26} />
          </button>
        </div>
      </header>
      <div className="flex flex-col justify-center gap-7 px-14 py-7">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold leading-relaxed text-white">
            Filtros
          </h3>
          <Link
            href="/explore"
            onClick={handleResetForm}
            className="font-medium leading-tight text-white transition-colors hover:text-yellow"
          >
            Limpar
          </Link>
        </div>
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
  )
}
