import axios from 'axios'

export const apiDistrict = axios.create({
  baseURL: 'http://servicodados.ibge.gov.br/api/v1',
})
