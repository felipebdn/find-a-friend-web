import * as Select from '@radix-ui/react-select'
import { UseControllerProps, useController } from 'react-hook-form'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { VariantProps, tv } from 'tailwind-variants'
import { ComponentProps, ReactNode } from 'react'

const selectStyles = tv({
  base: 'text-base inline-flex items-center justify-between gap-1 rounded-2xl px-5 py-4 font-bold leading-none text-white outline-none',
  variants: {
    type: {
      primary: 'border border-[#d3e2e5] bg-[#f5f8fa] text-blue',
      secundary: 'bg-red-light',
      errorPrimary: '',
      errorSecundary: 'bg-red-light',
    },
  },
  defaultVariants: {
    type: 'primary',
  },
})

const labelStyles = tv({
  base: 'text-base font-semibold leading-normal text-white',
  variants: {
    type: {
      primary: 'text-blue',
      secundary: '',
      errorPrimary: 'text-red',
      errorSecundary: '',
    },
  },
  defaultVariants: {
    type: 'primary',
  },
})

function Label(data: {
  conteudo: ReactNode
  name: string
  type: 'primary' | 'secundary' | 'errorPrimary' | 'errorSecundary' | undefined
}) {
  return (
    <label htmlFor={data.name} className={labelStyles({ type: data.type })}>
      {data.conteudo}
    </label>
  )
}

function ErrorMessage({ errorText }: { errorText: string }) {
  return (
    <span className="text-sm font-medium leading-normal text-red">
      {errorText}
    </span>
  )
}

type SelectListType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formProps: UseControllerProps<any>
  options: {
    value: string
    text: string
  }[]
  placeholder: string
  handleStateChange?: (handleUf: string) => void
  handleCountyChange?: (handleCounty: string) => void
}

function SelectList(
  data: SelectListType & {
    type:
      | 'primary'
      | 'secundary'
      | 'errorPrimary'
      | 'errorSecundary'
      | undefined
  },
) {
  const { field } = useController(data.formProps)

  return (
    <Select.Root
      name={field.name}
      onValueChange={(value) => {
        field.onChange(value)
        data.handleStateChange && data.handleStateChange(value)
        data.handleCountyChange && data.handleCountyChange(value)
      }}
    >
      <Select.Trigger className={selectStyles({ type: data.type })}>
        <Select.Value>
          {data.options.find((item) => item.value === field.value)?.text ||
            data.placeholder}
        </Select.Value>
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="item-aligned"
          className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
            <ChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport>
            {data.options.map((item) => {
              return (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                >
                  <Select.ItemText>{item.text}</Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
            <ChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export type inputSelectFormProps = ComponentProps<'select'> &
  VariantProps<typeof selectStyles> &
  SelectListType & {
    errorText: string | undefined
  }

export function InputSelectForm({
  name = '',
  type,
  errorText,
  children,
  placeholder,
  options,
  handleCountyChange,
  handleStateChange,
  formProps,
}: inputSelectFormProps) {
  return (
    <div className="flex flex-col gap-1">
      {children && (
        <div className="flex items-center justify-between">
          <Label conteudo={children} type={type} name={name} />
          {errorText && <ErrorMessage errorText={errorText} />}
        </div>
      )}
      <SelectList
        type={type}
        formProps={formProps}
        options={options}
        placeholder={placeholder}
        handleCountyChange={handleCountyChange}
        handleStateChange={handleStateChange}
      />
    </div>
  )
}
