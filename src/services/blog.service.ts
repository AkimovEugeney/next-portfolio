import { axiosInter } from '@/api/interceptors'

export interface IBlogPost {
  id: string
  createdAt: string
  title: string
  tags: string[]
  desc: string
  img: string
}

class BlogService {
  private BASE_URL = '/blogs'

  async get() {
    return await axiosInter.get<IBlogPost[]>(`${this.BASE_URL}`).then(res => res.data)
  }

  async getById(id:string) {
    return await axiosInter.get<IBlogPost>(`${this.BASE_URL}/${id}`).then(res => res.data)
  }
}

export const serviceBlog = new BlogService()