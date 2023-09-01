import { api } from '@/lib/api-server'
import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const formRegisterSchema = z.object({
    name: z.string(),
    organization: z.string(),
    email: z.string().email(),
    state: z.string(),
    city: z.string(),
    cep: z.coerce.string(),
    number: z.string(),
    road: z.string(),
    sector: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  })

  const dataJson = await req.json()

  const data = formRegisterSchema.parse(dataJson.data)

  try {
    const res = await api.post('/orgs', {
      ...data,
    })
    return NextResponse.json(
      {},
      {
        status: res.status,
      },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return NextResponse.json(
          {},
          {
            status: 409,
          },
        )
      }
    }
  }
}
