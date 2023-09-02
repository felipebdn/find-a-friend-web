'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const petBodySchema = z.object({
  collar: z.string(),
  name: z.string(),
  energy_level: z.coerce.number().min(1).max(5),
  size: z.enum(['small', 'medium', 'big']),
  age: z.enum(['cub', 'adolescent', 'elderly']),
  description: z.string(),
  independence: z.enum(['low', 'medium', 'high']),
  anvironment: z.string(),
  requirements: z.string(),
})

type PetBodySchemaType = z.infer<typeof petBodySchema>

export default function FormRegisterPet() {
  const { control, handleSubmit } = useForm<PetBodySchemaType>({
    resolver: zodResolver(petBodySchema),
  })

  return <form></form>
}
