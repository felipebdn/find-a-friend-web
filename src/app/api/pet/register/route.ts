import { api } from '@/lib/api-server'
import { petBodySchema } from '@/app/pet/register/components/form'
import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const dataJson = await req.json()

  const data = petBodySchema.parse(dataJson)

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
