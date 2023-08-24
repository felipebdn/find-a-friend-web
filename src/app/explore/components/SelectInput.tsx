import * as Select from '@radix-ui/react-select'
import { UseControllerProps, useController } from 'react-hook-form'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { VariantProps, tv } from 'tailwind-variants'
import { FormShemaType } from '../page'

const select = tv({
  base: 'text-base inline-flex items-center justify-between gap-1 rounded-2xl p-5 font-bold leading-none text-white outline-none',
  variants: {
    type: {
      filter: 'bg-red-light ',
      location: '',
    },
  },
})

interface inputSelectFormProps extends VariantProps<typeof select> {
  formProps: UseControllerProps<FormShemaType>
  options: {
    value: string
    text: string
  }[]
  placeholder: string
}

export function InputSelectForm({
  formProps,
  options,
  placeholder,
  type,
}: inputSelectFormProps) {
  const { field } = useController(formProps)

  return (
    <Select.Root name={field.name} onValueChange={field.onChange}>
      <Select.Trigger className={select({ type })}>
        <Select.Value>
          {options.find((item) => item.value === field.value)?.text ||
            placeholder}
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
            {options.map((item) => {
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
