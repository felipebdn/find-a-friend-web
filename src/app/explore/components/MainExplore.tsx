'use client'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { api } from '@/lib/api-server'
import icoLogo from '@/assets/ico-logo.svg'
import petImage from '@/assets/pet.png'
import Link from 'next/link'

interface resApiType {
  id: string
  collar: string
  name: string
  energy_level: number
  size: string
  age: string
  description: string
  requirements: string
  independence: string
  anvironment: string
  org_id: string
}

export function MainExplore() {
  const searchParams = useSearchParams()

  const [pets, setPets] = useState([] as resApiType[])

  const getPets = useCallback(async () => {
    const params: Record<string, string> = {}

    for (const [key, value] of searchParams.entries()) {
      if (value !== 'undefined') {
        params[key] = value
      }
    }

    if (params.city && params.state) {
      const res = await api.get('/pets', {
        params,
      })
      setPets(res.data.pets)
    }
  }, [searchParams])

  useEffect(() => {
    getPets()
  }, [getPets])

  return (
    <main className="flex flex-1 flex-col gap-14 overflow-y-scroll bg-background px-10 py-20">
      <div>
        <p className="text-xl font-normal text-blue">
          Encontre{' '}
          <strong className="font-extrabold">
            {pets.length} {pets.length > 1 ? 'amigos' : 'amigo'}
          </strong>{' '}
          na sua cidade
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-4">
        {pets &&
          pets.map((pet, i) => {
            return (
              <Link
                href={`/pet/${pet.id}`}
                key={pet.id}
                className="group flex w-fit flex-col items-center rounded-[27px] bg-white p-1 transition-colors hover:bg-blue"
              >
                <div className="relative h-32 w-full min-w-[274px] overflow-hidden rounded-3xl">
                  <Image
                    src={petImage}
                    alt=""
                    className="absolute top-1/2 w-full -translate-y-1/2"
                  />
                </div>
                <div className="relative -mt-6 flex flex-col items-center">
                  <div
                    className="flex w-fit rounded-[10px] border-[3px] border-white p-4 group-hover:border-blue data-[color=false]:bg-yellow data-[color=true]:bg-red"
                    data-color={i % 2 === 0}
                  >
                    <Image src={icoLogo} alt="" className="h-4 w-4" />
                  </div>
                  <h3 className="mb-2 pt-1 text-lg font-bold leading-5 text-blue group-hover:text-white">
                    {pet.name}
                  </h3>
                </div>
              </Link>
            )
          })}
      </div>
    </main>
  )
}
