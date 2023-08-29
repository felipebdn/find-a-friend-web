import { ComponentProps } from 'react'
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

export type InputProps = ComponentProps<'input'> & VariantProps<typeof input>

export function Input({ name, error, children, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-base font-semibold leading-normal text-blue"
      >
        {children}
      </label>
      <input className={input({ error })} name={name} {...props} />
    </div>
  )
}
