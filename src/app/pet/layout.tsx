'use client'
import { ArrowLeftIcon } from 'lucide-react'
import { ReactNode } from 'react'
import icoLogo from '@/assets/ico-logo.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Layout({ children }: { children: ReactNode }) {
  const route = useRouter()
  return (
    <div className="flex w-full flex-col items-center">
      <header className="flex w-full justify-center bg-red">
        <div className="flex w-full max-w-2xl justify-between py-2">
          <button
            onClick={() => route.back()}
            className="rounded-xl bg-yellow p-3 leading-none"
          >
            <ArrowLeftIcon className="text-blue" size={20} strokeWidth={3} />
          </button>
          <Link href="/">
            <Image src={icoLogo} alt="" />
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
