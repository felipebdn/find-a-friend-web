import { api } from '@/lib/api-server'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

interface getPetTypes {
  pet: {
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
  images: {
    id: string
    url: string
    pet_id: string
  }[]
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(404)
  }

  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(req.query)

  const { data }: { data: getPetTypes } = await api.get(`/pet/${id}`)
  console.log(data)

  return res.status(200).send({
    text: 'foi',
  })
}
