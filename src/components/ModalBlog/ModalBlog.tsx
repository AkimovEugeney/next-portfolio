'use client'
import { Modal } from '../ui/Modal'
import { Tags } from '../Tags/Tags'
import Image from 'next/image'
import { IBlogPost } from '@/services/blog.service'
import { useRouter } from 'next/navigation'

interface IModalBlog {
  data: IBlogPost
}

export function ModalBlog({data}: IModalBlog) {
  const {back} = useRouter()
  return (
      <Modal open={true} onClose={() => back()}>
        <div className="post">
            <div className='post__inner'>
            <h1 className='post__title'>{data.title}</h1>
            <Tags className='post__tags' data={data.tags}/>
            <span className='post__created'>{data.createdAt}</span>
            </div>
            <p className='post__desc'>{data.desc}</p>
            <div className='post__img'>
              <Image src={data.img} alt='Photo' width={1000} height={1000} />
            </div>
          </div>
      </Modal>
  )
}
