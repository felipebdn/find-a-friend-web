import { api } from '@/lib/api-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const params: Record<string, string> = {}
  const { searchParams } = new URL(req.url)

  for (const [key, value] of searchParams.entries()) {
    params[key] = value
  }

  const {
    data: { pets },
  } = await api.get('/pets', {
    params,
  })

  return NextResponse.json({ pets })
}
