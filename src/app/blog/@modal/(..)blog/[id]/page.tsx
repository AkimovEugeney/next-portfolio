import { serviceBlog } from '@/services/blog.service'
import { ModalBlog } from '@/components/ModalBlog'


export default async function Page({params}: {params: {id: string}}) {
  const post = await serviceBlog.getById(params.id)
  return (
    <ModalBlog data={post}/>
  )
}
