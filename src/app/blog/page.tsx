import type { Metadata } from 'next'
import './Blog.scss'
import { serviceBlog } from '@/services/blog.service'
import { BlogPosts } from '@/components/BlogPosts/BlogPosts'
export const metadata: Metadata = {
 title: 'Blog',
 description: 'Blog'
}

export const revalidate = 60

export default async  function Page() {
  const posts = await serviceBlog.get()
 return (
  <main>
  <section className="blog section-one">
    <div className="container">
      <h1 className="title">
        Blog
      </h1>
      <p className='blog__desc'>
        I write about what learned so others can benefit
      </p>
      <BlogPosts data={posts}/>
    </div>
  </section>
 </main>
 )
}
