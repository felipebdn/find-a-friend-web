'use client'
import * as Select from '@radix-ui/react-select'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import icoLogo from '../../assets/ico-logo.svg'

// energy_level: z.coerce.number().min(1).max(5),
// size: z.enum(['small', 'medium', 'big']),
// age: z.enum(['cub', 'adolescent', 'elderly']),
// description: z.string(),
// independence: z.enum(['low', 'medium', 'high']),

export default function Explore() {
  return (
    <form className="flex">
      <aside>
        <header>
          <Image src={icoLogo} alt="" />
          <div></div>
        </header>
        <div>
          <h3>Filtros</h3>
          <div>
            <label htmlFor="age">Idade</label>
            <Select.Root name="age">
              <Select.Trigger className="text-4 inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-transparent bg-white bg-opacity-0 px-3 py-5 font-bold leading-none text-white outline-none">
                <Select.Value className="text-xl font-bold leading-relaxed text-white" />
                <Select.Icon className="text-white">
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
                    <Select.Item
                      value="cub"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Filhote</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="adolescent"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Adolescente</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="elderly"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Velho</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                    <ChevronDown />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div>
            <label htmlFor="energy_level">Nivel de Energia</label>
            <Select.Root name="energy_level">
              <Select.Trigger className="text-4 inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-transparent bg-white bg-opacity-0 px-3 py-5 font-bold leading-none text-white outline-none">
                <Select.Value className="text-xl font-bold leading-relaxed text-white" />
                <Select.Icon className="text-white">
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
                    <Select.Item
                      value="1"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>01</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="2"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>02</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="3"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>03</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="4"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>04</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="5"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>05</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                    <ChevronDown />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div>
            <label htmlFor="size">Porte do animal</label>
            <Select.Root name="size">
              <Select.Trigger className="text-4 inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-transparent bg-white bg-opacity-0 px-3 py-5 font-bold leading-none text-white outline-none">
                <Select.Value className="text-xl font-bold leading-relaxed text-white" />
                <Select.Icon className="text-white">
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
                    <Select.Item
                      value="small"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Pequenino</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="medium"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Médio</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="big"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Grade</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                    <ChevronDown />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div>
            <label htmlFor="independence">Nível de independência</label>
            <Select.Root name="independence">
              <Select.Trigger className="text-4 inline-flex items-center justify-center gap-[5px] rounded-[20px] border border-white bg-transparent bg-white bg-opacity-0 px-3 py-5 font-bold leading-none text-white outline-none">
                <Select.Value className="text-xl font-bold leading-relaxed text-white" />
                <Select.Icon className="text-white">
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
                    <Select.Item
                      value="low"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Baixo</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="medium"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Médio</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="high"
                      className="relative flex h-[25px] select-none items-center rounded-[3px] px-5 pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-yellow data-[highlighted]:text-black data-[highlighted]:outline-none"
                    >
                      <Select.ItemText>Alto</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-black">
                    <ChevronDown />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
      </aside>
      <main className="flex flex-1"></main>
    </form>
  )
}
