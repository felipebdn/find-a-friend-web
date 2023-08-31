'use client'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import cookie from 'js-cookie'
import { InputBase } from '@/components/InputBase'
import { InputPassword } from '@/components/InputPassword'
import { nextApi } from '@/lib/api-next'
import { useState } from 'react'
import { AxiosError } from 'axios'

const formLoginSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'A senha tem no mínimo 6 caracteres'),
})

export type FormLoginSchemaType = z.infer<typeof formLoginSchema>

export default function Login() {
  const [loginErrorCredentials, setLoginErrorCredentials] = useState(false)
  const formData = useForm<FormLoginSchemaType>({
    resolver: zodResolver(formLoginSchema),
  })
  const route = useRouter()

  const {
    handleSubmit,
    formState: { errors },
  } = formData

  async function handleFormSubmit(data: FormLoginSchemaType) {
    try {
      const res = await nextApi.post('/api/session/login', {
        data,
        Headers: {
          'content-type': 'application/json',
        },
      })

      if (res.data.token) {
        cookie.set('tokenteste', res.data.token, {
          expires: 7,
          path: '/',
        })
        route.push('/pet/register')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setLoginErrorCredentials(true)
        }
      }
    }
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
          <InputBase
            errorText={errors.email?.message}
            name="email"
            error={!!errors.email ?? false}
          >
            Email
          </InputBase>
          <InputPassword
            errorText={errors.password?.message}
            name="password"
            type="password"
            error={!!errors.password ?? false}
          >
            Senha
          </InputPassword>
        </div>
      </FormProvider>

      {loginErrorCredentials && (
        <span className="text-center text-base font-semibold text-red">
          Email ou senha inválidos
        </span>
      )}

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
