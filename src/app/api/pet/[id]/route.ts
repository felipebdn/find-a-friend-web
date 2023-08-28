import { api } from '@/lib/api-server'
import { NextResponse } from 'next/server'

export interface getPetTypes {
  pet: {
    id: string
    collar: string
    name: string
    energy_level: number
    size: 'small' | 'medium' | 'big'
    age: 'cub' | 'adolescent' | 'elderly'
    description: string
    requirements: string
    independence: 'low' | 'medium' | 'high'
    anvironment: string
    org_id: string
  }
  images: {
    id: string
    url: string
    pet_id: string
  }[]
  org: {
    id: string
    name: string
    organization: string
    road: string
    number: string
    sector: string
    city: string
    state: string
    cep: number
    whatsapp: string
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  if (req.method !== 'GET') {
    return NextResponse.error()
  }

  const { data }: { data: getPetTypes } = await api.get(`/pet/${params.id}`)

  console.log(data)

  return NextResponse.json({
    ...data,
  })
}
