import { Dot, Info, Scan, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import icoLogo from '@/assets/ico-logo.svg'
import { nextApi } from '@/lib/api-next'
import { getPetTypes } from '@/app/api/pet/[id]/route'
import { Galery } from './Galery'
import whatsappFill from '@/assets/whatsappFill.svg'
import whatsapp from '@/assets/whatsapp.svg'

export default async function InfoPet({ params }: { params: { id: string } }) {
  const { data }: { data: getPetTypes } = await nextApi.get(
    `/api/pet/${params.id}`,
  )

  const { images, pet, org } = data

  const requerimentsPet = pet.requirements.split('#')

  return (
    <>
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
          <section className="mb-10 mt-10 grid grid-cols-3 gap-4 border-b border-blue border-opacity-10 pb-10">
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
          </section>
          <section className="mb-10 flex gap-5 border-b border-blue border-opacity-10 pb-10">
            <span className="flex h-fit w-fit rounded-2xl bg-yellow-dark p-4">
              <Image src={icoLogo} alt="" width={28} height={28} />
            </span>
            <div>
              <h3 className="mt-2 text-3xl font-bold leading-7 text-blue">
                {org.name}
              </h3>
              <p className="text-base font-semibold leading-7 text-blue">{`${org.road}, ${org.number}, ${org.sector}, ${org.city} - ${org.state}`}</p>
              <div className="mt-2 flex w-fit gap-2 rounded-xl bg-blue bg-opacity-5 px-8 py-3">
                <Image src={whatsappFill} alt="" className="text-blue" />
                <span className="text-lg font-bold leading-7 text-blue">
                  {org.whatsapp}
                </span>
              </div>
            </div>
          </section>
          <section className="mb-10 flex flex-col gap-10 border-b border-blue border-opacity-10 pb-10">
            <h3 className="text-3xl font-bold leading-7 text-blue">
              Requisitos para adoção
            </h3>
            <div className="flex flex-col gap-3">
              {requerimentsPet.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex gap-4 rounded-xl border border-red bg-gradient-to-r from-[#F75F601A] to-[#F1515600] px-10 py-4"
                  >
                    <Info className="text-red" />
                    <p className="text-lg font-semibold text-red">{item}</p>
                  </div>
                )
              })}
            </div>
          </section>
          <Link
            href={`http://api.whatsapp.com/send?1=pt_BR&phone=55${org.whatsapp}`}
            target="_blank"
            className="flex w-full justify-center gap-4 rounded-3xl bg-green p-6"
          >
            <Image src={whatsapp} alt="" className="text-white" />
            <span className="text-lg font-extrabold leading-[26px] text-white">
              Entrar em contato
            </span>
          </Link>
        </div>
      </main>
    </>
  )
}
