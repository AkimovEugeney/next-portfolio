import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const axiosInter = axios.create(options)