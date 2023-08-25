'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/api-server'

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

  // /explore?state=${data.uf}&county=${data.county}&energy_level=${data.energy_level}&size=${data.size}&age=${data.age}&independence=${data.independence}

  console.log(searchParams.getAll)

  const [pets, setPets] = useState([] as resApiType[])

  const getPets = useCallback(async () => {
    const res = await api.get('/pets', {
      params: {
        state: 'PA',
        city: 'Conceição do Araguaia',
      },
    })

    setPets(res.data.pets)
  }, [])

  useEffect(() => {
    getPets()
  }, [getPets])

  return (
    <main className="grid flex-1 bg-white">
      {pets &&
        pets.map((pet) => {
          return (
            <div key={pet.id}>
              <h3>{pet.name}</h3>
            </div>
          )
        })}
    </main>
  )
}
