import Image from 'next/image'
import logo from '../assets/logo.svg'
import hero from '../assets/hero.png'
import { apiDistrict } from '@/lib/api-district'
import { FormHome } from '@/components/forms/home'

interface resState {
  id: number
  sigla: string
  nome: string
}

export default async function Home() {
  const { data }: { data: resState[] } = await apiDistrict.get(
    '/localidades/estados',
    {
      params: {
        orderBy: 'nome',
      },
    },
  )

  return (
    <div className="mx-auto grid h-screen max-w-7xl grid-cols-2 justify-between gap-32 py-40">
      <div className="flex flex-col justify-between">
        <Image src={logo} alt="" />
        <h1 className="text-7xl font-extrabold leading-[90%] tracking-[-1.44px] text-white">
          Leve a felifidade para o seu lar
        </h1>
        <h6 className="text-2xl font-semibold leading-[34px] text-white">
          Encontre o animal de estimação ideal para seu estilo de vida!
        </h6>
      </div>
      <div className="flex flex-col justify-between">
        <Image src={hero} alt="" className="mt-14 w-full" />
        <FormHome data={data} />
      </div>
    </div>
  )
}
