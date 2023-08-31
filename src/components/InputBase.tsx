import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'
import { tv, VariantProps } from 'tailwind-variants'

const input = tv({
  base: 'bg-[#faf5f5] w-full rounded-[10px] outline-0 border border-[#D3E2E5] text-lg font-semibold leading-7 text-blue px-5 py-3 flex items-center',
  variants: {
    error: {
      true: 'bg-[#F75F601A] border-opacity-50 border-red focus-visible:border-red focus-visible:border-opacity-100 text-red',
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

export type InputProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    errorText: string | undefined
  }

export function InputBase({
  name = '',
  error,
  children,
  errorText,
  ...props
}: InputProps) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className={label({ error })}>
          {children}
        </label>
        {error && errorText && (
          <span className="text-sm font-medium leading-normal text-red">
            {errorText}
          </span>
        )}
      </div>
      <input className={input({ error })} {...register(name)} {...props} />
    </div>
  )
}
