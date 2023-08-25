'use client'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
