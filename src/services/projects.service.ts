import { axiosInter } from '@/api/interceptors'

export type TProject = {
  id: string
  title: string
  tags: string[]
  desc: string
  img: string
}

export type TProjects = TProject[]

class ProjectsServices {
  private BASE_URL = '/projects'

  async get() {
    return await axiosInter.get<TProjects>(`${this.BASE_URL}`).then(res => res.data)
  }
}

export const servicesProjects = new ProjectsServices()