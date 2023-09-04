import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import icoLogo from '@/assets/ico-logo.svg'
import { getOrg } from '@/lib/sessionOrg'
import { LogOut } from 'lucide-react'
import FormRegisterPet from './components/form'

export default async function PetRegister() {
  const isAuthenticated = cookies().has('tokenSessionFindAFriend')

  if (!isAuthenticated) {
    redirect('/session/login')
  }

  const org = getOrg()

  return (
    <div className="flex w-full flex-col items-center gap-8 pt-10">
      <div className="flex w-full max-w-2xl gap-[18px] rounded-3xl bg-blue px-16 py-7">
        <div className="rounded-2xl bg-yellow-dark p-4 md:w-fit">
          <Image src={icoLogo} width={27} height={27} alt="" />
        </div>
        <main className="flex h-full flex-1 flex-col">
          <h3 className="mt-1 text-3xl font-bold leading-7 text-white">
            {org.name}
          </h3>
          <p className="text-base font-semibold leading-7 text-white">{`${
            org.road
          }, ${org.number ?? 'S/n'}, ${org.sector}, ${org.city} - ${
            org.uf
          }`}</p>
        </main>
        <button className="rounded-2xl bg-[#114A80] px-[18px] py-4  hover:bg-[#114a80a9]">
          <LogOut strokeWidth={2.5} className="h-6 w-6 text-white" />
        </button>
      </div>
      <main className="flex w-full max-w-2xl flex-col rounded-3xl border border-[#D3E2E5] bg-white px-16 py-10">
        <h3 className="mb-10 w-full border-b border-[#D3E2E5] pb-5 text-4xl font-extrabold leading-8 text-blue">
          Adicione um pet
        </h3>
        <FormRegisterPet />
      </main>
    </div>
  )
}
