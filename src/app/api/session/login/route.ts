import { api } from '@/lib/api-server'
import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { data } = await req.json()
  try {
    const res = await api.post('/sessions', {
      ...data,
    })
    const { token }: { token: string } = res.data

    return NextResponse.json(
      {
        token,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {},
        {
          status: 400,
        },
      )
    }
    throw error
  }
}
