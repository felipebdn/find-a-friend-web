import { ReactNode } from 'react'
import logo from '@/assets/logo.svg'
import hero from '@/assets/hero.png'
import Image from 'next/image'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid w-full grid-cols-2">
      <aside className="flex h-screen w-full flex-col items-center justify-center py-20">
        <div className="flex h-full flex-col items-center justify-between rounded-3xl bg-red p-10">
          <Image src={logo} alt="" />
          <Image src={hero} className="w-96" alt="" />
        </div>
      </aside>
      <div className="h-screen w-full overflow-y-scroll">{children}</div>
    </div>
  )
}
