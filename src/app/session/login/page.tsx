import Image from 'next/image'
import logo from '@/assets/logo.svg'
import hero from '@/assets/hero.png'
import { InputBase } from '@/components/InputBase'
import { InputPassword } from '@/components/InputPassword'

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
          <InputBase error={false}>Email</InputBase>
          <InputPassword type="password" error={false}>
            Senha
          </InputPassword>
        </div>
      </main>
    </div>
  )
}
