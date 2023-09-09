'use client'
import { InputBase } from '@/components/InputBase'
import { InputSelectForm } from '@/components/SelectInput'
import { TextArea } from '@/components/TexteArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Plus, UploadCloud, XSquare } from 'lucide-react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { object, z } from 'zod'

const petBodySchema = z.object({
  images: z.array(
    z.object({
      file: z.instanceof(File).nullable(),
    }),
  ),
  name: z.string(),
  description: z.string(),
  age: z.enum(['cub', 'adolescent', 'elderly']),
  size: z.enum(['small', 'medium', 'big']),
  energy_level: z.coerce.number().min(1).max(5),
  independence: z.enum(['low', 'medium', 'high']),
  anvironment: z.enum(['small', 'medium', 'big']),
  requirements: z.array(
    z.object({
      title: z.string(),
    }),
  ),
})

type PetBodySchemaType = z.infer<typeof petBodySchema>

export default function FormRegisterPet() {
  const formData = useForm<PetBodySchemaType>({
    resolver: zodResolver(petBodySchema),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formData

  const imagesField = useFieldArray({
    control,
    name: 'images',
  })

  const imagesRequeriments = useFieldArray({
    control,
    name: 'requirements',
  })

  function FormSubmit(data: PetBodySchemaType) {
    console.log(data)
  }

  return (
    <main className="flex w-full max-w-2xl flex-col rounded-3xl border border-[#D3E2E5] bg-white px-16 py-10">
      <h3 className="mb-10 w-full border-b border-[#D3E2E5] pb-5 text-4xl font-extrabold leading-8 text-blue">
        Adicione um pet
      </h3>
      <form onSubmit={handleSubmit(FormSubmit)} className="flex flex-col gap-6">
        <FormProvider {...formData}>
          <InputBase
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
            errorText={errors.size?.message}
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
            errorText={errors.energy_level?.message}
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
            errorText={errors.independence?.message}
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
            errorText={errors.anvironment?.message}
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
          </InputSelectForm>
        </FormProvider>

        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold leading-4 text-blue">
            Fotos
          </span>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              imagesField.append({ file: event.dataTransfer.files.item(0) })
            }}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-[#d3e2e5] bg-[#f5f8fa] py-10 text-blue"
          >
            <UploadCloud size={24} />
            Arraste e solte o arquivo
          </label>

          {imagesField.fields.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-[#d3e2e5] p-3"
              >
                <div className="flex items-center gap-3">
                  <FileText size={24} className="text-[#d3e2e5]" />
                  <span className="text-sm font-normal leading-7 text-blue">
                    {item.file?.name}
                  </span>
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => imagesField.remove(index)}
                >
                  <XSquare size={24} className="text-red" />
                </button>
              </div>
            )
          })}

          <label
            htmlFor="file"
            className="mt-4 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-red bg-red bg-opacity-10 py-6 text-red"
          >
            <Plus size={24} />
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              if (event.target.files) {
                imagesField.append({ file: event.target.files[0] })
              }
            }}
          />
        </div>
        <h3 className="mb-10 mt-10 w-full border-b border-[#D3E2E5] pb-5 text-4xl font-extrabold leading-8 text-blue">
          Requisitos para adoção
        </h3>
      </form>
    </main>
  )
}
