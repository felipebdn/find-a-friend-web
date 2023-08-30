'use client'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputBase } from '@/components/InputBase'
import { InputPassword } from '@/components/InputPassword'

const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type FormLoginSchemaType = z.infer<typeof formLoginSchema>

export function FormLogin() {
  const formData = useForm<FormLoginSchemaType>({
    resolver: zodResolver(formLoginSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = formData

  function handleFormSubmit(data: FormLoginSchemaType) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex max-w-md flex-col justify-between py-20"
    >
      <h1 className="-ml-1 mt-20 text-6xl font-bold leading-[48px] tracking-[-1.08px] text-blue">
        Boas-vindas!
      </h1>
      <FormProvider {...formData}>
        <div className="flex flex-col gap-4">
          <InputBase name="email" error={!!errors.email ?? false}>
            Email
          </InputBase>
          <InputPassword
            name="password"
            type="password"
            error={!!errors.password ?? false}
          >
            Senha
          </InputPassword>
        </div>
      </FormProvider>
      <div className="flex flex-col gap-5">
        <button
          type="submit"
          className="rounded-[20px] bg-blue p-4 text-xl font-extrabold leading-8 text-white"
        >
          Login
        </button>
        <Link
          href="/session/register"
          className="flex justify-center rounded-[20px] bg-blue bg-opacity-5 p-4 text-xl font-extrabold leading-8 text-blue"
        >
          Cadastrar minha organização
        </Link>
      </div>
    </form>
  )
}
