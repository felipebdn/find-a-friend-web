import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface Org {
  city: string
  road: string
  sector: string
  uf: string
  number?: string
  sub: string
  iat: number
  exp: number
  name: string
}
export function getOrg(): Org {
  const token = cookies().get('tokenSessionFindAFriend')?.value
  if (!token) {
    throw new Error('Unauthenticated')
  }
  const org: Org = decode(token)
  return org
}
