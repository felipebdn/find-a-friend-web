'use client'
import { apiDistrict } from '@/lib/api-district'
import { Search, ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import * as Select from '@radix-ui/react-select'

interface resState {
  data: {
    id: number
    sigla: string
    nome: string
  }[]
}

interface resCountsType {
  id: number
  nome: string
}

export function FormHome({ data }: resState) {
  const [uf, setUf] = useState(data[0].sigla)

  const [countys, setCountys] = useState([] as resCountsType[])

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
  }

  return (
    <form className="flex items-center justify-between">
      <span className="text-base font-normal leading-8 text-white">
        Busque um amigo:
      </span>
      <div>
        <Select.Root value={uf} name="states" onValueChange={handleStateChange}>
          <Select.Trigger className="bg-transparent inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-white bg-opacity-0 px-3 py-5 text-[13px] leading-none outline-none">
            <Select.Value placeholder="teste" />
            <Select.Icon>
              <ChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content position="popper" align="center">
              <Select.Viewport>
                {data.map((item) => {
                  return (
                    <Select.Item key={item.id} value={item.sigla}>
                      <Select.ItemText>{item.sigla}</Select.ItemText>
                    </Select.Item>
                  )
                })}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        {/* <select
          name="states"
          id="states"
          value={uf}
          onChange={handleStateChange}
          className="bg-transparent w-16 rounded-[20px] bg-opacity-0 px-3 py-5"
        >
          {data.map((item) => {
            return (
              <option key={item.id} value={item.sigla}>
                {item.sigla}
              </option>
            )
          })}
        </select> */}
        <select name="countys" id="countys">
          {countys.map((item) => {
            return (
              <option key={item.id} value={item.nome}>
                {item.nome}
              </option>
            )
          })}
        </select>
      </div>
      <button type="submit" className="bg-yellow rounded-[20px] p-5">
        <Search className="text-black" strokeWidth={3} size={26} />
      </button>
    </form>
  )
}
