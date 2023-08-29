import Image from 'next/image'
import logo from '@/assets/logo.svg'
import hero from '@/assets/hero.png'
import { Input } from '@/components/Input'

export default async function Login() {
  return (
    <div className="grid w-full grid-cols-2">
      <aside className="flex h-screen flex-col items-center justify-center py-20">
        <div className="flex h-full flex-col items-center justify-between rounded-3xl bg-red p-10">
          <Image src={logo} alt="" />
          <Image src={hero} className="w-96" alt="" />
        </div>
      </aside>
      <main className="py-20">
        <h1>Boas-vindas!</h1>
        <div>
          <Input error={true}>Email</Input>
        </div>
      </main>
    </div>
  )
}
