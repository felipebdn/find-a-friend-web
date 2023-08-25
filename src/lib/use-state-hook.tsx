import { useState, useCallback, useEffect } from 'react'
import { apiDistrict } from './api-district'

interface County {
  nome: string
  id: number
}

interface StateHookProps {
  initialState?: string
}

interface StateHookResult {
  countys: County[]
  uf: string
  county: string | undefined
  setUf: (uf: string) => void
  setCounty: (county: string | undefined) => void
  requestApiState: () => Promise<void>
}

export const useStateHook = ({
  initialState,
}: StateHookProps = {}): StateHookResult => {
  const [countys, setCountys] = useState<County[]>([])
  const [uf, setUf] = useState<string>(initialState || '')
  const [county, setCounty] = useState<string | undefined>(undefined)

  const requestApiState = useCallback(async () => {
    try {
      const { data } = await apiDistrict.get(
        `/localidades/estados/${uf}/municipios`,
        {
          params: {
            orderBy: 'nome',
          },
        },
      )
      setCountys(data)
    } catch (error) {
      // Lida com erros, se necessário
    }
  }, [uf])

  useEffect(() => {
    if (uf) {
      requestApiState()
    }
  }, [uf, requestApiState])

  return {
    countys,
    uf,
    county,
    setUf,
    setCounty,
    requestApiState,
  }
}
