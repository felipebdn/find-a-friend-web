'use client'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputBase } from '@/components/InputBase'
import { InputPassword } from '@/components/InputPassword'
import axios, { AxiosError } from 'axios'
import { nextApi } from '@/lib/api-next'

interface responseAddressByCepTypes {
  bairro: string
  cep: string
  localidade: string
  logradouro: string
  uf: string
}

export const formRegisterSchema = z
  .object({
    name: z.string().nonempty('Campo obrigatorio'),
    organization: z.string().nonempty('Campo obrigatorio'),
    email: z.string().email('Digite um email válido'),
    state: z.string().length(2).nonempty('Campo obrigatorio').toUpperCase(),
    city: z.string().nonempty('Campo obrigatorio'),
    cep: z.coerce.string().length(8, 'CEP tem 8 digitos'),
    number: z.string(),
    road: z.string().nonempty('Campo obrigatorio'),
    sector: z.string().nonempty('Campo obrigatorio'),
    whatsapp: z.string().nonempty('Campo obrigatorio'),
    password: z.string().min(6, 'Senha de no mínimo 2 digitos'),
    passwordConf: z.string().min(6, 'Senha de no mínimo 2 digitos'),
  })
  .refine((data) => data.password === data.passwordConf, {
    message: 'As senhas não coincidem',
    path: ['passwordConf'],
  })

export type FormRegisterSchemaType = z.infer<typeof formRegisterSchema>

export default function Register() {
  const formData = useForm<FormRegisterSchemaType>({
    resolver: zodResolver(formRegisterSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    setValue,
  } = formData

  async function handleFormSubmit(data: FormRegisterSchemaType) {
    try {
      await nextApi.post('/api/session/register', {
        data,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError('email', {
            message: 'Email já existe',
          })
        }
      }
    }
  }

  async function getAddressByCep(cep: number) {
    if (cep.toString().length === 8) {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      if (res.data.erro === true) {
        setError('cep', {
          message: 'Digite um CEP válido',
        })
        return null
      }
      const responseData: responseAddressByCepTypes = res.data
      setValue('road', responseData.logradouro)
      setValue('sector', responseData.bairro)
      setValue('city', responseData.localidade)
      setValue('state', responseData.uf)
      trigger()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex h-full max-w-md flex-col gap-10 py-20"
    >
      <h1 className="-ml-1 text-center text-6xl font-bold leading-[48px] tracking-[-1.08px] text-blue">
        Cadastre sua organização
      </h1>
      <FormProvider {...formData}>
        <div className="flex flex-col gap-4">
          <InputBase
            errorText={errors.name?.message}
            name="name"
            error={!!errors.name ?? false}
          >
            Nome do responsável *
          </InputBase>
          <InputBase
            errorText={errors.organization?.message}
            name="organization"
            error={!!errors.organization ?? false}
          >
            Nome da organizaçõ *
          </InputBase>
          <InputBase
            errorText={errors.email?.message}
            name="email"
            error={!!errors.email ?? false}
          >
            Email *
          </InputBase>
          <InputBase
            onBlur={(event) => getAddressByCep(parseFloat(event.target.value))}
            errorText={errors.cep?.message}
            name="cep"
            type="number"
            maxLength={8}
            error={!!errors.cep ?? false}
          >
            CEP *
          </InputBase>
          <InputBase
            errorText={errors.road?.message}
            name="road"
            error={!!errors.road ?? false}
          >
            Rua *
          </InputBase>
          <InputBase
            errorText={errors.number?.message}
            name="number"
            error={!!errors.number ?? false}
          >
            Número
          </InputBase>
          <InputBase
            errorText={errors.sector?.message}
            name="sector"
            error={!!errors.sector ?? false}
          >
            Bairro *
          </InputBase>
          <InputBase
            errorText={errors.city?.message}
            name="city"
            error={!!errors.city ?? false}
          >
            Cidade *
          </InputBase>
          <InputBase
            errorText={errors.state?.message}
            name="state"
            maxLength={2}
            error={!!errors.state ?? false}
          >
            UF *
          </InputBase>
          <InputBase
            errorText={errors.whatsapp?.message}
            name="whatsapp"
            error={!!errors.whatsapp ?? false}
          >
            Whatsapp *
          </InputBase>
          <InputPassword
            errorText={errors.password?.message}
            name="password"
            type="password"
            autoComplete="on"
            error={!!errors.password ?? false}
          >
            Senha *
          </InputPassword>
          <InputPassword
            errorText={errors.passwordConf?.message}
            name="passwordConf"
            type="password"
            autoComplete="on"
            error={!!errors.passwordConf ?? false}
          >
            Confirmar Senha *
          </InputPassword>
        </div>
      </FormProvider>

      <div className="flex flex-col items-center gap-5">
        <button
          type="submit"
          className="w-full rounded-[20px] bg-blue p-4 text-xl font-extrabold leading-8 text-white"
        >
          Cadastrar
        </button>
        <Link
          href="/session/login"
          className="mb-20 flex w-fit justify-center rounded-[20px] text-xl font-extrabold leading-8 text-blue"
        >
          Já possui conta?
        </Link>
      </div>
    </form>
  )
}
