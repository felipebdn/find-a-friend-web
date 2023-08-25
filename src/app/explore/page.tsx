import { apiDistrict } from '@/lib/api-district'
import { FormExplore } from './components/FormExplore'
import { MainExplore } from './components/MainExplore'

interface resState {
  id: number
  sigla: string
  nome: string
}

export default async function Explore() {
  const { data }: { data: resState[] } = await apiDistrict.get(
    '/localidades/estados',
    {
      params: {
        orderBy: 'nome',
      },
    },
  )

  return (
    <div className="flex h-screen">
      <FormExplore ufData={data} />
      <MainExplore />
    </div>
  )
}
