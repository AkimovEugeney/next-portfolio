import { axiosInter } from '@/api/interceptors'

export interface IBiography {
  text: string
  img: string
}

class BiographyServices {
  private BASE_URL = '/biography'

  async get () {
    return await axiosInter.get<IBiography>(`${this.BASE_URL}`).then(res => res.data)
  }

  async getWithFetch () {
    return await fetch(`${process.env.API_URL}${this.BASE_URL}`, {
      cache: 'no-store',
    }).then(res => res.json())
  }
}

export const serviceBiography = new BiographyServices()