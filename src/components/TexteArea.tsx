import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'
import { VariantProps, tv } from 'tailwind-variants'

const textarea = tv({
  base: 'bg-[#f5f8fa] w-full rounded-[10px] outline-0 border border-[#D3E2E5] text-lg font-semibold leading-7 text-blue px-5 py-3 flex items-center',
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

export type TextAreaProps = ComponentProps<'textarea'> &
  VariantProps<typeof textarea> & {
    errorText: string | undefined
    alert: string
  }

export function TextArea({
  name = '',
  error,
  children,
  errorText,
  alert,
  ...props
}: TextAreaProps) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <label htmlFor={name} className={label({ error })}>
            {children}
          </label>
          <span className="text-xs font-normal leading-3 text-[#8FA7B2]">
            {alert}
          </span>
        </div>
        {error && errorText && (
          <span className="text-sm font-medium leading-normal text-red">
            {errorText}
          </span>
        )}
      </div>
      <textarea
        className={textarea({ error })}
        {...register(name)}
        {...props}
      />
    </div>
  )
}
