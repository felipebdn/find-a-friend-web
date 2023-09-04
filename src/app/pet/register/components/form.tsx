'use client'
import { InputBase } from '@/components/InputBase'
import { InputSelectForm } from '@/components/SelectInput'
import { TextArea } from '@/components/TexteArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const petBodySchema = z.object({
  images: z.array(z.object({ file: z.instanceof(File) })),
})

type PetBodySchemaType = z.infer<typeof petBodySchema>

export default function FormRegisterPet() {
  const formData = useForm<PetBodySchemaType>({
    resolver: zodResolver(petBodySchema),
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = formData

  function FormSubmit(data: PetBodySchemaType) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(FormSubmit)} className="flex flex-col gap-6">
      <FormProvider {...formData}>
        <input type="file" accept="image/*" multiple {...register('images')} />

        <button type="submit">enviar</button>
        {/* <InputBase
          name="name"
          errorText={errors.name?.message}
          error={!!errors.name}
        >
          Nome
        </InputBase>
        <TextArea
          alert="Máximo de 300 caracteres"
          name="description"
          error={!!errors.description}
          errorText={errors.description?.message}
        >
          Sobre
        </TextArea>
        <InputSelectForm
          errorText={errors.age?.message}
          formProps={{ control, name: 'age' }}
          value="Pequenino"
          type="primary"
          placeholder="Escolha"
          options={[
            {
              text: 'Filhote',
              value: 'cub',
            },
            {
              text: 'Adolescente',
              value: 'adolescent',
            },
            {
              text: 'Velho',
              value: 'elderly',
            },
          ]}
        >
          Idade
        </InputSelectForm>
        <InputSelectForm
          errorText={errors.age?.message}
          formProps={{ control, name: 'size' }}
          value="Pequenino"
          type="primary"
          placeholder="Escolha"
          options={[
            {
              text: 'Pequenino',
              value: 'small',
            },
            {
              text: 'Médio',
              value: 'medium',
            },
            {
              text: 'Grade',
              value: 'big',
            },
          ]}
        >
          Porte
        </InputSelectForm>
        <InputSelectForm
          errorText={errors.age?.message}
          formProps={{ control, name: 'energy_level' }}
          value="Pequenino"
          type="primary"
          placeholder="Escolha"
          options={[
            {
              text: '01',
              value: '1',
            },
            {
              text: '02',
              value: '2',
            },
            {
              text: '03',
              value: '3',
            },
            {
              text: '04',
              value: '4',
            },
            {
              text: '05',
              value: '5',
            },
          ]}
        >
          Nível de energia
        </InputSelectForm>
        <InputSelectForm
          errorText={errors.age?.message}
          formProps={{ control, name: 'independence' }}
          value="Pequenino"
          type="primary"
          placeholder="Escolha"
          options={[
            {
              text: 'Baixo',
              value: 'low',
            },
            {
              text: 'Médio',
              value: 'medium',
            },
            {
              text: 'Alto',
              value: 'high',
            },
          ]}
        >
          Nível de independência
        </InputSelectForm>
        <InputSelectForm
          errorText={errors.age?.message}
          formProps={{ control, name: 'anvironment' }}
          value="Pequenino"
          type="primary"
          placeholder="Escolha"
          options={[
            {
              text: 'Pouco espaço',
              value: 'small',
            },
            {
              text: 'Médio espaço',
              value: 'medium',
            },
            {
              text: 'Grande espaço',
              value: 'big',
            },
          ]}
        >
          Ambiente
        </InputSelectForm> */}
      </FormProvider>
    </form>
  )
}
