'use client'
import Image from 'next/image'
import logo from '../assets/logo.svg'
import hero from '../assets/hero.png'
import { apiDistrict } from '@/lib/api-district'
import { useCallback, useEffect, useState } from 'react'

interface resState {
  id: number
  sigla: string
  nome: string
}

export default function Home() {
  const [states, setStates] = useState([] as resState[])

  const requestApiState = useCallback(async () => {
    const { data }: { data: resState[] } = await apiDistrict.get(
      '/localidades/estados',
      {
        params: {
          orderBy: 'nome',
        },
      },
    )
    setStates(data)
  }, [])

  useEffect(() => {
    requestApiState()
    console.log('teste')
  }, [requestApiState])

  return (
    <div className="mx-auto flex h-screen max-w-7xl justify-between gap-4 py-24">
      <div className="flex flex-col justify-between">
        <Image src={logo} alt="" />
        <h1 className="text-white text-7xl font-extrabold leading-[90%] tracking-[-1.44px]">
          Leve a felifidade para o seu lar
        </h1>
        <h6 className="text-white text-2xl font-semibold leading-[34px]">
          Encontre o animal de estimação ideal para seu estilo de vida!
        </h6>
      </div>
      <div>
        <Image src={hero} alt="" />
        <form>
          <select name="states" id="states">
            {states.map((item) => {
              return (
                <option key={item.id} value={item.nome}>
                  {item.sigla}
                </option>
              )
            })}
          </select>
        </form>
      </div>
    </div>
  )
}
