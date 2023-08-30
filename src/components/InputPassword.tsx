'use client'
import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps, useState } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'bg-[#faf5f5] w-full rounded-[10px] border border-[#D3E2E5] text-lg font-semibold leading-7 text-blue px-5 py-3 flex items-center',
  variants: {
    error: {
      true: 'bg-[#F75F601A] border-red',
    },
  },
  defaultVariants: {
    error: false,
  },
})

const label = tv({
  base: 'text-base font-semibold leading-normal text-blue',
  variants: {
    error: {
      true: 'text-red',
    },
  },
})

export type InputProps = ComponentProps<'input'> & VariantProps<typeof input>

export function InputPassword({
  name,
  error,
  children,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(type !== 'password')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className={label({ error })}>
        {children}
      </label>
      <div className="relative flex items-center justify-end">
        <input
          type={showPassword ? 'text' : 'password'}
          className={input({ error })}
          name={name}
          {...props}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute mr-4 text-blue text-opacity-50"
        >
          {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
        </button>
      </div>
    </div>
  )
}
