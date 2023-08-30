import { api } from '@/lib/api-server'
import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { data } = await req.json()
  try {
    const res = await api.post('/sessions', {
      ...data,
    })

    // const { token }: { token: string } = res.data

    // const redirectUrl = new URL('/', req.url)

    // const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // 30 days

    // NextResponse.redirect(redirectUrl, {
    //   headers: {
    //     'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    //   },
    // })
    return NextResponse.json(
      {
        token: res.data.token,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          erro: error.response?.data.message,
        },
        {
          status: error.response?.status,
        },
      )
    }
    throw error
  }
}
