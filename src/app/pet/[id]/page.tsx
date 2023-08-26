import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import icoLogo from '@/assets/ico-logo.svg'
import { api } from '@/lib/api-server'

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

export default async function InfoPet({ params }: { params: { id: string } }) {
  const { data }: { data: getPetTypes } = await api.get(`/pet/${params.id}`)
  console.log(data)

  return (
    <div className="flex w-full flex-col items-center">
      <header className="flex w-full justify-center bg-red">
        <div className="flex w-full max-w-xl justify-between py-2">
          <button className="rounded-xl bg-yellow p-3 leading-none">
            <ArrowLeftIcon className="text-blue" size={20} strokeWidth={3} />
          </button>
          <Link href="/">
            <Image src={icoLogo} alt="" />
          </Link>
        </div>
      </header>
      <section className="py-10">
        <span className="text-complemets-text text-lg font-semibold leading-7">
          Seu novo amigo
        </span>
      </section>
      <main className="w-full max-w-xl">
        <Image src={icoLogo} alt="" className="w-full" />
      </main>
    </div>
  )
}
