import { Tags } from '@/components/Tags/Tags'
import { pages } from '@/config/pages-url.config'
import { serviceBlog } from '@/services/blog.service'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import './Post.scss'

type Props = {
  params: { id: string }
}
export const revalidate = 60
export const dynamicParams = false

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await serviceBlog.getById(params.id)
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: post.title,
    metadataBase: new URL(pages.domain), 
    openGraph: {
      images: [post.img, ...previousImages],
    },
  }
}
 
export async function generateStaticParams() {
  const posts = await serviceBlog.get()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Page({ params }: Props) {
  const post = await serviceBlog.getById(params.id)
 return (
  <main>
    <section className='section-one'>
      <div className="container">
        <div className="post">
          <div className='post__inner'>
          <h1 className='post__title'>{post.title}</h1>
          <Tags className='post__tags' data={post.tags}/>
          <span className='post__created'>{post.createdAt}</span>
          </div>
          <p className='post__desc'>{post.desc}</p>
          <div className='post__img'>
            <Image src={post.img} alt='Photo' fill={true}/>
          </div>
        </div>
      </div>
    </section>
  </main>
 )
}
