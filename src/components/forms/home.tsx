'use client'
import { apiDistrict } from '@/lib/api-district'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import * as Select from '@radix-ui/react-select'

interface resState {
  ufData: {
    id: number
    sigla: string
    nome: string
  }[]
}

interface resCountsType {
  id: number
  nome: string
}

export function FormHome({ ufData }: resState) {
  const [countys, setCountys] = useState([] as resCountsType[])
  const [uf, setUf] = useState(ufData[0].sigla)
  const [county, setCounty] = useState<string | undefined>(undefined)

  const requestApiState = useCallback(async () => {
    const { data }: { data: resCountsType[] } = await apiDistrict.get(
      `/localidades/estados/${uf}/municipios`,
      {
        params: {
          orderBy: 'nome',
        },
      },
    )

    setCountys(data)
  }, [uf])

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

  return (
    <form className="flex items-center justify-between">
      <span className="text-base font-normal leading-8 text-white">
        Busque um amigo:
      </span>
      <div className="flex gap-4">
        <Select.Root value={uf} name="state" onValueChange={handleStateChange}>
          <Select.Trigger className="text-4 inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-transparent bg-white bg-opacity-0 px-3 py-5 font-bold leading-none text-white outline-none">
            <Select.Value className="text-xl font-bold leading-relaxed text-white">
              {uf || 'UF'}
            </Select.Value>
            <Select.Icon className="text-white">
              <ChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="item-aligned"
              className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
            >
              <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {ufData.map((item) => {
                  return (
                    <Select.Item
                      key={item.id}
                      value={item.sigla}
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>{item.sigla}</Select.ItemText>
                    </Select.Item>
                  )
                })}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                <ChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <Select.Root
          name="county"
          value={county}
          onValueChange={handleCountyChange}
        >
          <Select.Trigger className="text-4 inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-transparent bg-white bg-opacity-0 px-3 py-5 font-bold leading-none text-white outline-none">
            <Select.Value className="text-xl font-bold leading-relaxed text-white">
              {county || 'Escolha uma cidade'}
            </Select.Value>
            <Select.Icon className="text-white">
              <ChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="item-aligned"
              className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
            >
              <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {countys &&
                  countys.map((item) => {
                    return (
                      <Select.Item
                        key={item.id}
                        value={item.nome}
                        className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                      >
                        <Select.ItemText>{item.nome}</Select.ItemText>
                      </Select.Item>
                    )
                  })}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                <ChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <button type="submit" className="rounded-[20px] bg-yellow p-5">
        <Search className="text-black" strokeWidth={3} size={26} />
      </button>
    </form>
  )
}
