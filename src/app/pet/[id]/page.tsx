import { ArrowLeftIcon, Dot, Scan, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import icoLogo from '@/assets/ico-logo.svg'
import { nextApi } from '@/lib/api-next'
import { getPetTypes } from '@/app/api/pet/[id]/route'
import { Galery } from './Galery'

export default async function InfoPet({ params }: { params: { id: string } }) {
  const { data }: { data: getPetTypes } = await nextApi.get(
    `/api/pet/${params.id}`,
  )

  const { images, pet } = data

  return (
    <div className="flex w-full flex-col items-center">
      <header className="flex w-full justify-center bg-red">
        <div className="flex w-full max-w-2xl justify-between py-2">
          <button className="rounded-xl bg-yellow p-3 leading-none">
            <ArrowLeftIcon className="text-blue" size={20} strokeWidth={3} />
          </button>
          <Link href="/">
            <Image src={icoLogo} alt="" />
          </Link>
        </div>
      </header>
      <section className="py-10">
        <span className="text-lg font-semibold leading-7 text-complemets-text">
          Seu novo amigo
        </span>
      </section>
      <main className="w-full max-w-2xl overflow-hidden rounded-t-[20px] bg-white">
        <Galery images={images} />
        <div className="px-16 pb-16">
          <h1 className="mt-16 text-5xl font-extrabold leading-none tracking-[-1px] text-blue">
            {pet.name}
          </h1>
          <p className="mt-5 w-full text-lg font-semibold leading-7 text-blue">
            {pet.description}
          </p>

          <div className="mb-10 mt-10 grid grid-cols-3 gap-4 border-b border-blue border-opacity-10 pb-10">
            <div className="flex flex-col justify-between gap-3 border border-blue border-opacity-10 p-6">
              <div className="flex w-full justify-between gap-1">
                {new Array(5).fill('').map((_, i) => {
                  return (
                    <Zap
                      key={i}
                      fill={
                        pet.energy_level < i + 1 ? '#0D3B6640' : '#0D3B6600'
                      }
                      color={pet.energy_level < i + 1 ? '#0D3B6640' : '#0D3B66'}
                      size={20}
                      strokeWidth={2.5}
                    />
                  )
                })}
              </div>
              <p className="text-lg font-semibold leading-none text-blue">
                {pet.energy_level === 1 && 'Cansado'}
                {pet.energy_level === 2 && 'Calmo'}
                {pet.energy_level === 3 && 'Normal'}
                {pet.energy_level === 4 && 'Muita energia'}
                {pet.energy_level === 3 && 'Frenético'}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-3 border border-blue border-opacity-10 p-6">
              <Scan size={20} color="#0D3B66" strokeWidth={2.5} />
              <p className="text-lg font-semibold leading-none text-blue">
                {pet.anvironment}
              </p>
            </div>
            <div className="flex flex-col justify-between gap-3 border border-blue border-opacity-10 p-6">
              <div className="flex gap-1">
                <Dot size={20} color="#0D3B66" strokeWidth={15} />
                <Dot size={20} color="#0D3B66" strokeWidth={15} />
                <Dot size={20} color="#0D3B66" strokeWidth={15} />
              </div>
              <p className="text-lg font-semibold leading-none text-blue">
                {pet.size === 'small' && 'Pequenino'}
                {pet.size === 'medium' && 'Medio'}
                {pet.size === 'big' && 'Grande'}
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <span className="flex w-fit rounded-2xl bg-yellow-dark p-4">
              <Image src={icoLogo} alt="" width={28} height={28} />
            </span>
            <h3>{}</h3>
          </div>
        </div>
      </main>
    </div>
  )
}
